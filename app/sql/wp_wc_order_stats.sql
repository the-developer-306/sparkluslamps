/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_order_stats` (
  `order_id` bigint(20) unsigned NOT NULL,
  `parent_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_created_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_paid` datetime DEFAULT '0000-00-00 00:00:00',
  `date_completed` datetime DEFAULT '0000-00-00 00:00:00',
  `num_items_sold` int(11) NOT NULL DEFAULT 0,
  `total_sales` double NOT NULL DEFAULT 0,
  `tax_total` double NOT NULL DEFAULT 0,
  `shipping_total` double NOT NULL DEFAULT 0,
  `net_total` double NOT NULL DEFAULT 0,
  `returning_customer` tinyint(1) DEFAULT NULL,
  `status` varchar(200) NOT NULL,
  `customer_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `date_created` (`date_created`),
  KEY `customer_id` (`customer_id`),
  KEY `status` (`status`(191))
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (83,0,'2024-06-27 01:29:24','2024-06-26 19:59:24',NULL,NULL,1,1,0,0,1,0,'wc-processing',1);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (210,0,'2024-06-28 13:09:21','2024-06-28 07:39:21',NULL,NULL,1,1,0,0,1,1,'wc-processing',1);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (289,0,'2024-06-29 13:21:35','2024-06-29 07:51:35',NULL,NULL,1,1,0,0,1,1,'wc-processing',1);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (338,0,'2024-07-01 04:24:51','2024-06-30 22:54:51',NULL,NULL,1,1,0,0,1,0,'wc-processing',6);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (339,0,'2024-07-01 12:52:40','2024-07-01 07:22:40',NULL,NULL,1,1,0,0,1,0,'wc-processing',9);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (340,0,'2024-07-01 13:02:27','2024-07-01 07:32:27',NULL,NULL,1,1,0,0,1,0,'wc-processing',11);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (341,0,'2024-07-01 13:06:06','2024-07-01 07:36:06',NULL,NULL,1,1,0,0,1,0,'wc-processing',12);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (342,0,'2024-07-01 13:48:21','2024-07-01 08:18:21',NULL,NULL,1,1,0,0,1,0,'wc-processing',13);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (343,0,'2024-07-01 14:11:31','2024-07-01 08:41:31',NULL,NULL,2,2,0,0,2,0,'wc-processing',16);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (347,0,'2024-07-01 23:56:17','2024-07-01 18:26:17',NULL,NULL,2,2,0,0,2,0,'wc-processing',21);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (572,0,'2024-07-05 22:02:16','2024-07-05 16:32:16',NULL,NULL,1,1,0,0,1,0,'wc-failed',32);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (658,0,'2024-07-15 12:06:36','2024-07-15 06:36:36',NULL,NULL,1,1,0,0,1,0,'wc-cancelled',35);
INSERT INTO `wp_wc_order_stats` (`order_id`, `parent_id`, `date_created`, `date_created_gmt`, `date_paid`, `date_completed`, `num_items_sold`, `total_sales`, `tax_total`, `shipping_total`, `net_total`, `returning_customer`, `status`, `customer_id`) VALUES (734,0,'2024-08-08 12:36:25','2024-08-08 07:06:25',NULL,NULL,17,3161,0,0,3161,1,'wc-checkout-draft',1);
