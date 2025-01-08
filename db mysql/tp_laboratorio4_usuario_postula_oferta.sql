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
-- Table structure for table `usuario_postula_oferta`
--

DROP TABLE IF EXISTS `usuario_postula_oferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_postula_oferta` (
  `OFERTAS_idofertas` int NOT NULL,
  `USUARIOS_idusuarios` int NOT NULL,
  `fecha_postulacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `baja` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`OFERTAS_idofertas`,`USUARIOS_idusuarios`),
  KEY `fk_usuario_postula_oferta_2_idx` (`USUARIOS_idusuarios`),
  CONSTRAINT `fk_usuario_postula_oferta_1` FOREIGN KEY (`OFERTAS_idofertas`) REFERENCES `ofertas` (`idofertas`),
  CONSTRAINT `fk_usuario_postula_oferta_2` FOREIGN KEY (`USUARIOS_idusuarios`) REFERENCES `usuarios` (`idusuarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_postula_oferta`
--

LOCK TABLES `usuario_postula_oferta` WRITE;
/*!40000 ALTER TABLE `usuario_postula_oferta` DISABLE KEYS */;
INSERT INTO `usuario_postula_oferta` VALUES (1,12,'2025-01-04 16:18:10',1),(2,12,'2025-01-06 16:22:31',1),(3,12,'2025-01-06 22:11:04',1);
/*!40000 ALTER TABLE `usuario_postula_oferta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-08 10:16:47
