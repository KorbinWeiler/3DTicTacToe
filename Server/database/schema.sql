-- PostgreSQL schema for 3DTicTacToe

-- Users table
CREATE TABLE IF NOT EXISTS Users (
    Username VARCHAR(255) PRIMARY KEY,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Games table
CREATE TABLE IF NOT EXISTS Games (
    GameID VARCHAR(255) PRIMARY KEY,
    PlayerX VARCHAR(255) NOT NULL,
    PlayerO VARCHAR(255) NOT NULL,
    BoardState TEXT NOT NULL,
    CurrentTurn VARCHAR(255),
    Winner VARCHAR(255),
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_games_playerx ON Games(PlayerX);
CREATE INDEX IF NOT EXISTS idx_games_playero ON Games(PlayerO);

-- Invites table
CREATE TABLE IF NOT EXISTS Invites (
    ID SERIAL PRIMARY KEY,
    FromUser VARCHAR(255) NOT NULL,
    ToUser VARCHAR(255) NOT NULL,
    DateSent TIMESTAMP WITH TIME ZONE NOT NULL,
    Status VARCHAR(50) NOT NULL,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invites_touser ON Invites(ToUser);
