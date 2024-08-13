/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_social_users` (
  `social_users_id` int(11) NOT NULL AUTO_INCREMENT,
  `ID` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `identifier` varchar(100) NOT NULL,
  `register_date` datetime DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `link_date` datetime DEFAULT NULL,
  PRIMARY KEY (`social_users_id`),
  KEY `ID` (`ID`,`type`),
  KEY `identifier` (`identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `wp_social_users` (`social_users_id`, `ID`, `type`, `identifier`, `register_date`, `login_date`, `link_date`) VALUES (1,249257062,'google','106767112446901498788',NULL,'2024-06-28 23:53:36','2024-06-28 15:15:58');
