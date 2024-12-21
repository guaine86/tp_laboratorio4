CREATE DATABASE  IF NOT EXISTS `tp_laboratorio4` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tp_laboratorio4`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: tp_laboratorio4
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `alumno_cursa_carrera`
--

DROP TABLE IF EXISTS `alumno_cursa_carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno_cursa_carrera` (
  `ALUMNOS_idalumnos` int NOT NULL,
  `CARRERA_idcarrera` int NOT NULL,
  `fecha_inscripcion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `confirma` tinyint NOT NULL DEFAULT '0',
  `egresado` tinyint NOT NULL DEFAULT '0',
  `muestra` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`ALUMNOS_idalumnos`,`CARRERA_idcarrera`),
  KEY `CARRERA_idcarrera_idx` (`CARRERA_idcarrera`),
  CONSTRAINT `fk_ALUMNOS_idalumnos` FOREIGN KEY (`ALUMNOS_idalumnos`) REFERENCES `alumnos` (`idalumnos`),
  CONSTRAINT `fk_CARRERA_idcarrera` FOREIGN KEY (`CARRERA_idcarrera`) REFERENCES `carrera` (`idcarrera`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno_cursa_carrera`
--

LOCK TABLES `alumno_cursa_carrera` WRITE;
/*!40000 ALTER TABLE `alumno_cursa_carrera` DISABLE KEYS */;
INSERT INTO `alumno_cursa_carrera` VALUES (19,5,'2024-12-15 01:14:36',1,1,1),(19,6,'2024-12-20 12:56:17',1,0,1),(19,7,'2024-12-19 15:52:24',1,0,1),(20,5,'2024-12-16 21:16:48',1,0,1),(21,7,'2024-12-16 21:50:35',0,0,1),(22,5,'2024-12-19 16:43:42',0,0,1),(23,6,'2024-12-19 22:01:19',1,0,0),(24,5,'2024-12-19 22:08:14',0,0,1),(25,8,'2024-12-19 22:13:07',0,0,1),(26,6,'2024-12-19 23:25:44',0,0,1),(27,5,'2024-12-20 02:00:51',0,0,1),(27,6,'2024-12-20 00:04:54',1,0,1),(27,7,'2024-12-20 02:14:58',1,0,1),(27,8,'2024-12-20 02:08:53',1,0,0);
/*!40000 ALTER TABLE `alumno_cursa_carrera` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-21 13:17:49
