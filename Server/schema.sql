-- Azure SQL Database (SQL Server) schema for 3D Tic-Tac-Toe.
-- index.js runs the equivalent guarded CREATE TABLE batch on boot, so this file
-- is mainly for reference / manual provisioning, e.g. via sqlcmd or the Azure
-- portal query editor.
--
-- Bracket-quoted identifiers keep the PascalCase names the client expects.

IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
CREATE TABLE dbo.Users (
    [Username]     NVARCHAR(100)  NOT NULL PRIMARY KEY,
    [PasswordHash] NVARCHAR(MAX)  NOT NULL,
    [Email]        NVARCHAR(255)
);

IF OBJECT_ID(N'dbo.Games', N'U') IS NULL
CREATE TABLE dbo.Games (
    [GameID]      INT IDENTITY(1,1) PRIMARY KEY,
    [PlayerX]     NVARCHAR(100) NOT NULL,
    [PlayerO]     NVARCHAR(100) NOT NULL,
    [BoardState]  NVARCHAR(MAX) NOT NULL,   -- JSON.stringify'd 4x4x4 array
    [CurrentTurn] NVARCHAR(100),
    [Winner]      NVARCHAR(100)
);

IF OBJECT_ID(N'dbo.Invites', N'U') IS NULL
CREATE TABLE dbo.Invites (
    [InviteID]  INT IDENTITY(1,1) PRIMARY KEY,
    [FromUser]  NVARCHAR(100) NOT NULL,
    [ToUser]    NVARCHAR(100) NOT NULL,
    [DateSent]  NVARCHAR(50)  NOT NULL,     -- ISO-8601 string from new Date().toISOString()
    [Status]    NVARCHAR(20)  NOT NULL CONSTRAINT DF_Invites_Status DEFAULT 'pending'
);
