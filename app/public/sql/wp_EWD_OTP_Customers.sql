/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_EWD_OTP_Customers` (
  `Customer_ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `Customer_Number` text NOT NULL DEFAULT '',
  `Customer_Name` text NOT NULL DEFAULT '',
  `Sales_Rep_ID` mediumint(9) NOT NULL DEFAULT 0,
  `Customer_WP_ID` mediumint(9) NOT NULL DEFAULT 0,
  `Customer_FEUP_ID` mediumint(9) NOT NULL DEFAULT 0,
  `Customer_Email` text NOT NULL DEFAULT '',
  `Customer_Created` datetime DEFAULT '0000-00-00 00:00:00',
  UNIQUE KEY `id` (`Customer_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
