-- Adminer 4.2.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `grossmarkt` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `grossmarkt`;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `categories` (`id`, `name`) VALUES
(1,	'Obst'),
(2,	'Gemüse'),
(3,	'Pilze');

DROP TABLE IF EXISTS `producers`;
CREATE TABLE `producers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `producers` (`id`, `name`, `street`, `zip_code`, `town`, `country`) VALUES
(1,	'Georg & Partner',	'Krankenhausstrasse',	'88888',	'Tübingen',	'Deutschland');

DROP TABLE IF EXISTS `products`;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `products` (`id`, `producer_id`, `supplier_id`, `category_id`, `name`, `buying_price`, `selling_price`, `amount`, `bbd`, `origin`) VALUES
(1,	1,	1,	1,	'Apfel',	10.32,	14.99,	250,	'2015-09-10',	'Deutschland');

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `suppliers` (`id`, `name`, `street`, `zip_code`, `town`, `country`) VALUES
(1,	'Agenten AG',	'Stuttgarter Straße 1',	'70000',	'Stuttgart',	'Deutschland');

-- 2015-04-29 14:15:08
