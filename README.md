## FPM-PLUGIN-DATAVIEW
用于 DATAVIEW 的插件.

该插件用于将一些复杂的SQL语句进行持久化，可以通过 fpm sdk 直接进行查询。

支持通过 计划任务 插件进行定期的执行，并将生成的结果进行存储。

[简单的ppt介绍](https://shimo.im/slides/GMHrLfEucUYo1Le4/)

**数据量较大时，不建议使用该功能存储结果**

### Install
```bash
npm add fpm-plugin-dataview --save
```

### Useage

- dep plugins
  - mysql
  - schedule

- config

- methods
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

- subscribe

- other