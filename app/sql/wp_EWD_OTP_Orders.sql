/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_EWD_OTP_Orders` (
  `Order_ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `Order_Name` text NOT NULL DEFAULT '',
  `Order_Number` text NOT NULL DEFAULT '',
  `Order_Status` text NOT NULL DEFAULT '',
  `Order_External_Status` text NOT NULL DEFAULT '',
  `Order_Location` text NOT NULL DEFAULT '',
  `Order_Notes_Public` text NOT NULL DEFAULT '',
  `Order_Notes_Private` text NOT NULL DEFAULT '',
  `Order_Customer_Notes` text NOT NULL DEFAULT '',
  `Order_Email` text NOT NULL DEFAULT '',
  `Order_Phone_Number` text NOT NULL DEFAULT '',
  `Sales_Rep_ID` mediumint(9) NOT NULL DEFAULT 0,
  `Customer_ID` mediumint(9) NOT NULL DEFAULT 0,
  `WooCommerce_ID` mediumint(9) NOT NULL DEFAULT 0,
  `Zendesk_ID` mediumint(9) NOT NULL DEFAULT 0,
  `Order_Status_Updated` datetime DEFAULT '0000-00-00 00:00:00',
  `Order_Display` text NOT NULL DEFAULT '',
  `Order_Payment_Price` text NOT NULL DEFAULT '',
  `Order_Payment_Completed` text NOT NULL DEFAULT '',
  `Order_PayPal_Receipt_Number` text NOT NULL DEFAULT '',
  `Order_View_Count` mediumint(9) NOT NULL DEFAULT 0,
  `Order_Tracking_Link_Clicked` text NOT NULL DEFAULT '',
  `Order_Tracking_Link_Code` text NOT NULL DEFAULT '',
  UNIQUE KEY `id` (`Order_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
