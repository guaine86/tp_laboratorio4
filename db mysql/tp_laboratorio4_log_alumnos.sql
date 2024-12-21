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
-- Table structure for table `log_alumnos`
--

DROP TABLE IF EXISTS `log_alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_alumnos` (
  `idlog_alumnos` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(65) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `usuario` varchar(35) NOT NULL,
  `tabla` varchar(30) NOT NULL,
  `bbdd` varchar(30) NOT NULL,
  PRIMARY KEY (`idlog_alumnos`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_alumnos`
--

LOCK TABLES `log_alumnos` WRITE;
/*!40000 ALTER TABLE `log_alumnos` DISABLE KEYS */;
INSERT INTO `log_alumnos` VALUES (188,'Solicitud de alta','2024-12-15','root@localhost','alumnos','tp_laboratorio4'),(189,'Alta confirmada - ID: 19','2024-12-15','root@localhost','alumnos','tp_laboratorio4'),(190,'Solicitud de alta','2024-12-16','root@localhost','alumnos','tp_laboratorio4'),(191,'Alta confirmada - ID: 20','2024-12-16','root@localhost','alumnos','tp_laboratorio4'),(192,'Solicitud de alta','2024-12-16','root@localhost','alumnos','tp_laboratorio4'),(193,'Alta confirmada - ID: 21','2024-12-16','root@localhost','alumnos','tp_laboratorio4'),(194,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(195,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(196,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(197,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(198,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(199,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(200,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(201,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(202,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(203,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(204,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(205,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(206,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(207,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(208,'Cambio solicitado - ID: 20','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(209,'Datos modificados con exito - ID: 20','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(210,'Cambio solicitado - ID: 20','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(211,'Datos modificados con exito - ID: 20','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(212,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(213,'Alta confirmada - ID: 22','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(215,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(216,'Alta confirmada - ID: 23','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(217,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(218,'Alta confirmada - ID: 24','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(219,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(220,'Alta confirmada - ID: 25','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(221,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(222,'Alta confirmada - ID: 26','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(223,'Solicitud de alta','2024-12-20','root@localhost','alumnos','tp_laboratorio4'),(224,'Alta confirmada - ID: 27','2024-12-20','root@localhost','alumnos','tp_laboratorio4');
/*!40000 ALTER TABLE `log_alumnos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-20 23:48:20
