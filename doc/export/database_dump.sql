-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 172.22.146.47    Database: cronos
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AuditLog`
--

BEGIN TRANSACTION;

DROP TABLE IF EXISTS `AuditLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AuditLog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AuditLog_userId_fkey` (`userId`),
  CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuditLog`
--

LOCK TABLES `AuditLog` WRITE;
/*!40000 ALTER TABLE `AuditLog` DISABLE KEYS */;
INSERT INTO `AuditLog` VALUES (1,3,'User logged in.','2025-01-20 19:22:44.210'),(2,3,'User updated their bio to Testing! Yooo my god!','2025-01-20 19:23:08.467'),(3,4,'New user registered','2025-01-20 19:25:04.766'),(4,4,'User logged in.','2025-01-20 19:25:39.247'),(5,4,'User updated their bio to This is the admin profile, please be cautious.','2025-01-20 19:27:43.375'),(6,4,'Accessing the admin page.','2025-01-20 19:47:27.047'),(7,3,'User logged in.','2025-01-20 19:50:39.126'),(8,4,'Accessing the admin page.','2025-01-20 20:09:49.569'),(9,4,'Accessing the admin page.','2025-01-20 20:10:27.612'),(10,4,'Accessing the admin page.','2025-01-20 20:19:17.067'),(11,4,'Accessing the admin page.','2025-01-20 20:19:26.203'),(12,4,'Accessing the admin page.','2025-01-20 20:24:40.406'),(13,4,'Accessing the admin page.','2025-01-20 20:25:03.373'),(14,4,'User logged in.','2025-01-20 20:26:56.190'),(15,4,'Accessing the admin page.','2025-01-20 20:27:03.708'),(16,4,'Accessing the admin page.','2025-01-20 20:27:47.542'),(17,4,'Accessing the admin page.','2025-01-20 20:28:05.163'),(18,4,'Accessing the admin page.','2025-01-20 20:28:06.174'),(19,4,'Accessing the admin page.','2025-01-20 20:29:03.131');
/*!40000 ALTER TABLE `AuditLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EngagementMetrics`
--

DROP TABLE IF EXISTS `EngagementMetrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EngagementMetrics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `averageLikesPerPost` double NOT NULL DEFAULT '0',
  `averageCommentsPerPost` double NOT NULL DEFAULT '0',
  `engagementRate` double NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `EngagementMetrics_userId_fkey` (`userId`),
  CONSTRAINT `EngagementMetrics_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EngagementMetrics`
--

LOCK TABLES `EngagementMetrics` WRITE;
/*!40000 ALTER TABLE `EngagementMetrics` DISABLE KEYS */;
/*!40000 ALTER TABLE `EngagementMetrics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Follow`
--

DROP TABLE IF EXISTS `Follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Follow` (
  `followerId` int NOT NULL,
  `followedId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`followerId`,`followedId`),
  KEY `Follow_followedId_fkey` (`followedId`),
  CONSTRAINT `Follow_followedId_fkey` FOREIGN KEY (`followedId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Follow_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Follow`
--

LOCK TABLES `Follow` WRITE;
/*!40000 ALTER TABLE `Follow` DISABLE KEYS */;
INSERT INTO `Follow` VALUES (1,3,'2025-01-20 15:59:52.329'),(3,1,'2025-01-20 17:58:07.166'),(3,2,'2025-01-20 16:07:35.778');
/*!40000 ALTER TABLE `Follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Like`
--

DROP TABLE IF EXISTS `Like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Like` (
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`userId`,`postId`),
  KEY `Like_postId_fkey` (`postId`),
  CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Like`
--

LOCK TABLES `Like` WRITE;
/*!40000 ALTER TABLE `Like` DISABLE KEYS */;
INSERT INTO `Like` VALUES (3,1,'2025-01-20 15:11:26.685'),(3,2,'2025-01-20 19:50:41.555'),(3,4,'2025-01-20 14:48:25.917'),(3,5,'2025-01-20 14:48:23.806'),(3,20,'2025-01-20 18:09:50.817'),(3,31,'2025-01-20 17:53:47.984'),(3,35,'2025-01-20 18:09:48.727'),(4,2,'2025-01-20 20:26:59.020'),(4,4,'2025-01-20 20:26:59.718');
/*!40000 ALTER TABLE `Like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `likeCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Post_userId_fkey` (`userId`),
  CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,1,'Hello World!','2025-01-01 12:00:00.000','2025-01-20 15:11:26.685',11),(2,2,'Learning MySQL is fun!','2025-01-10 08:30:00.000','2025-01-20 20:26:59.020',26),(4,1,'Another post from User 1.','2025-01-05 16:00:00.000','2025-01-20 20:26:59.718',6),(5,2,'A post with little engagement.','2025-01-12 20:15:00.000','2025-01-12 20:15:00.000',2),(15,3,'YOOOO','2025-01-20 17:40:35.902','2025-01-20 17:40:35.902',0),(17,3,'Joe, is that you?','2025-01-20 17:47:10.309','2025-01-20 17:47:10.309',0),(18,3,'Joe, is that you?','2025-01-20 17:47:15.074','2025-01-20 17:47:15.074',0),(19,3,'Joe, is that you?','2025-01-20 17:47:16.875','2025-01-20 17:47:16.875',0),(20,3,'Joe, is that you?','2025-01-20 17:47:17.042','2025-01-20 18:09:50.817',1),(21,3,'Joe, is that you?','2025-01-20 17:47:17.195','2025-01-20 17:47:17.195',0),(22,3,'Joe, is that you?','2025-01-20 17:47:17.348','2025-01-20 17:47:17.348',0),(23,3,'Joe, is that you?','2025-01-20 17:47:17.501','2025-01-20 17:47:17.501',0),(24,3,'Joe, is that you?','2025-01-20 17:47:17.629','2025-01-20 17:47:17.629',0),(25,3,'Joe, is that you?','2025-01-20 17:47:17.782','2025-01-20 17:47:17.782',0),(26,3,'WOoo','2025-01-20 17:49:08.009','2025-01-20 17:49:08.009',0),(28,3,'Testing 123\n### HOOOO\n- 1\n- 2\n- 3','2025-01-20 17:49:57.064','2025-01-20 17:49:57.064',0),(29,3,'123','2025-01-20 17:50:13.316','2025-01-20 17:50:13.316',0),(30,3,'Hello','2025-01-20 17:50:55.752','2025-01-20 17:50:55.752',0),(31,3,'Why?','2025-01-20 17:53:38.934','2025-01-20 17:53:47.984',1),(34,3,'What is happening?','2025-01-20 17:55:45.718','2025-01-20 17:55:45.718',0),(35,3,'Weird one off bug?\n','2025-01-20 17:56:04.421','2025-01-20 18:09:48.727',1);
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostPopularity`
--

DROP TABLE IF EXISTS `PostPopularity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostPopularity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `viralityScore` double NOT NULL DEFAULT '0',
  `engagementRate` double NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `PostPopularity_postId_fkey` (`postId`),
  CONSTRAINT `PostPopularity_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostPopularity`
--

LOCK TABLES `PostPopularity` WRITE;
/*!40000 ALTER TABLE `PostPopularity` DISABLE KEYS */;
INSERT INTO `PostPopularity` VALUES (1,1,1.5,0.75,'2025-01-01 12:00:00.000'),(2,2,2.3,1.2,'2025-01-10 08:30:00.000'),(4,4,0.5,0.2,'2025-01-05 16:00:00.000'),(5,5,0.8,0.4,'2025-01-12 20:15:00.000'),(6,17,0,0,'2025-01-20 17:47:10.317'),(7,18,0,0,'2025-01-20 17:47:15.083'),(8,19,0,0,'2025-01-20 17:47:16.882'),(9,20,0,0,'2025-01-20 17:47:17.048'),(10,21,0,0,'2025-01-20 17:47:17.204'),(11,22,0,0,'2025-01-20 17:47:17.355'),(12,23,0,0,'2025-01-20 17:47:17.507'),(13,24,0,0,'2025-01-20 17:47:17.636'),(14,25,0,0,'2025-01-20 17:47:17.788'),(15,26,0,0,'2025-01-20 17:49:08.024'),(17,28,0,0,'2025-01-20 17:49:57.079'),(18,29,0,0,'2025-01-20 17:50:13.330'),(19,30,0,0,'2025-01-20 17:50:55.763'),(20,31,0,0,'2025-01-20 17:53:38.955'),(23,34,0,0,'2025-01-20 17:55:45.725'),(24,35,0,0,'2025-01-20 17:56:04.427');
/*!40000 ALTER TABLE `PostPopularity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `PostScores`
--

DROP TABLE IF EXISTS `PostScores`;
/*!50001 DROP VIEW IF EXISTS `PostScores`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `PostScores` AS SELECT 
 1 AS `id`,
 1 AS `content`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `likeCount`,
 1 AS `userId`,
 1 AS `username`,
 1 AS `viralityScore`,
 1 AS `engagementRate`,
 1 AS `score`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashedPassword` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profilePicture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `followCount` int NOT NULL DEFAULT '0',
  `role` enum('USER','MODERATOR','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Joe@gmail.com','$2a$10$PUbjhoon3Dni5MLKOZ2QdeHDwSwojJKPzes6pILvla6UpjELbpGNa',NULL,NULL,'2025-01-19 15:16:58.885','2025-01-20 17:58:07.166','Joe',1,'USER'),(2,'MArlin@gmail.com','$2a$10$c6k03OmS0tAmf5MOEtabYepU4EqjDuI1CeiM7hPl4ec6LoFKJGOLK',NULL,NULL,'2025-01-19 15:17:43.713','2025-01-20 16:07:35.778','Tobias',1,'USER'),(3,'Test','$2a$10$vs.f3ztUH21/BUJOLnWcVOO3odiEDH8ujwtHWmbRxwl1Y6bJ1iglm','Testing! Yooo my god!',NULL,'2025-01-19 15:19:08.578','2025-01-20 19:23:08.453','Test',1,'USER'),(4,'admin@gmail.com','$2a$10$j7NvvDnfPETH2XXTutAZnuwTJ.aOU7KlBQKwIgWbniGq2feR4dIMW','This is the admin profile, please be cautious.',NULL,'2025-01-20 19:25:04.761','2025-01-20 19:27:43.362','Admin',0,'ADMIN'),(5,'johndoe@example.com','hashedpassword1',NULL,NULL,'2025-01-20 20:28:10.117','2025-01-20 20:28:10.117','johndoe',150,'USER'),(6,'janedoe@example.com','hashedpassword2',NULL,NULL,'2025-01-20 20:28:10.117','2025-01-20 20:28:10.117','janedoe',120,'USER'),(7,'adminuser@example.com','hashedpassword3',NULL,NULL,'2025-01-20 20:28:10.117','2025-01-20 20:28:10.117','adminuser',300,'USER');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('1430a396-a90c-461a-94db-786196ceb113','12bc0e1c12a24bb04063b8a1f27ab803e2afb6a8aed16412d6cab3fc8ab42507','2025-01-19 10:57:35.021','20250119105734_fix_follow_relations',NULL,NULL,'2025-01-19 10:57:34.213',1),('27e589d4-6b05-423f-848b-41ba8e1fd683','b63718105054b50f0b950ad6509af52749ee1d04a8f004ca2fdc5e5d8e15616d','2025-01-19 15:05:54.121','20250119150554_rename_nickname_to_username',NULL,NULL,'2025-01-19 15:05:54.046',1),('75a3caea-ef6a-4ed6-a676-11755401b63e','573a5a685883543666ec183565b5c7e4ee92151d36e76d50b70874a03f95f47c','2025-01-20 14:48:10.099','20250120144809_added',NULL,NULL,'2025-01-20 14:48:09.888',1),('891535ef-d1c6-485a-a3a0-787d1dcff27f','720882144640fff14997f4478fa931f5b03f1c9b462f7fb1eb11de12c1879eec',NULL,'20250120152452_updated','A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20250120152452_updated\n\nDatabase error code: 1826\n\nDatabase error:\nDuplicate foreign key constraint name \'AuditLog_userId_fkey\'\n\nPlease check the query number 5 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20250120152452_updated\"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20250120152452_updated\"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:226',NULL,'2025-01-20 15:24:52.082',0);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `user_summary_view`
--

DROP TABLE IF EXISTS `user_summary_view`;
/*!50001 DROP VIEW IF EXISTS `user_summary_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_summary_view` AS SELECT 
 1 AS `user_id`,
 1 AS `username`,
 1 AS `email`,
 1 AS `bio`,
 1 AS `profilePicture`,
 1 AS `account_created`,
 1 AS `followCount`,
 1 AS `role`,
 1 AS `total_posts`,
 1 AS `total_followers`,
 1 AS `total_following`,
 1 AS `averageLikesPerPost`,
 1 AS `averageCommentsPerPost`,
 1 AS `engagementRate`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `PostScores`
--

/*!50001 DROP VIEW IF EXISTS `PostScores`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `PostScores` AS select `p`.`id` AS `id`,`p`.`content` AS `content`,`p`.`createdAt` AS `createdAt`,`p`.`updatedAt` AS `updatedAt`,`p`.`likeCount` AS `likeCount`,`u`.`id` AS `userId`,`u`.`username` AS `username`,`pp`.`viralityScore` AS `viralityScore`,`pp`.`engagementRate` AS `engagementRate`,((`pp`.`viralityScore` + `pp`.`engagementRate`) * exp(-((((unix_timestamp(now()) - unix_timestamp(`p`.`createdAt`)) / 86400.0) / 2.0)))) AS `score` from ((`Post` `p` left join `PostPopularity` `pp` on((`pp`.`postId` = `p`.`id`))) left join `User` `u` on((`p`.`userId` = `u`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_summary_view`
--

/*!50001 DROP VIEW IF EXISTS `user_summary_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_summary_view` AS select `u`.`id` AS `user_id`,`u`.`username` AS `username`,`u`.`email` AS `email`,`u`.`bio` AS `bio`,`u`.`profilePicture` AS `profilePicture`,`u`.`createdAt` AS `account_created`,`u`.`followCount` AS `followCount`,`u`.`role` AS `role`,count(distinct `p`.`id`) AS `total_posts`,count(distinct `f1`.`followerId`) AS `total_followers`,count(distinct `f2`.`followedId`) AS `total_following`,`em`.`averageLikesPerPost` AS `averageLikesPerPost`,`em`.`averageCommentsPerPost` AS `averageCommentsPerPost`,`em`.`engagementRate` AS `engagementRate` from ((((`User` `u` left join `Post` `p` on((`u`.`id` = `p`.`userId`))) left join `Follow` `f1` on((`u`.`id` = `f1`.`followedId`))) left join `Follow` `f2` on((`u`.`id` = `f2`.`followerId`))) left join `EngagementMetrics` `em` on((`u`.`id` = `em`.`userId`))) group by `u`.`id`,`em`.`averageLikesPerPost`,`em`.`averageCommentsPerPost`,`em`.`engagementRate` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-20 21:37:56

COMMIT;
END;