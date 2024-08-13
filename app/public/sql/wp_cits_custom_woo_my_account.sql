/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_cits_custom_woo_my_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_position` varchar(255) NOT NULL,
  `select_design` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `wp_cits_custom_woo_my_account` (`id`, `menu_position`, `select_design`, `created_at`) VALUES (1,'horizontal','dark_design','2024-06-28 07:36:14');
