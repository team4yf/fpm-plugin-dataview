DROP TABLE IF EXISTS `dv_result`;
CREATE TABLE IF NOT EXISTS `dv_result` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `delflag` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除标示',
  `createAt` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据创建时间戳',
  `updateAt` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据更新时间戳',
  `dv_name` varchar(200)  NULL  COMMENT '数据视图名称，英文名', 
  `status` varchar(200)  NULL DEFAULT 'TODO' COMMENT '任务执行状态。TODO：待执行，PENDING：执行中，DONE：完成，ERROR：异常结束，CANCEL：取消', 
  `result` text  NULL  COMMENT '任务执行的结果', 
  `real_sql` varchar(4000)  NULL  COMMENT '视图的sql', 
  `args` varchar(200)  NULL DEFAULT '{}' COMMENT '任务执行需要传入的参数，可以为空，JSON格式的字符串', 
  `startAt` bigint  NULL  COMMENT '任务开始时间', 
  `finishAt` bigint  NULL  COMMENT '任务开始时间', 
  `error` text  NULL  COMMENT '任务执行错误的内容', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='the task of the dataview tool';