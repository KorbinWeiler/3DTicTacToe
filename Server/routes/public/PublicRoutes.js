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

})