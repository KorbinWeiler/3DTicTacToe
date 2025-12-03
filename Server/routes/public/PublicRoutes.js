const express = require('express');

import { getLobbyNumber } from './PublicMethods';

const Public = express.Router();

Public.post('/Add-Game', async (req, res)=>{
    try{
        const {player1, player2} = req.body
        console.log("New Game Added")
        res.status(200).json({
            Lobby: 1,
            player1: player1,
            player2: player2
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})

Public.post('/Make-Play', async (req, res)=>{
    try{
        const {gameID, move} = req.body
        console.log(`Game ID: ${gameID}, Move made at position: ${move}`)
        res.status(200).json({
            message: "Move registered"
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})

Public.post('/login', async (req, res)=>{
    try{
        const {username, password} = req.body
        console.log(`User ${username} attempting to log in.`)

        // change this to check a database later

        if (username !== "testuser" || password !== "password123"){
            return res.status(401).json({
                error: "Invalid credentials"
            })
        }
        return res.status(200).json({
            token: "sample_token_12345"
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})

Public.post('register', async (req, res)=>{
    try{
        const {username, email, password} = req.body
        console.log(`Registering user: ${username}, Email: ${email}`)
        // change this to add to a database later
        return res.status(200).json({
            message: "User registered successfully"
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})