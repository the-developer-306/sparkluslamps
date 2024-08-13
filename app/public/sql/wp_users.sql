/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT 0,
  `display_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`),
  KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=249257080 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257062,'sparkluslamps','$P$BT3nr8x2Fr7TnqdXaE9EdNf9UwLcJ/.','sparkluslamps','sparkluslamps@gmail.com','http://sparkluslampscom.wordpress.com','2024-04-12 10:52:39','',0,'Sparklus lamps');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257063,'Rishabh','$P$BaRaDAonFU.Xaou09Lwcjd1vbfxv6Z/','rishabh','rishichawla2016@gmail.com','','2024-06-30 17:09:01','1719767342:$P$BXvMLsTZ3bpDgWuGhNLkqmjh3d3bAR1',0,'Rishabh');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257064,'ayush.9548218100','$P$BLU5GueiODtBl5w6vjmKKHt1oCCAc3.','ayush-9548218100','ayusht@gmail.com','','2024-06-30 18:59:44','1719773984:$P$BSO/zH4/.xo7nn0YsBEHyxBQKhCmR1.',0,'ayush.9548218100');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257065,'ayush.09548218100','$P$BR5OLFSSH.uzvXN0iYq2YJmJW0Hl080','ayush-09548218100','ayushjtandon@gmail.com','','2024-06-30 22:56:22','1719788183:$P$Ban4iJgv0VnGx6PWJZxjXx.RZeN6HH0',0,'ayush.09548218100');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257066,'ayush.9548218100-5768','$P$B04bGwOnVez/B3.dDrmjgVnnoSFQHs/','ayush-9548218100-5768','ayush1@gmail.com','','2024-07-01 07:21:24','1719818484:$P$BfFCxu.wExm/16etv2.4eI1UaaRuXq1',0,'ayush.9548218100-5768');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257067,'ayush.9548218100-3148','$P$Bpv3H29iABZvo2Dx4VrxljTSvZLLvi/','ayush-9548218100-3148','ayush2@gmail.com','','2024-07-01 07:27:07','1719818827:$P$BB9p/wnGEktO1unR.iMQY9Qml75y4h.',0,'ayush.9548218100-3148');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257068,'Ayusht','$P$BHyM8t9yN7BLOwJLMIIPWDbGMbo5Ga/','ayusht','ayush3@gmail.com','','2024-07-01 07:34:22','1719819262:$P$BkQ7dN6/Agbwh8BLEefE8WBBqbE/IB.',0,'Ayusht');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257069,'ayush4','$P$B4JmCX2ou/H.lJrNbSt7rIWVAMN3J71','ayush4','ayush4@gmail.com','','2024-07-01 08:19:15','',0,'Ayush Tandon');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257070,'Ayushtan','$P$BcCW3ZcmaofY4GTUicQIfHfmVjBeag.','ayushtan','er.ayushtandon@gmail.com','','2024-07-01 08:41:06','1719823266:$P$B7As.zzIGN6U1P.lkEi7.Wk5grzlU.0',0,'Ayushtan');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257071,'er.vaibhavkhanna','$P$Bpe5QXjHN2t304nxfXcSro4ycKGdeW/','er-vaibhavkhanna','er.vaibhavkhanna@gmail.com','','2024-07-01 08:42:36','1719823357:$P$Boin63INIutNtPY2EDWvjWFBjkEbOg/',0,'Ayush Tandon');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257072,'rishabh123','$P$BSOBwaVx7Rxq0GvJb0QETQ8OOblrCZ.','rishabh123','rishabh123@gmail.com','','2024-07-01 18:27:40','1719858460:$P$BdrvgHAj/AOD23uDYYWtcWK1p6Fbkz.',0,'Rishabh Chawla');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257073,'ayush tandon.9548218100','$P$B41Yx9eTyDVUpocK640FBLvoxlhL3..','ayush-tandon-9548218100','ayusht22@gmail.com','','2024-07-01 20:04:29','1719864269:$P$BHHo75GfYile.iGRB4clOy4Un3Qv4k0',0,'ayush tandon.9548218100');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257077,'ayush.ayusht@gmail.com','$P$BDxWP77atNyyFTB67CMRVAtnzqq2bS.','ayush-ayushtgmail-com','ayusht111@gmail.com','','2024-07-05 06:25:19','1720160719:$P$BFyj.aqU1LGQOAW9fa6nhxn2KcS7/90',0,'ayush.ayusht@gmail.com');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257078,'sanjaytandon.2210','$P$BHbGkuLOrJ7xoHS38u.QGDMH/gFdSr0','sanjaytandon-2210','sanjaytandon.2210@gmail.com','','2024-07-05 16:37:45','1720197465:$P$BGAe0zIaaVUYCZ8cqCzPtfORAM3qzP1',0,'Sanjay Tandon');
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES (249257079,'rohitvishwakarma77707@gmail.com','$P$Bgkz1pohKANJ8lsg5kEm246tPnjSYQ0','rohitvishwakarma77707gmail-com','rohitvishwakarma77707@gmail.com','','2024-07-15 06:36:34','1721025394:$P$BtVgCUk.8Oja5netamtfz71AYW5Qws1',0,'rohitvishwakarma77707@gmail.com');
