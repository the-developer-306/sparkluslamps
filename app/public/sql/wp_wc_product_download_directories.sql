/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_product_download_directories` (
  `url_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(256) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`url_id`),
  KEY `url` (`url`(191))
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `wp_wc_product_download_directories` (`url_id`, `url`, `enabled`) VALUES (1,'file:///srv/htdocs/wp-content/uploads/woocommerce_uploads/',1);
INSERT INTO `wp_wc_product_download_directories` (`url_id`, `url`, `enabled`) VALUES (2,'https://sparkluslamps.com/wp-content/uploads/woocommerce_uploads/',1);
