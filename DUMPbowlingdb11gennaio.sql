-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: bowlingdb
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `atleta`
--

DROP TABLE IF EXISTS `atleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atleta` (
  `ID_atleta` int NOT NULL,
  `Nome` varchar(45) DEFAULT NULL,
  `Cognome` varchar(45) DEFAULT NULL,
  `Data_nascita` date DEFAULT NULL,
  `Stile_gioco` varchar(45) DEFAULT NULL,
  `Braccio_dominante` char(2) DEFAULT NULL,
  `Sesso` char(1) DEFAULT NULL,
  `ID_utente` int NOT NULL,
  `Deleted` char(1) DEFAULT NULL,
  PRIMARY KEY (`ID_atleta`),
  KEY `ID_utente_idx` (`ID_utente`),
  CONSTRAINT `ID_utente` FOREIGN KEY (`ID_utente`) REFERENCES `utente` (`ID_utente`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atleta`
--

LOCK TABLES `atleta` WRITE;
/*!40000 ALTER TABLE `atleta` DISABLE KEYS */;
INSERT INTO `atleta` VALUES (1,'Alex','Pennini','2003-10-10','Bimane','Dx','M',1,'N'),(2,'Ryan','Barnes','2002-05-20','Bimane','Dx','M',2,'N'),(3,'Patrick','Hanrahan','1995-04-25','Bimane','Sx','M',3,'N'),(4,'Malia','Briggs','2008-06-17','Tradizionale','Dx','F',4,'N'),(5,'Eddie Dean','Tacket Jr','1992-08-07','Tradizionale','Dx','M',5,'N'),(6,'Jesper','Svensson','1995-02-15','Bimane','Sx','M',6,'N'),(7,'Jason','Belmonte','1983-07-29','Bimane','Dx','M',7,'N'),(8,'Daria','Pajak','1993-01-11','Tradizionale','Dx','F',8,'N'),(9,'Keven','Williams','1993-12-01','Bimane','Sx','M',9,'N'),(10,'Kristopher','Prather','1992-01-01','Tradizionale','Dx','M',10,'N');
/*!40000 ALTER TABLE `atleta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counter`
--

DROP TABLE IF EXISTS `counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counter` (
  `tableName` varchar(50) NOT NULL,
  `lastId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`tableName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counter`
--

LOCK TABLES `counter` WRITE;
/*!40000 ALTER TABLE `counter` DISABLE KEYS */;
INSERT INTO `counter` VALUES ('atleta',10),('palla',20),('torneo',2),('utente',10);
/*!40000 ALTER TABLE `counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palla`
--

DROP TABLE IF EXISTS `palla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `palla` (
  `ID_palla` int NOT NULL,
  `ID_atleta` int NOT NULL,
  `Marca_palla` varchar(45) DEFAULT NULL,
  `Nome_palla` varchar(45) DEFAULT NULL,
  `Nucleo` varchar(45) DEFAULT NULL,
  `Peso` int DEFAULT NULL,
  `RG` decimal(3,2) DEFAULT NULL,
  `Differenziale` decimal(4,3) DEFAULT NULL,
  `PSA` decimal(4,3) DEFAULT NULL,
  `Deleted` char(1) DEFAULT NULL,
  PRIMARY KEY (`ID_palla`),
  KEY `ID_atleta_idx` (`ID_atleta`),
  CONSTRAINT `ID_atleta` FOREIGN KEY (`ID_atleta`) REFERENCES `atleta` (`ID_atleta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palla`
--

LOCK TABLES `palla` WRITE;
/*!40000 ALTER TABLE `palla` DISABLE KEYS */;
INSERT INTO `palla` VALUES (1,1,'Roto Grip','Nuclear Cell','Asimmetrico',13,2.57,0.032,0.010,'N'),(2,1,'Storm','Typhoon','Simmetrico',13,2.58,0.047,NULL,'N'),(3,1,'Storm','Phaze II','Simmetrico',13,2.59,0.045,NULL,'N'),(4,1,'Storm','Phaze II Pearl','Simmetrico',13,2.59,0.045,NULL,'N'),(5,1,'900 Global','Origin EX','Asimmetrico',13,2.56,0.034,0.011,'N'),(6,1,'Storm','!Q Tour A.I.','Simmetrico',13,2.58,0.047,NULL,'N'),(7,1,'Roto Grip','Rockstar','Simmetrico',13,2.58,0.047,NULL,'N'),(8,1,'Roto Grip','RST Hyperdrive Pearl','Asimmetrico',13,2.56,0.034,0.011,'N'),(9,1,'Roto Grip','Rockstar Amped','Simmetrico',13,2.58,0.047,NULL,'N'),(10,1,'Storm','!Q Tour 78/U','Simmetrico',13,2.59,0.045,NULL,'N'),(11,2,'Storm','Equinox Solid','Asimmetrico',15,2.48,0.054,0.018,'N'),(12,2,'Storm','Next Factor','Asimmetrico',15,2.56,0.051,0.017,'N'),(13,2,'Storm','Ion Max','Asimmetrico',15,2.47,0.055,0.014,'N'),(14,2,'Storm','!Q Tour 78/U','Simmetrico',15,2.49,0.029,NULL,'N'),(15,2,'Storm','Phaze II Pearl','Simmetrico',15,2.48,0.051,NULL,'N'),(16,2,'Roto Grip','Rockstar Amped','Simmetrico',15,2.48,0.050,NULL,'N'),(17,2,'900 Global','Viking','Asimmetrico',15,2.51,0.052,0.016,'N'),(18,2,'Hammer','Purple Pearl Urethane','Simmetrico',15,2.65,0.015,NULL,'N'),(19,2,'Hammer','Black Widow 3.0','Asimmetrico',15,2.50,0.058,0.016,'N'),(20,2,'Storm','Hy-Road 40','Simmetrico',15,2.57,0.046,NULL,'N');
/*!40000 ALTER TABLE `palla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partecipa`
--

DROP TABLE IF EXISTS `partecipa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partecipa` (
  `ID_atleta_partecipa` int NOT NULL,
  `ID_torneo_partecipa` int NOT NULL,
  PRIMARY KEY (`ID_atleta_partecipa`,`ID_torneo_partecipa`),
  KEY `ID_torneo_partecipa_idx` (`ID_torneo_partecipa`),
  CONSTRAINT `ID_atleta_partecipa` FOREIGN KEY (`ID_atleta_partecipa`) REFERENCES `atleta` (`ID_atleta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ID_torneo_partecipa` FOREIGN KEY (`ID_torneo_partecipa`) REFERENCES `torneo` (`ID_torneo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partecipa`
--

LOCK TABLES `partecipa` WRITE;
/*!40000 ALTER TABLE `partecipa` DISABLE KEYS */;
INSERT INTO `partecipa` VALUES (2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1);
/*!40000 ALTER TABLE `partecipa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partita`
--

DROP TABLE IF EXISTS `partita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partita` (
  `ID_partita` int NOT NULL,
  `ID_atleta_gioca` int NOT NULL,
  `ID_torneo_gioca` int NOT NULL,
  `Punteggio` int DEFAULT NULL,
  PRIMARY KEY (`ID_partita`,`ID_atleta_gioca`,`ID_torneo_gioca`),
  KEY `ID_atleta_gioca_idx` (`ID_atleta_gioca`),
  KEY `ID_torneo_gioca_idx` (`ID_torneo_gioca`),
  CONSTRAINT `ID_atleta_gioca` FOREIGN KEY (`ID_atleta_gioca`) REFERENCES `atleta` (`ID_atleta`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ID_torneo_gioca` FOREIGN KEY (`ID_torneo_gioca`) REFERENCES `torneo` (`ID_torneo`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partita`
--

LOCK TABLES `partita` WRITE;
/*!40000 ALTER TABLE `partita` DISABLE KEYS */;
INSERT INTO `partita` VALUES (1,2,1,230),(1,3,1,200),(1,5,1,214),(1,6,1,246),(1,7,1,235),(2,2,1,255),(2,3,1,234),(2,5,1,235),(2,6,1,234),(2,7,1,215),(3,2,1,190),(3,3,1,218),(3,5,1,261),(3,6,1,213),(3,7,1,241),(4,2,1,202),(4,3,1,170),(4,5,1,169),(4,6,1,255),(4,7,1,199),(5,2,1,230),(5,3,1,190),(5,5,1,198),(5,6,1,198),(5,7,1,239),(6,2,1,245),(6,3,1,256),(6,5,1,231),(6,6,1,197),(6,7,1,300),(7,2,1,223),(7,3,1,235),(7,5,1,220),(7,6,1,219),(7,7,1,237),(8,2,1,269),(8,3,1,267),(8,5,1,215),(8,6,1,249),(8,7,1,222);
/*!40000 ALTER TABLE `partita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `torneo`
--

DROP TABLE IF EXISTS `torneo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `torneo` (
  `ID_torneo` int NOT NULL,
  `Nome_torneo` varchar(45) DEFAULT NULL,
  ` Categoria` varchar(45) DEFAULT NULL,
  `Data_inizio` date DEFAULT NULL,
  `Data_fine` date DEFAULT NULL,
  `Numero_partite` int DEFAULT NULL,
  `Montepremi` decimal(10,2) DEFAULT NULL,
  `Deleted` char(1) DEFAULT NULL,
  PRIMARY KEY (`ID_torneo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `torneo`
--

LOCK TABLES `torneo` WRITE;
/*!40000 ALTER TABLE `torneo` DISABLE KEYS */;
INSERT INTO `torneo` VALUES (1,'2025 U.S. Open','Professionista','2025-01-27','2025-02-02',8,350000.00,'N'),(2,'PBA Players Championship','Professionista','2025-04-12','2025-04-13',6,200000.00,'N');
/*!40000 ALTER TABLE `torneo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utente` (
  `ID_utente` int NOT NULL,
  `Username` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Permessi` varchar(45) DEFAULT NULL,
  `Deleted` char(1) DEFAULT NULL,
  PRIMARY KEY (`ID_utente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES (0,'guest','guest','guest','N'),(1,'PeNNa','123prova','atleta','N'),(2,'Barnzy','123456','atleta','N'),(3,'Packy','TheHouseBowling','atleta','N'),(4,'Malia','LeagueVlog','atleta','N'),(5,'EJ','PBAChampion','atleta','N'),(6,'Jesp','SwedenGOAT','atleta','N'),(7,'Belmo','TwoHandedKing','atleta','N'),(8,'Daria','123456789','atleta','N'),(9,'KW','GutterBoy','atleta','N'),(10,'Khris','BalancedBowler','atleta','N'),(1001,'admin1','admin1001','admin','N'),(1002,'admin2','admin1002','admin','N'),(1003,'admin3','admin1003','admin','N');
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-11 20:17:55
