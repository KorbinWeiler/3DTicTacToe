const express = require('express');

const Private = express.Router();

Private.get('Profile', async (req, res)=>{ 
    try{
        const user = req.user; //Assuming user info is attached to req object after authentication middleware
        res.status(200).json({
            username: user.username,
            email: user.email,
            gamesPlayed: user.gamesPlayed
        });
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})