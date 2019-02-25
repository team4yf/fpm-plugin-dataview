const _ = require('lodash');
const assert = require('assert');
const path = require('path');
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
      create: async bizArgs => {
        const { M } = fpm;
        const NOW = _.now();
        const { args } = bizArgs;
        if(_.isObjectLike(args)){
          bizArgs.args = JSON.stringify(args);
        }
        try {
          const count = await M.countAsync({
            table: 'dv_dataview',
            condition: `name = '${ bizArgs.name}'`
          })
          if(count > 0){
            return Promise.reject({
              message: `dataview name [${ bizArgs.name }] exists!`,
            })
          }
          const result = await M.createAsync({
            table: 'dv_dataview',
            row: _.assign(bizArgs, {
              createAt: NOW,
              updateAt: NOW,
            })
          })
          return result;  
        } catch (error) {
          return Promise.reject(error);
        }
        
      },
      run: async (bizArgs) => {
        const { dv_name, args = {}, record = false } = bizArgs;
        if(_.isString(args)){
          bizArgs.args = JSON.parse(args);
        }
        try {
          assert(dv_name != undefined, 'dv_name required');
          const { M } = fpm;
          let result;

          const count = await M.countAsync({
            table: 'dv_dataview',
            condition: `name = '${ dv_name }'`
          })
          if(count != 1){
            return Promise.reject({
              message: `dataview name [${ dv_name }] not exists!`,
            })
          }
          if(record){
            // create a task
            result = await M.createAsync({
              table: 'dv_result',
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
          const sqlArgs = _.assign(JSON.parse(args),{NOW: _.now()}, bizArgs.args );
          const sql = compiled(sqlArgs);
          const data = await M.findAndCountAsync({
            table: `(${sql}) as T`,
            condition: filter,
            sort: sortBy,
            limit: 100,
          })
          if(record){
            // feedback the job's result
            await M.updateAsync({
              table: 'dv_result',
              condition: `id = ${ result.id }`,
              row: {
                finishAt: _.now(),
                status: 'DONE',
                real_sql: sql.replace(/'/g,`"`),
                args: JSON.stringify(sqlArgs),
                result: JSON.stringify(data)
              }
            })
            return { result_id: result.id };
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
      if(fpm.M){
        fpm.M.install(path.join(__dirname,'../sql'))
          .catch(e => {
            fpm.logger.error(e);
          })
      }
    })
    return bizModule;
  }
}
