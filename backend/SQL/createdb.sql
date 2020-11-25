Create Database LFT;
USE LFT;
CREATE TABLE `user`
(
 `userId`   int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `guid`     varchar(36) NULL,
 `level`    int NULL DEFAULT 1,
 `nextLevel` int NULL DEFAULT 100,
  `previousLevel` int NULL DEFAULT 0,
 `exp`      int NULL DEFAULT 0,
 `envActions` int NULL DEFAULT 0,
 `ecoActions` int NULL DEFAULT 0,
 `justActions` int NULL DEFAULT 0,
 `healthActions` int NULL DEFAULT 0,
 `totalActions` int NULL DEFAULT 0,


PRIMARY KEY (`userId`)
);

CREATE TABLE `level`
(
 `levelId`   int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `levelNumber` int NOT NULL,
 `expRequired` int NOT NULL,
 `levelTitle` varchar(200) NULL ,
PRIMARY KEY (`levelId`)
);

CREATE TABLE `actionType`
(
 `actionTypeId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `title`        varchar(200) NOT NULL ,
 `description`  mediumtext NOT NULL ,
 `icon`         mediumtext NULL ,

PRIMARY KEY (`actionTypeId`)
);

CREATE TABLE `cause`
(
 `causeId`     int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `title`       varchar(200) NOT NULL ,
 `description` mediumtext NOT NULL ,
 `icon`        mediumtext NULL ,

PRIMARY KEY (`causeId`)
);

CREATE TABLE `organization`
(
 `organizationId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `contact`        varchar(45) NOT NULL ,
 `title`          varchar(200) NOT NULL ,
 `description`    mediumtext NOT NULL ,
 `imageURL`       mediumtext NULL ,
  `url`          mediumtext NULL ,

PRIMARY KEY (`organizationId`)
);

CREATE TABLE `organizationCause`
(
 `organizationCauseId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `organizationId`      int NOT NULL ,
 `causeId`             int NULL ,
 `rank`                int NULL ,

PRIMARY KEY (`organizationCauseId`),
KEY `fkIdx_20` (`organizationId`),
CONSTRAINT `FK_20` FOREIGN KEY `fkIdx_20` (`organizationId`) REFERENCES `organization` (`organizationId`),
KEY `fkIdx_23` (`causeId`),
CONSTRAINT `FK_23` FOREIGN KEY `fkIdx_23` (`causeId`) REFERENCES `cause` (`causeId`)
);

CREATE TABLE `campaign`
(
 `campaignId`     int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `organizationId` int NOT NULL ,
 `title`          varchar(200) NOT NULL ,
 `description`    mediumtext NOT NULL ,
 `liveDT`         timestamp NULL ,
 `expireDT`       timestamp NULL ,
 `imageURL`       mediumtext NULL ,

PRIMARY KEY (`campaignId`),
KEY `fkIdx_56` (`organizationId`),
CONSTRAINT `FK_56` FOREIGN KEY `fkIdx_56` (`organizationId`) REFERENCES `organization` (`organizationId`)
);

CREATE TABLE `campaignCause`
(
 `campaignCauseId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `causeId`         int NOT NULL ,
 `rank`            int NULL ,
 `campaignId`      int NOT NULL ,

PRIMARY KEY (`campaignCauseId`)

);

CREATE TABLE `action`
(
 `actionId`     int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `actionTypeId` int NOT NULL ,
 `campaignId`   int NOT NULL ,
 `title`        varchar(200) NOT NULL ,
 `description`  mediumtext NOT NULL ,
 `reward`       int NOT NULL ,
 `imageURL`     mediumtext NULL ,
 `liveDT`       timestamp NULL ,
 `expireDT`     timestamp NULL ,
 `url`          mediumtext NULL ,

PRIMARY KEY (`actionId`),
KEY `fkIdx_42` (`actionTypeId`),
CONSTRAINT `FK_42` FOREIGN KEY `fkIdx_42` (`actionTypeId`) REFERENCES `actionType` (`actionTypeId`),
KEY `fkIdx_53` (`campaignId`),
CONSTRAINT `FK_53` FOREIGN KEY `fkIdx_53` (`campaignId`) REFERENCES `campaign` (`campaignId`)
);

CREATE TABLE `userAction`
(
 `userActionId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `userGuid`     varchar(45) NOT NULL ,
 `status`       varchar(45) NOT NULL ,
 `actionId`     int NOT NULL ,

PRIMARY KEY (`userActionId`),
KEY `fkIdx_107` (`actionId`),
CONSTRAINT `FK_107` FOREIGN KEY `fkIdx_107` (`actionId`) REFERENCES `action` (`actionId`)
);

CREATE TABLE `userActionType`
(
 `userActionTypeId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `userGuid`     varchar(45) NOT NULL ,
 `actionTypeId`     int NOT NULL ,
 `isActive`         bit NOT NULL ,

PRIMARY KEY (`userActionTypeId`),
KEY `fkIdx_39` (`actionTypeId`),
CONSTRAINT `FK_39` FOREIGN KEY `fkIdx_39` (`actionTypeId`) REFERENCES `actionType` (`actionTypeId`)
);

CREATE TABLE `userCause`
(
 `userCauseId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `userGuid`     varchar(45) NOT NULL ,
 `causeId`     int NOT NULL ,
 `rank`        int NOT NULL ,

PRIMARY KEY (`userCauseId`),
KEY `fkIdx_50` (`causeId`),
CONSTRAINT `FK_50` FOREIGN KEY `fkIdx_50` (`causeId`) REFERENCES `cause` (`causeId`)
);

CREATE TABLE `userDashboardActions`
(
 `userDashboardActionsId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `actionId`     int NOT NULL ,
 `userGuid`     varchar(45) NOT NULL ,
 `active`      bit  NULL ,
 `lastPresentedDT`     timestamp,
 `firstPresentedDT`     timestamp,

PRIMARY KEY (`userDashboardActionsId`)

);