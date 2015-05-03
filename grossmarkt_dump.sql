CREATE DATABASE  IF NOT EXISTS `grossmarkt` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `grossmarkt`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: grossmarkt
-- ------------------------------------------------------
-- Server version	5.6.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Obst'),(2,'Gemüse'),(3,'Pilze');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producers`
--

DROP TABLE IF EXISTS `producers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producers`
--

LOCK TABLES `producers` WRITE;
/*!40000 ALTER TABLE `producers` DISABLE KEYS */;
INSERT INTO `producers` VALUES (1,'Agenten AG','Willenbergerstr. 84-88','50669','Köln','Deutschland'),(2,'Miller Limited','Entshirestr. 7','EC1Y 8SY','London','Grossbritannien'),(3,'Hangst GmbH','Eulenstr. 93','80322','Rosenheim','Deutschland'),(5,'Becker & Familie','Kanntweg 3','12685','Berlin','Deutschland'),(6,'Neumann UG','Königsstr. 20','70372','Stuttgart','Deutschland'),(7,'Küpper OHG','Bahnhofsstr. 7 - 9','1113','Wien','Österreich'),(8,'Ruck UG','Am Berg 6','80331','München','Deutschland'),(9,'Frisch & Fertig GmbH','Pappelalee 2','08237','Rotkirchen','Deutschland'),(10,'Hauff-Frasch GbR','Waldowstr. 45','74676','Niedernhall','Deutschland'),(11,'Timo & Laura Grossanbau GmbH','Mohrenstr. 26','72270','Baiersbronn','Deutschland'),(12,'Bauer AG','Heiligengeistbrücke 4','94451','Deggendorf','Deutschland'),(13,'Dinda Bioprodukte GmbH','Ruschestr. 68','19311','Wittenberge','Deutschland'),(14,'Traub & König GbR','Postweg 20','71254','Ditzingen','Deutschland');
/*!40000 ALTER TABLE `producers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `producer_id` int(10) unsigned NOT NULL,
  `supplier_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `buying_price` double NOT NULL,
  `selling_price` double NOT NULL,
  `amount` int(10) NOT NULL,
  `bbd` date NOT NULL,
  `origin` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,2,1,'Banane',0.79,1.09,750,'2015-09-10','Costa Rica'),(2,7,6,2,'Zwiebel',1.09,1.59,200,'2015-11-03','Deutschland'),(3,3,3,1,'Erdbeere',1.99,2.49,50,'2015-07-14','Italien'),(5,2,3,1,'Apfel',1.29,1.79,600,'2015-11-09','Deutschland'),(6,12,7,2,'Paprika',1.52,1.89,50,'2015-12-02','Deutschland'),(7,6,5,2,'Honigmelone',1.33,1.79,100,'2015-10-15','Türkei'),(8,8,6,1,'Birne',1.99,2.55,310,'2015-12-20','Österreich'),(9,14,5,3,'Pfifferlinge',9.49,12.19,20,'2015-07-10','Niederlande'),(10,12,8,2,'Karotte',0.99,1.34,150,'2016-02-08','Polen'),(11,11,1,2,'Tomate',2.05,2.55,205,'2015-01-22','Niederlande'),(12,13,3,1,'Himbeere',12.29,14.99,25,'2015-09-28','Deutschland');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Lukas GmbH','Münchnerstr. 4 - 6','70375','Stuttgart','Deutschland'),(2,'Georg & Partner','Bakerstr. 12','10292','New York','USA'),(3,'Blum AG','Am Kreisel 7','60311','Frankfurt am Main','Deutschland'),(4,'Robin GmbH','Schillerstr. 80 - 81','80799','München','Deutschland'),(5,'Bayha Schnellversand AG','Flughafenstr. 28','92260','Ammerthal','Deutschland'),(6,'Fruck Warentransport GmbH','Stuttgarter Platz 64 - 66','56412','Horbach','Deutschland'),(7,'Hofmann Service KG','Unter den Linden 91','39050','Magdeburg','Deutschland'),(8,'Grau OHG','Brandenburgischestr. 52','71543','Wüstenrot','Deutschland');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-05-03 13:52:52
