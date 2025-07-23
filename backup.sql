-- MySQL dump 10.13  Distrib 9.3.0, for macos14.7 (x86_64)
--
-- Host: localhost    Database: warranty_db
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_PolicyCategories`
--

DROP TABLE IF EXISTS `_PolicyCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_PolicyCategories` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_PolicyCategories_AB_unique` (`A`,`B`),
  KEY `_PolicyCategories_B_index` (`B`),
  CONSTRAINT `_PolicyCategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProductCategory` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_PolicyCategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `WarrantyPolicy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_PolicyCategories`
--

LOCK TABLES `_PolicyCategories` WRITE;
/*!40000 ALTER TABLE `_PolicyCategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `_PolicyCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AmcPlan`
--

DROP TABLE IF EXISTS `AmcPlan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AmcPlan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oem_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variant_id` int NOT NULL,
  `category_id` int NOT NULL,
  `category_ids` json NOT NULL,
  `plan_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `duration_months` int NOT NULL,
  `benefits_json` json NOT NULL,
  `active` tinyint(1) NOT NULL,
  `renewal_options` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eligibility` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AmcPlan_oem_id_fkey` (`oem_id`),
  KEY `AmcPlan_variant_id_fkey` (`variant_id`),
  KEY `AmcPlan_category_id_fkey` (`category_id`),
  CONSTRAINT `AmcPlan_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `ProductCategory` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AmcPlan_oem_id_fkey` FOREIGN KEY (`oem_id`) REFERENCES `OemAccount` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AmcPlan_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `ProductVariant` (`variant_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AmcPlan`
--

LOCK TABLES `AmcPlan` WRITE;
/*!40000 ALTER TABLE `AmcPlan` DISABLE KEYS */;
/*!40000 ALTER TABLE `AmcPlan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `end_user_profiles`
--

DROP TABLE IF EXISTS `end_user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `end_user_profiles` (
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `familyId` int DEFAULT NULL,
  `referralCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `end_user_profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_user_profiles`
--

LOCK TABLES `end_user_profiles` WRITE;
/*!40000 ALTER TABLE `end_user_profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `end_user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Feature`
--

DROP TABLE IF EXISTS `Feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Feature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Feature_code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Feature`
--

LOCK TABLES `Feature` WRITE;
/*!40000 ALTER TABLE `Feature` DISABLE KEYS */;
INSERT INTO `Feature` VALUES (1,'ADD_PRODUCT','Product Catalogue'),(2,'EDIT_PRODUCT','Product Catalogue'),(3,'DELETE_PRODUCT','Product Catalogue'),(4,'VIEW_PRODUCTS','Product Catalogue'),(5,'MANAGE_VARIANTS','Product Catalogue'),(6,'ADD_WARRANTY_POLICY','Warranty Management'),(7,'VIEW_WARRANTY_POLICIES','Warranty Management'),(8,'EDIT_WARRANTY_POLICY','Warranty Management'),(9,'ADD_AMC_PLAN','AMC Management'),(10,'VIEW_AMC_PLANS','AMC Management'),(11,'RAISE_COMPLAINT','Complaint Management'),(12,'ASSIGN_COMPLAINT','Complaint Management'),(13,'VIEW_COMPLAINTS','Complaint Management'),(14,'UPDATE_JOB_STATUS','Job Tracking'),(15,'VIEW_JOB_LOGS','Job Tracking'),(16,'TRANSFER_OWNERSHIP','Ownership Management'),(17,'CREATE_SCRAP_REQUEST','Scrap Management'),(18,'APPROVE_SCRAP','Scrap Management'),(19,'REDEEM_REFERRAL','Referral & Rewards'),(20,'VIEW_REWARDS','Referral & Rewards'),(21,'ADD_USER','User Management'),(22,'ASSIGN_ROLE','User Management'),(23,'VIEW_USERS','User Management'),(24,'MANAGE_PERMISSIONS','User Management');
/*!40000 ALTER TABLE `Feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oem_user_profiles`
--

DROP TABLE IF EXISTS `oem_user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oem_user_profiles` (
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `oem_user_profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oem_user_profiles`
--

LOCK TABLES `oem_user_profiles` WRITE;
/*!40000 ALTER TABLE `oem_user_profiles` DISABLE KEYS */;
INSERT INTO `oem_user_profiles` VALUES ('52c1f2a1-2226-4360-a058-7891b8d3d7f0','OEM Admin','EMP-1752850460137'),('60c6a039-9156-438f-84dc-299b0fc3377d','OEM Admin','EMP-1752836667583'),('d0842b29-bc81-45c0-9a29-5a2e64cacd98','OEM Admin','EMP-1752850631011');
/*!40000 ALTER TABLE `oem_user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OemAccount`
--

DROP TABLE IF EXISTS `OemAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OemAccount` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gst_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `support_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OemAccount`
--

LOCK TABLES `OemAccount` WRITE;
/*!40000 ALTER TABLE `OemAccount` DISABLE KEYS */;
INSERT INTO `OemAccount` VALUES ('3dab58e7-9638-4fe3-8d73-7f9a2a11fd67','Samsung','29ABCDE1234F1Z5','support@samsung.com','1800-123-456','Delhi, India','admin@Onida.com','2025-07-18 11:36:47.474','2025-07-18 11:36:47.474'),('8703c541-3bb5-4969-b8fa-fa1985f32b57','Samsung','29ABCDE1234F1Z5','support@onida.com','1800-123-456','Delhi, India','admin@onida.com','2025-07-18 14:57:10.836','2025-07-18 14:57:10.836'),('91f3ec3e-fb2f-43cd-84ac-63be036198a3','Samsung','29ABCDE1234F1Z5','support@lg.com','1800-123-456','Delhi, India','admin@lg.com','2025-07-18 14:54:19.907','2025-07-18 14:54:19.907'),('943d14f3-de56-4694-903a-06e7d46d5c82','Samsung','29ABCDE1234F1Z5','support@samsung.com','1800-123-456','Delhi, India','admin@Onida.com','2025-07-18 11:35:07.687','2025-07-18 11:35:07.687'),('b070c158-907a-4c05-955a-c6fd1dbfe2ee','Samsung','29ABCDE1234F1Z5','support@lg.com','1800-123-456','Delhi, India','admin@lg.com','2025-07-18 14:42:04.591','2025-07-18 14:42:04.591'),('dabe5d90-a2c6-444f-9f3c-03d3faf4ecf2','Samsung','29ABCDE1234F1Z5','support@samsung.com','1800-123-456','Delhi, India','admin@samsung.com','2025-07-18 11:04:27.333','2025-07-18 11:04:27.333');
/*!40000 ALTER TABLE `OemAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oem_account_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `specifications` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Product_oem_account_id_fkey` (`oem_account_id`),
  KEY `Product_category_id_fkey` (`category_id`),
  CONSTRAINT `Product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `ProductCategory` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Product_oem_account_id_fkey` FOREIGN KEY (`oem_account_id`) REFERENCES `OemAccount` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'dabe5d90-a2c6-444f-9f3c-03d3faf4ecf2','Smart Washing Machine',1,'Front load, 6kg, Smart WiFi, Inverter','WM-SMART-6KG','2025-07-22 06:14:08.046');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductCategory`
--

DROP TABLE IF EXISTS `ProductCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductCategory` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `ProductCategory_parent_id_fkey` (`parent_id`),
  CONSTRAINT `ProductCategory_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `ProductCategory` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductCategory`
--

LOCK TABLES `ProductCategory` WRITE;
/*!40000 ALTER TABLE `ProductCategory` DISABLE KEYS */;
INSERT INTO `ProductCategory` VALUES (1,NULL,'Smartphones','All smartphone devices'),(3,NULL,'Electronics','All smartphone devices');
/*!40000 ALTER TABLE `ProductCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductVariant`
--

DROP TABLE IF EXISTS `ProductVariant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductVariant` (
  `variant_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `sku_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variant_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attributes_json` json NOT NULL,
  `dealer_price` double NOT NULL,
  `MRP` double NOT NULL,
  `warranty_months` int NOT NULL,
  `amc_available` tinyint(1) NOT NULL,
  `refundable` tinyint(1) NOT NULL,
  `launch_date` datetime(3) NOT NULL,
  `discontinued_date` datetime(3) DEFAULT NULL,
  `bar_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`variant_id`),
  KEY `ProductVariant_product_id_fkey` (`product_id`),
  CONSTRAINT `ProductVariant_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductVariant`
--

LOCK TABLES `ProductVariant` WRITE;
/*!40000 ALTER TABLE `ProductVariant` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductVariant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oem_account_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'SUPER_ADMIN',NULL),(2,'OEM_ADMIN','dabe5d90-a2c6-444f-9f3c-03d3faf4ecf2'),(6,'OEM_ADMIN','91f3ec3e-fb2f-43cd-84ac-63be036198a3'),(7,'OEM_ADMIN','8703c541-3bb5-4969-b8fa-fa1985f32b57');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_feature_accesses`
--

DROP TABLE IF EXISTS `role_feature_accesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_feature_accesses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `featureId` int NOT NULL,
  `accessType` enum('READ','WRITE','MANAGE') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_feature_accesses_roleId_featureId_key` (`roleId`,`featureId`),
  KEY `role_feature_accesses_featureId_fkey` (`featureId`),
  CONSTRAINT `role_feature_accesses_featureId_fkey` FOREIGN KEY (`featureId`) REFERENCES `Feature` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `role_feature_accesses_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_feature_accesses`
--

LOCK TABLES `role_feature_accesses` WRITE;
/*!40000 ALTER TABLE `role_feature_accesses` DISABLE KEYS */;
INSERT INTO `role_feature_accesses` VALUES (1,2,1,'READ'),(2,2,2,'READ'),(3,2,3,'READ'),(4,2,4,'READ'),(5,2,5,'READ'),(6,2,6,'READ'),(7,2,7,'READ'),(8,2,8,'READ'),(9,2,9,'READ'),(10,2,10,'READ'),(11,6,1,'READ'),(12,6,2,'READ'),(13,6,3,'READ'),(14,6,4,'READ'),(15,6,5,'READ'),(16,6,6,'READ'),(17,6,7,'READ'),(18,6,8,'READ'),(19,6,9,'READ'),(20,6,10,'READ'),(21,7,1,'READ'),(22,7,2,'READ'),(23,7,3,'READ'),(24,7,4,'READ'),(25,7,5,'READ'),(26,7,6,'READ'),(27,7,7,'READ'),(28,7,8,'READ'),(29,7,9,'READ'),(30,7,10,'READ');
/*!40000 ALTER TABLE `role_feature_accesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceAgency`
--

DROP TABLE IF EXISTS `ServiceAgency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceAgency` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agency_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceAgency`
--

LOCK TABLES `ServiceAgency` WRITE;
/*!40000 ALTER TABLE `ServiceAgency` DISABLE KEYS */;
/*!40000 ALTER TABLE `ServiceAgency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technician_profiles`
--

DROP TABLE IF EXISTS `technician_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technician_profiles` (
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skills` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `certifications` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedAgencyId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `technician_profiles_assignedAgencyId_fkey` (`assignedAgencyId`),
  CONSTRAINT `technician_profiles_assignedAgencyId_fkey` FOREIGN KEY (`assignedAgencyId`) REFERENCES `ServiceAgency` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `technician_profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technician_profiles`
--

LOCK TABLES `technician_profiles` WRITE;
/*!40000 ALTER TABLE `technician_profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `technician_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` enum('SUPER_ADMIN','OEM','TECHNICIAN','SERVICE_AGENCY','END_USER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int NOT NULL,
  `oem_account_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service_agency_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','SUSPENDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  KEY `User_role_id_fkey` (`role_id`),
  KEY `User_oem_account_id_fkey` (`oem_account_id`),
  KEY `User_service_agency_id_fkey` (`service_agency_id`),
  CONSTRAINT `User_oem_account_id_fkey` FOREIGN KEY (`oem_account_id`) REFERENCES `OemAccount` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `User_service_agency_id_fkey` FOREIGN KEY (`service_agency_id`) REFERENCES `ServiceAgency` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('52c1f2a1-2226-4360-a058-7891b8d3d7f0','OEM Admin','admin@lg.com','9876543210','$2b$10$ouFtFNKiEXOc0ztCRJQA1O0tZJprFkTerAl8UxRafKCwyZ8seA0Xa','OEM',6,'91f3ec3e-fb2f-43cd-84ac-63be036198a3',NULL,'ACTIVE','2025-07-18 14:54:20.131','2025-07-18 14:54:20.131'),('60c6a039-9156-438f-84dc-299b0fc3377d','OEM Admin','admin@samsung.com','9876543210','$2b$10$IwFzohKGDAvpr0OlVPj7r.xgf3hi0mVctLePbKHSRtheTMnYSHegO','OEM',2,'dabe5d90-a2c6-444f-9f3c-03d3faf4ecf2',NULL,'ACTIVE','2025-07-18 11:04:27.580','2025-07-18 11:04:27.580'),('d0842b29-bc81-45c0-9a29-5a2e64cacd98','OEM Admin','admin@onida.com','9876543210','$2b$10$JNP8AUxJGSHWIL4CEVrBZucRec0eGArQ7OAR88J6tEuYU3/uWYvIO','OEM',7,'8703c541-3bb5-4969-b8fa-fa1985f32b57',NULL,'ACTIVE','2025-07-18 14:57:11.008','2025-07-18 14:57:11.008');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WarrantyPolicy`
--

DROP TABLE IF EXISTS `WarrantyPolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WarrantyPolicy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oem_account_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `policy_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_transferable` tinyint(1) NOT NULL,
  `product_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `duration_months` int NOT NULL,
  `coverage_details` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `terms_json` json NOT NULL,
  `type` enum('STANDARD','EXTENDED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `trigger` enum('PURCHASE_DATE','INSTALLATION_DATE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `set_conditions` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `WarrantyPolicy_oem_account_id_fkey` (`oem_account_id`),
  KEY `WarrantyPolicy_product_id_fkey` (`product_id`),
  KEY `WarrantyPolicy_variant_id_fkey` (`variant_id`),
  CONSTRAINT `WarrantyPolicy_oem_account_id_fkey` FOREIGN KEY (`oem_account_id`) REFERENCES `OemAccount` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `WarrantyPolicy_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `WarrantyPolicy_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `ProductVariant` (`variant_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WarrantyPolicy`
--

LOCK TABLES `WarrantyPolicy` WRITE;
/*!40000 ALTER TABLE `WarrantyPolicy` DISABLE KEYS */;
/*!40000 ALTER TABLE `WarrantyPolicy` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-22 16:50:11
