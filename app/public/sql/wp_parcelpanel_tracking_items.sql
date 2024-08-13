/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_parcelpanel_tracking_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `order_item_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `quantity` smallint(5) unsigned NOT NULL DEFAULT 0,
  `tracking_id` int(10) unsigned NOT NULL DEFAULT 0,
  `shipment_status` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `custom_shipment_status` smallint(5) unsigned NOT NULL DEFAULT 0,
  `custom_status_time` varchar(191) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `tracking_id` (`tracking_id`),
  KEY `order_id` (`order_id`),
  KEY `shipment_status` (`shipment_status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
