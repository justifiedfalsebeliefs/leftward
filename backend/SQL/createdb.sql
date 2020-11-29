Create Database LFT;
USE LFT;
CREATE TABLE `user`
(
 `userId`   int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `userGuid`     varchar(36) NULL,
 `levelNumber`    int NULL DEFAULT 1,
 `pointsEarnedTotal`      int NULL DEFAULT 0,
 `nextLevelPointsRequired` int NULL DEFAULT 100,
 `currentLevelPointsRequired` int NULL DEFAULT 0,
 `totalActionsCompletedCount` int NULL DEFAULT 0,
 `actionsByCause` JSON NULL,
PRIMARY KEY (`userId`)
);

CREATE TABLE `level`
(
 `levelId`   int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `levelNumber` int NOT NULL,
 `pointsRequired` int NOT NULL,
 `levelTitle` varchar(200) NULL ,
PRIMARY KEY (`levelId`)
);

CREATE TABLE `organization`
(
 `organizationId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `title`          varchar(200) NOT NULL ,
 `description`    mediumtext NOT NULL ,
 `url`          mediumtext NULL ,
PRIMARY KEY (`organizationId`)
);

CREATE TABLE `action`
(
 `actionId`     int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `organizationID` int NOT NULL ,
 `actionType`   mediumtext NOT NULL ,
 `cause`        varchar(45) NOT NULL ,
 `title`        varchar(200) NOT NULL ,
 `description`  mediumtext NOT NULL ,
 `reward`       int NOT NULL ,
 `liveDT`       timestamp NULL ,
 `expireDT`     timestamp NULL ,
 `url`          mediumtext NULL ,
PRIMARY KEY (`actionId`)
);

CREATE TABLE `userAction`
(
 `userActionId` int NOT NULL AUTO_INCREMENT ,
 `createDT`     timestamp DEFAULT CURRENT_TIMESTAMP,
 `updateDT`     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `userGuid`     varchar(45) NOT NULL ,
 `status`       varchar(45) NOT NULL ,
 `actionId`     int NOT NULL ,
 `reward`       int NULL ,
 `cause`        varchar(45) NOT NULL ,
PRIMARY KEY (`userActionId`)
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