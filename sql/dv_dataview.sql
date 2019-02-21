DROP TABLE IF EXISTS `dv_dataview`;
CREATE TABLE IF NOT EXISTS `dv_dataview` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `delflag` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除标示',
  `createAt` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据创建时间戳',
  `updateAt` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据更新时间戳',
  `name` varchar(200)  NULL  COMMENT '数据视图名称，英文名', 
  `title` varchar(200)  NULL DEFAULT 'Untitled' COMMENT '视图的标题', 
  `origin_sql` varchar(1000)  NULL  COMMENT '视图的sql', 
  `args` varchar(200)  NULL DEFAULT '{}' COMMENT '视图执行需要传入的参数，可以为空，JSON格式的字符串', 
  `filter` varchar(200)  NULL DEFAULT '{}' COMMENT '视图过滤器，可以为空，JSON格式的字符串', 
  `sortBy` varchar(200)  NULL DEFAULT 'id-' COMMENT '视图排序的参数，可以为空', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='the dataview list';