/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_parcelpanel_tracking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) DEFAULT NULL,
  `order_item_id` bigint(20) unsigned DEFAULT 0,
  `tracking_number` varchar(50) NOT NULL DEFAULT '',
  `courier_code` varchar(191) NOT NULL DEFAULT '',
  `shipment_status` tinyint(3) NOT NULL DEFAULT 1,
  `last_event` text DEFAULT NULL,
  `last_event_at` int(10) unsigned NOT NULL DEFAULT 0,
  `original_country` varchar(10) NOT NULL DEFAULT '',
  `destination_country` varchar(10) NOT NULL DEFAULT '',
  `origin_info` text DEFAULT NULL,
  `destination_info` text DEFAULT NULL,
  `trackinfo` text DEFAULT NULL,
  `transit_time` tinyint(4) DEFAULT 0,
  `stay_time` tinyint(4) DEFAULT 0,
  `sync_times` tinyint(4) NOT NULL DEFAULT 0,
  `received_times` tinyint(4) NOT NULL DEFAULT 0,
  `fulfilled_at` int(10) unsigned NOT NULL DEFAULT 0,
  `updated_at` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tracking_number` (`tracking_number`),
  KEY `order_id` (`order_id`),
  KEY `shipment_status` (`shipment_status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
