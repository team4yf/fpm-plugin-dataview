DROP TABLE IF EXISTS `dv_schedule`;
CREATE TABLE IF NOT EXISTS `dv_schedule` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `delflag` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除标示',
  `createAt` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据创建时间戳',
  `updateAt` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据更新时间戳',
  `name` varchar(200)  NULL  COMMENT '计划任务的名称，英文名', 
  `cron` varchar(200)  NULL  COMMENT 'cron 表达式', 
  `dv_name` varchar(200)  NULL  COMMENT '数据视图名称，英文名', 
  `task_id` bigint  NULL  COMMENT '生成的任务id', 
  `autorun` tinyint(1)  NULL DEFAULT '1' COMMENT '创建成功后，自动执行', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='the schedule list';