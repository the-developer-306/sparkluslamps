/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_EWD_OTP_Fields_Meta` (
  `Meta_ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `Field_ID` mediumint(9) DEFAULT 0,
  `Order_ID` mediumint(9) DEFAULT 0,
  `Customer_ID` mediumint(9) DEFAULT 0,
  `Sales_Rep_ID` mediumint(9) DEFAULT 0,
  `Meta_Value` text NOT NULL DEFAULT '',
  UNIQUE KEY `id` (`Meta_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
