/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wotv_woo_track_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) DEFAULT NULL,
  `tracking_number` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `carrier_id` varchar(50) DEFAULT NULL,
  `carrier_name` varchar(50) DEFAULT NULL,
  `shipping_country_code` varchar(50) DEFAULT NULL,
  `track_info` longtext DEFAULT NULL,
  `last_event` longtext DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `wp_wotv_woo_track_info` (`id`, `order_id`, `tracking_number`, `status`, `carrier_id`, `carrier_name`, `shipping_country_code`, `track_info`, `last_event`, `create_at`, `modified_at`) VALUES (1,289,'4975689645','pending','custom_1719653746','bluedart','IN','','','2024-06-29 10:50:38','0000-00-00 00:00:00');
INSERT INTO `wp_wotv_woo_track_info` (`id`, `order_id`, `tracking_number`, `status`, `carrier_id`, `carrier_name`, `shipping_country_code`, `track_info`, `last_event`, `create_at`, `modified_at`) VALUES (2,83,'49756896','pending','bluedart','bluedart','IN','','','2024-06-29 12:23:56','0000-00-00 00:00:00');
