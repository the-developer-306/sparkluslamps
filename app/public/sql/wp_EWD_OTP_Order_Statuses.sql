/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_EWD_OTP_Order_Statuses` (
  `Order_Status_ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `Order_ID` mediumint(9) NOT NULL DEFAULT 0,
  `Order_Status` text NOT NULL DEFAULT '',
  `Order_Location` text NOT NULL DEFAULT '',
  `Order_Internal_Status` text NOT NULL DEFAULT '',
  `Order_Status_Created` datetime DEFAULT '0000-00-00 00:00:00',
  UNIQUE KEY `id` (`Order_Status_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
