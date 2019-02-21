const _ = require('lodash');
const assert = require('assert');

module.exports = {
  bind: (fpm) => {
    // Run When Server Init
    fpm.registerAction('INIT', () => {
      
    })

    /**
     * - methods
  - [ ] create(dv_name!string, origin_sql!string, dv_title?string) => Promise(<Integer>);
  - [ ] edit(dv_name!string, origin_sql!string, dv_title?string) => Promise(<0/!0>);
  - [ ] disable(dv_name!string) => Promise(<0/!0>);
  - [ ] dir() => Promise(<List<Object>>);
  - [ ] get(dv_name!string) => Promise(<Object>);
  - [ ] dirTask(dv_name?string) => Promise(<List<Object>>);
    * list tasks of the dataview
  - [ ] getTask(task_id!Integer) => Promise(Object);
  - [ ] getLatest(dv_name) => Promise(Object); 
  - [ ] run(dv_name!string, schedule?string[corn type]) => Promise(<any>);
     */
    const bizModule = {
      run: async (bizArgs) => {
        console.log('do things', bizArgs);
        const { dv_name, cron, job } = bizArgs;
        try {
          assert(dv_name != undefined, 'dv_name required');
          const { M } = fpm;
          if(cron){
            const NOW = _.now();
            // make a schedule job with the cron
            const { name, autorun = 1 } = bizArgs;
            await M.createAsync({
              table: 'dv_schedule',
              row: {
                name, autorun, cron, dv_name, createAt: NOW, updateAt: NOW,
              }
            })
            await fpm.execute('job.createCronJob', {method: 'dataview.run', cron, name, autorun, args: { dv_name, job:1 }})
            return 1;
          }
          let task;
          if(job){
            // the it's a job request
            
            // create a task
            task = await M.createAsync({
              table: 'dv_task',
              row: {
                dv_name,
                startAt: _.now(),
              }
            })
          }
          // run it now!
          const dataview = await M.firstAsync({
            table: 'dv_dataview',
            condition: `name = '${dv_name}'`
          })
          assert(!_.isEmpty(dataview), 'dv_name not exists');
          const { origin_sql, args, filter, sortBy } = dataview;
          const compiled = _.template(origin_sql);
          const sql = compiled(JSON.parse(args));
          const data = await M.findAndCountAsync({
            table: `(${sql}) as T`,
            condition: filter,
            sort: sortBy,
            limit: 100,
          })
          if(job){
            // feedback the job's result
            await M.updateAsync({
              table: 'dv_task',
              row: {
                finishAt: _.now(),
                status: 'DONE',
                result: JSON.stringify(data)
              }
            })
            await M.updateAsync({
              table: 'dv_schedule',
              condition: `dv_name = '${ dv_name }'`,
              row: {
                task_id: task.id
              }
            })
            return;
          }
          return { data };
        } catch (error) {
          console.error(error);
          return Promise.reject({
            error,
          })
        }
      }
    };
    fpm.registerAction('BEFORE_SERVER_START', () => {
      fpm.extendModule('dataview', bizModule)
    })
    return bizModule;
  }
}
