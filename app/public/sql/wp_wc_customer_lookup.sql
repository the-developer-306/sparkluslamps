/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_wc_customer_lookup` (
  `customer_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `username` varchar(60) NOT NULL DEFAULT '',
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `date_last_active` timestamp NULL DEFAULT NULL,
  `date_registered` timestamp NULL DEFAULT NULL,
  `country` char(2) NOT NULL DEFAULT '',
  `postcode` varchar(20) NOT NULL DEFAULT '',
  `city` varchar(100) NOT NULL DEFAULT '',
  `state` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1043 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (1,249257062,'sparkluslamps','Sparklus','lamps','sparkluslamps@gmail.com','2024-08-08 07:06:25','2024-04-12 10:52:39','IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (4,249257063,'Rishabh','Rishabh','Chawla','rishichawla2016@gmail.com','2024-06-30 00:00:00','2024-06-30 17:09:01','','','','');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (5,249257064,'ayush.9548218100','Ayush','9548218100','ayusht@gmail.com','2024-06-30 00:00:00','2024-06-30 18:59:44','','','','');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (6,NULL,'','Ayush','Tandon','ayushjtandon@gmail.com','2024-06-30 22:54:51',NULL,'IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (7,249257065,'ayush.09548218100','Ayush','09548218100','ayushjtandon@gmail.com','2024-07-01 00:00:00','2024-06-30 22:56:22','','','','');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (8,249257066,'ayush.9548218100-5768','Ayush','9548218100','ayush1@gmail.com','2024-07-01 00:00:00','2024-07-01 07:21:24','','','','');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (9,NULL,'','Ayush','Tandon','ayush2@gmail.com','2024-07-01 07:22:40',NULL,'IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (10,249257067,'ayush.9548218100-3148','Ayush','9548218100','ayush2@gmail.com','2024-07-01 00:00:00','2024-07-01 07:27:07','','','','');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (11,NULL,'','Ayush','Tandon','ayush3@gmail.com','2024-07-01 07:32:27',NULL,'IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (12,249257068,'Ayusht','Ayush','Tandon','ayush3@gmail.com','2024-07-01 07:36:06','2024-07-01 07:34:22','IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (13,249257069,'ayush4','Ayush','Tandon','ayush4@gmail.com','2024-07-01 00:00:00','2024-07-01 08:19:15','IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (14,249257070,'Ayushtan','Ayush','Tandon','er.ayushtandon@gmail.com','2024-07-01 00:00:00','2024-07-01 08:41:06','','','','');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (15,NULL,'','Ayush','Tandon','er.vaibhavkhanna@gmail.com','2024-07-01 08:41:31',NULL,'IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (16,249257071,'er.vaibhavkhanna','Ayush','Tandon','er.vaibhavkhanna@gmail.com','2024-07-01 08:41:31','2024-07-01 08:42:36','IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (20,NULL,'','Rishabh ','Chawla ','rishabh123@gmail.com','2024-07-01 18:26:17',NULL,'IN','243122','Bareilly ','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (21,249257072,'rishabh123','Rishabh','Chawla','rishabh123@gmail.com','2024-07-01 18:26:17','2024-07-01 18:27:40','IN','243122','Bareilly ','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (22,249257073,'ayush tandon.9548218100','Ayush Tandon','9548218100','ayusht22@gmail.com','2024-07-02 00:00:00','2024-07-01 20:04:29','','','','');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (30,249257077,'ayush.ayusht@gmail.com','Ayush`','ayusht@gmail.com','ayusht111@gmail.com','2024-07-05 00:00:00','2024-07-05 06:25:19','','','','');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (31,NULL,'','Sanjay','Tandon','sanjaytandon.2210@gmail.com','2024-07-05 16:32:16',NULL,'IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (32,249257078,'sanjaytandon.2210','Sanjay','Tandon','sanjaytandon.2210@gmail.com','2024-07-05 16:32:16','2024-07-05 16:37:45','IN','243003','Bareilly','UP');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (35,249257079,'rohitvishwakarma77707@gmail.com','Testing','Team','rohitvishwakarma77707@gmail.com','2024-07-15 06:36:36','2024-07-15 06:36:34','IN','122002','Gurgaon','HR');
INSERT INTO `wp_wc_customer_lookup` (`customer_id`, `user_id`, `username`, `first_name`, `last_name`, `email`, `date_last_active`, `date_registered`, `country`, `postcode`, `city`, `state`) VALUES (37,NULL,'','','','','2024-07-21 08:36:56',NULL,'IN','','','UP');
