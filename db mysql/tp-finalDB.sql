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
INSERT INTO `alumno_cursa_carrera` VALUES (19,5,'2024-12-15 01:14:36',1,0,1),(19,6,'2024-12-20 12:56:17',1,0,1),(19,7,'2024-12-19 15:52:24',1,0,1),(20,5,'2024-12-16 21:16:48',1,0,1),(21,7,'2024-12-16 21:50:35',0,0,1),(22,5,'2024-12-19 16:43:42',0,0,1),(23,6,'2024-12-19 22:01:19',1,0,0),(24,5,'2024-12-19 22:08:14',0,0,1),(25,8,'2024-12-19 22:13:07',0,0,1),(26,6,'2024-12-19 23:25:44',0,0,1),(27,5,'2024-12-20 02:00:51',0,0,1),(27,6,'2024-12-20 00:04:54',1,0,0),(27,7,'2024-12-20 02:14:58',1,0,0),(27,8,'2024-12-20 02:08:53',1,0,0),(28,6,'2024-12-21 18:47:05',1,0,1),(29,6,'2024-12-21 23:01:46',1,0,1),(30,5,'2024-12-28 14:18:56',1,0,1);
/*!40000 ALTER TABLE `alumno_cursa_carrera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `idalumnos` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(35) NOT NULL,
  `apellido` varchar(35) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `fecha_nac` date NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `domicilio` varchar(45) NOT NULL,
  `observaciones` varchar(140) DEFAULT '-',
  PRIMARY KEY (`idalumnos`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (19,'edward wayne','cruz quattrone','92783036','1986-03-05','1159773824','guaine86@gmail.com','av san martin 1860','-'),(20,'bruno valentino','cruz gonzalez','54957857','2007-12-18','1158773824','guaine86@gmail.com','av san martin 1860','-'),(21,'ed','cruz','92783099','2000-11-23','1135357541','ewcruz@yahoo.com.ar','av san martin 1860','-'),(22,'priscila','bello','42838785','2000-11-23','1123495654','nicolepriscila192@gmail.com','jose equiza 3879','.'),(23,'claudia ','cruz','17858535','1966-09-18','1159773824','guaine86@gmail.com','calle 35 858','-'),(24,'prueba','chu','55666777','2000-11-23','155464748','guaine86@gmail.com','av san martin 1899','-'),(25,'pepito','mujica','66777888','2000-11-23','1159773824','guaine86@gmail.com','alguno 1232','-'),(26,'shinu','mcfly','36678362','2000-11-23','35357541','guaine86@gmail.com','av san martin 1860','-'),(27,'charly','mcfly','56789013','2000-11-23','35357541','guaine86@gmail.com','av san martin 1860','-'),(28,'shinu','mcfly system','77678362','2000-11-23','35357541','wayne86.cruz@gmail.com','av san martin 1860','-'),(29,'bruno valentino anselmo','cruz gonzalez','54897957','2007-12-18','1159773824','guaine86@gmail.com','av san martin 1860','-'),(30,'eduardo','quattrone','19678362','1986-03-05','1159773824','informatica2.jea@gmail.com','av san martin 1860','-');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrera`
--

DROP TABLE IF EXISTS `carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrera` (
  `idcarrera` int NOT NULL AUTO_INCREMENT,
  `nomenclatura` varchar(65) NOT NULL,
  `baja` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idcarrera`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrera`
--

LOCK TABLES `carrera` WRITE;
/*!40000 ALTER TABLE `carrera` DISABLE KEYS */;
INSERT INTO `carrera` VALUES (5,'tecnicatura universitaria en programacion',0),(6,'tecnicatura universitaria en tecnologia de los alimentos',0),(7,'tecnicatura universitaria en diseño industrial',0),(8,'licenciatura en obstetricia',0);
/*!40000 ALTER TABLE `carrera` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_alumnos`
--

LOCK TABLES `log_alumnos` WRITE;
/*!40000 ALTER TABLE `log_alumnos` DISABLE KEYS */;
INSERT INTO `log_alumnos` VALUES (188,'Solicitud de alta','2024-12-15','root@localhost','alumnos','tp_laboratorio4'),(189,'Alta confirmada - ID: 19','2024-12-15','root@localhost','alumnos','tp_laboratorio4'),(190,'Solicitud de alta','2024-12-16','root@localhost','alumnos','tp_laboratorio4'),(191,'Alta confirmada - ID: 20','2024-12-16','root@localhost','alumnos','tp_laboratorio4'),(192,'Solicitud de alta','2024-12-16','root@localhost','alumnos','tp_laboratorio4'),(193,'Alta confirmada - ID: 21','2024-12-16','root@localhost','alumnos','tp_laboratorio4'),(194,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(195,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(196,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(197,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(198,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(199,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(200,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(201,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(202,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(203,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(204,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(205,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(206,'Cambio solicitado - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(207,'Datos modificados con exito - ID: 19','2024-12-17','root@localhost','alumnos','tp_laboratorio4'),(208,'Cambio solicitado - ID: 20','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(209,'Datos modificados con exito - ID: 20','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(210,'Cambio solicitado - ID: 20','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(211,'Datos modificados con exito - ID: 20','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(212,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(213,'Alta confirmada - ID: 22','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(215,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(216,'Alta confirmada - ID: 23','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(217,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(218,'Alta confirmada - ID: 24','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(219,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(220,'Alta confirmada - ID: 25','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(221,'Solicitud de alta','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(222,'Alta confirmada - ID: 26','2024-12-19','root@localhost','alumnos','tp_laboratorio4'),(223,'Solicitud de alta','2024-12-20','root@localhost','alumnos','tp_laboratorio4'),(224,'Alta confirmada - ID: 27','2024-12-20','root@localhost','alumnos','tp_laboratorio4'),(225,'Solicitud de alta','2024-12-21','root@localhost','alumnos','tp_laboratorio4'),(226,'Alta confirmada - ID: 28','2024-12-21','root@localhost','alumnos','tp_laboratorio4'),(227,'Solicitud de alta','2024-12-21','root@localhost','alumnos','tp_laboratorio4'),(228,'Alta confirmada - ID: 29','2024-12-21','root@localhost','alumnos','tp_laboratorio4'),(229,'Cambio solicitado - ID: 29','2024-12-21','root@localhost','alumnos','tp_laboratorio4'),(230,'Datos modificados con exito - ID: 29','2024-12-21','root@localhost','alumnos','tp_laboratorio4'),(231,'Cambio solicitado - ID: 19','2024-12-22','root@localhost','alumnos','tp_laboratorio4'),(232,'Datos modificados con exito - ID: 19','2024-12-22','root@localhost','alumnos','tp_laboratorio4'),(233,'Cambio solicitado - ID: 19','2024-12-26','root@localhost','alumnos','tp_laboratorio4'),(234,'Datos modificados con exito - ID: 19','2024-12-26','root@localhost','alumnos','tp_laboratorio4'),(235,'Cambio solicitado - ID: 19','2024-12-26','root@localhost','alumnos','tp_laboratorio4'),(236,'Datos modificados con exito - ID: 19','2024-12-26','root@localhost','alumnos','tp_laboratorio4'),(237,'Cambio solicitado - ID: 19','2024-12-26','root@localhost','alumnos','tp_laboratorio4'),(238,'Datos modificados con exito - ID: 19','2024-12-26','root@localhost','alumnos','tp_laboratorio4'),(239,'Solicitud de alta','2024-12-28','root@localhost','alumnos','tp_laboratorio4'),(240,'Alta confirmada - ID: 30','2024-12-28','root@localhost','alumnos','tp_laboratorio4');
/*!40000 ALTER TABLE `log_alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ofertas`
--

DROP TABLE IF EXISTS `ofertas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ofertas` (
  `idofertas` int NOT NULL AUTO_INCREMENT,
  `nombre_contacto` varchar(100) NOT NULL,
  `empresa` varchar(50) NOT NULL,
  `email` varchar(45) NOT NULL,
  `rubro` int NOT NULL,
  `tipo_puesto` varchar(45) NOT NULL,
  `descripcion` varchar(140) NOT NULL,
  `confirma` tinyint DEFAULT '0',
  `baja` tinyint DEFAULT '0',
  PRIMARY KEY (`idofertas`),
  KEY `fk_ofertas_1_idx` (`rubro`),
  CONSTRAINT `fk_ofertas_1` FOREIGN KEY (`rubro`) REFERENCES `rubro` (`idrubro`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ofertas`
--

LOCK TABLES `ofertas` WRITE;
/*!40000 ALTER TABLE `ofertas` DISABLE KEYS */;
INSERT INTO `ofertas` VALUES (1,'edward wayne cruz','wayne inc','wayne86.cruz@gmail.com',1,'Jornada Completa','queremos alguien que programe todo el dia',1,0),(2,'brunito valentino','kakaroto sa','wayne86@gmail.com',3,'pasantia','estamos buscando enfermera para formar',1,0),(3,'brunito mcfly','kakaroto system','wayne86.cruz@gmail.com',3,'jornada completa','buscamos alguien para realizar diseños personalizados',1,0),(4,'roberto gomez bolanos','el chavo system','informatica3.jea@gmail.com',3,'medio tiempo','el puesto es para diseñar tazas para los clientes',1,0),(5,'gandalf mcfly','gandalf city','ewcruz@yahoo.com.ar',4,'pasantia','enfermera vudu',1,0),(6,'gandalf mcfly','gandalf software','ewcruz@yahoo.com.ar',1,'jornada completa','queremos hacer aplicaciones para smart tv',1,0);
/*!40000 ALTER TABLE `ofertas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idrol` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(45) NOT NULL,
  `baja` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idrol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'admin',0),(2,'data-entry',0),(3,'empleador',0),(4,'postulante',0);
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_autorizados`
--

DROP TABLE IF EXISTS `roles_autorizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_autorizados` (
  `AUTH_idusuarios_autorizados` int NOT NULL,
  `ROL_idrol` int NOT NULL,
  `confirma` tinyint NOT NULL DEFAULT '0',
  `baja` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`AUTH_idusuarios_autorizados`,`ROL_idrol`),
  KEY `fk_roles_autorizados_2_idx` (`ROL_idrol`),
  CONSTRAINT `fk_roles_autorizados_1` FOREIGN KEY (`AUTH_idusuarios_autorizados`) REFERENCES `usuarios_autorizados` (`idusuarios_autorizados`),
  CONSTRAINT `fk_roles_autorizados_2` FOREIGN KEY (`ROL_idrol`) REFERENCES `rol` (`idrol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_autorizados`
--

LOCK TABLES `roles_autorizados` WRITE;
/*!40000 ALTER TABLE `roles_autorizados` DISABLE KEYS */;
INSERT INTO `roles_autorizados` VALUES (1,1,1,0),(1,4,1,0),(2,2,1,0),(3,2,1,0),(10,1,1,0),(10,2,1,0),(10,3,1,0),(99,2,1,0),(99,3,1,0),(99,4,1,0);
/*!40000 ALTER TABLE `roles_autorizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubro`
--

DROP TABLE IF EXISTS `rubro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubro` (
  `idrubro` int NOT NULL AUTO_INCREMENT,
  `rubro` varchar(65) NOT NULL,
  `baja` tinyint DEFAULT '0',
  PRIMARY KEY (`idrubro`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro`
--

LOCK TABLES `rubro` WRITE;
/*!40000 ALTER TABLE `rubro` DISABLE KEYS */;
INSERT INTO `rubro` VALUES (1,'programacion/IT',0),(2,'industria alimenticia',0),(3,'diseño industrial',0),(4,'medicina',0);
/*!40000 ALTER TABLE `rubro` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `usuario_postula_oferta` VALUES (1,12,'2025-01-04 16:18:10',1),(1,13,'2025-01-09 11:04:15',0),(2,12,'2025-01-06 16:22:31',0),(2,13,'2025-01-09 11:09:21',0),(3,12,'2025-01-06 22:11:04',0),(4,13,'2025-01-09 11:04:48',0),(5,12,'2025-01-09 15:05:55',0),(5,13,'2025-01-09 15:08:22',0),(6,12,'2025-01-18 14:57:14',0);
/*!40000 ALTER TABLE `usuario_postula_oferta` ENABLE KEYS */;
UNLOCK TABLES;

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
  `baja_rol` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idusuarios`),
  KEY `fk_usuarios_1_idx` (`AUTH_idusuarios_autorizados`),
  KEY `fk_usuarios_2_idx` (`ROL_idrol`),
  CONSTRAINT `fk_usuarios_1` FOREIGN KEY (`AUTH_idusuarios_autorizados`) REFERENCES `usuarios_autorizados` (`idusuarios_autorizados`),
  CONSTRAINT `fk_usuarios_2` FOREIGN KEY (`ROL_idrol`) REFERENCES `rol` (`idrol`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'guaine86','edward wayne cruz','guaine86@gmail.com','$2a$08$YddmzPllfpKpg40Cq6SBlOvtIa3WYj2lAXoPv8Mf3X7P5vkgpTkCW',1,1,1,0),(6,'nicole24','priscila nicole bello','nicolepriscila192@gmail.com','$2a$08$lJzi2wiSLT2e4yeHyaMCueef1AI9w99oVLPypaHWU9IrSKtA6J/Fu',1,2,2,0),(8,'brunito1812','bruno valentino cruz gonzalez','ewcruz@yahoo.com.ar','$2a$08$/GslNskGp7Y94RshoHIqXuK/zApLuJVhNtuJ0NQWlDB1yl5y45A7m',1,3,2,0),(10,'gandalf','gandalf mcfly','ewcruz@yahoo.com.ar','$2a$08$mJ8ZeD9Di6pCUWBGqBuTEeaKULm2vqZWab1Wvt59kpmLhlf9vIWJO',1,10,1,0),(12,'wayne','edward wayne cruz','wayne86.cruz@gmail.com','$2a$08$YddmzPllfpKpg40Cq6SBlOvtIa3WYj2lAXoPv8Mf3X7P5vkgpTkCW',1,1,4,0),(13,'edualum','eduardo quattrone cruz','informatica2.jea@gmail.com','$2a$08$cCKZFjnv6AEh8FjMdpCwT.qw29ooc47RJ77T/ZOaiKSOVznsxVU/W',1,99,4,0),(14,'eduemplea','eduardo quattrone cruz','informatica3.jea@gmail.com','$2a$08$D0g.MMIF6z3b92VxQtR7fuCsX3b2VUSBOfKjog92S32C91NrzsdR6',1,99,3,0),(15,'edudata','eduardo guaine quattone cruz','informatica1.jea@gmail.com','$2a$08$YaNvEVSElzF9VkvfG5pV3OAFoJfq15.YJERvUhyqZ1EksfQV1AbG2',1,99,2,0),(16,'gandalfdata','gandalf mcfly','ewcruz@yahoo.com.ar','$2a$08$mJ8ZeD9Di6pCUWBGqBuTEeaKULm2vqZWab1Wvt59kpmLhlf9vIWJO',1,10,2,0),(17,'gandalfemplea','gandalf mcfly','ewcruz@yahoo.com.ar','$2a$08$GeCGllp0eCLi6hNlTIkyWOS7/gJN2UYEqBP.K.TjD8w0bVle1koJe',1,10,3,0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_autorizados`
--

DROP TABLE IF EXISTS `usuarios_autorizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_autorizados` (
  `idusuarios_autorizados` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(10) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL DEFAULT 'falta_registrar',
  `baja` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idusuarios_autorizados`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_autorizados`
--

LOCK TABLES `usuarios_autorizados` WRITE;
/*!40000 ALTER TABLE `usuarios_autorizados` DISABLE KEYS */;
INSERT INTO `usuarios_autorizados` VALUES (1,'92783036','edward wayne cruz',0),(2,'42838785','priscila nicole bello',0),(3,'54957897','bruno valentino cruz gonzalez',0),(10,'77678362','gandalf mcfly',0),(99,'19678362','eduardo guaine quattone cruz',0);
/*!40000 ALTER TABLE `usuarios_autorizados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-17 13:12:49
