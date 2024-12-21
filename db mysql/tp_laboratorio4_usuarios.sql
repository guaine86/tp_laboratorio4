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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuarios` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `confirma` tinyint NOT NULL DEFAULT '0',
  `AUTH_idusuarios_autorizados` int NOT NULL,
  `ROL_idrol` int NOT NULL,
  PRIMARY KEY (`idusuarios`),
  KEY `fk_usuarios_1_idx` (`AUTH_idusuarios_autorizados`),
  KEY `fk_usuarios_2_idx` (`ROL_idrol`),
  CONSTRAINT `fk_usuarios_1` FOREIGN KEY (`AUTH_idusuarios_autorizados`) REFERENCES `usuarios_autorizados` (`idusuarios_autorizados`),
  CONSTRAINT `fk_usuarios_2` FOREIGN KEY (`ROL_idrol`) REFERENCES `rol` (`idrol`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'guaine86','edward wayne cruz','guaine86@gmail.com','$2a$08$YddmzPllfpKpg40Cq6SBlOvtIa3WYj2lAXoPv8Mf3X7P5vkgpTkCW',1,1,1),(6,'nicole24','priscila nicole bello','nicolepriscila192@gmail.com','$2a$08$lJzi2wiSLT2e4yeHyaMCueef1AI9w99oVLPypaHWU9IrSKtA6J/Fu',1,2,2),(8,'brunito1812','bruno valentino cruz gonzalez','ewcruz@yahoo.com.ar','$2a$08$/GslNskGp7Y94RshoHIqXuK/zApLuJVhNtuJ0NQWlDB1yl5y45A7m',1,3,2),(10,'gandalf','gandalf mcfly','edwardwaynecruz@gmail.com','$2a$08$mJ8ZeD9Di6pCUWBGqBuTEeaKULm2vqZWab1Wvt59kpmLhlf9vIWJO',1,10,2),(11,'gandalfito','gandalf mcfly of the system','informatica1.jea@gmail.com','$2a$08$ZyL3kwXvwced/2YJ0DXoEuojOsUTdFGDUGDFCBazi007OMZm2yZm.',0,10,2);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-21 13:17:48
