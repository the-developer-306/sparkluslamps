/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_webhooks` (
  `webhook_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(200) NOT NULL,
  `name` text NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `delivery_url` text NOT NULL,
  `secret` text NOT NULL,
  `topic` varchar(200) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_created_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `api_version` smallint(4) NOT NULL,
  `failure_count` smallint(10) NOT NULL DEFAULT 0,
  `pending_delivery` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`webhook_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `wp_wc_webhooks` (`webhook_id`, `status`, `name`, `user_id`, `delivery_url`, `secret`, `topic`, `date_created`, `date_created_gmt`, `date_modified`, `date_modified_gmt`, `api_version`, `failure_count`, `pending_delivery`) VALUES (1,'active','product.updated',249257062,'https://webhookreceiver.pickrr.com/wh/v1/woocom/product?seller=667291d2fb0c8378bcbc01b0&type=product','ck_2688b364e930f8a60c92a31cfc0592da11f2fcab','product.updated','2024-07-15 12:03:41','2024-07-15 06:33:41','2024-08-03 03:55:47','2024-08-02 22:25:47',-1,1,0);
INSERT INTO `wp_wc_webhooks` (`webhook_id`, `status`, `name`, `user_id`, `delivery_url`, `secret`, `topic`, `date_created`, `date_created_gmt`, `date_modified`, `date_modified_gmt`, `api_version`, `failure_count`, `pending_delivery`) VALUES (2,'disabled','product.deleted',249257062,'https://webhookreceiver.pickrr.com/wh/v1/woocom/product?seller=667291d2fb0c8378bcbc01b0&type=product','ck_2688b364e930f8a60c92a31cfc0592da11f2fcab','product.deleted','2024-07-15 12:03:44','2024-07-15 06:33:44','2024-07-30 19:58:07','2024-07-30 14:28:07',-1,6,0);
INSERT INTO `wp_wc_webhooks` (`webhook_id`, `status`, `name`, `user_id`, `delivery_url`, `secret`, `topic`, `date_created`, `date_created_gmt`, `date_modified`, `date_modified_gmt`, `api_version`, `failure_count`, `pending_delivery`) VALUES (3,'active','product.created',249257062,'https://webhookreceiver.pickrr.com/wh/v1/woocom/product?seller=667291d2fb0c8378bcbc01b0&type=product','ck_2688b364e930f8a60c92a31cfc0592da11f2fcab','product.created','2024-07-15 12:03:47','2024-07-15 06:33:47','2024-08-03 03:55:45','2024-08-02 22:25:45',-1,1,0);
