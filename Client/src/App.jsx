import GamePage from "./pages/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from 'socket.io-client';
import {useEffect, useState} from "react"

const socket = io('http://localhost:3000', {autoConnect: false});

//move lobbies to game page eventually
const lobbies = {
  "1": {
    gameID: "1",
    playerID: 11,
    opponentID: 12,
    board: new GameBoardUtils(),
    yourTurn: true
  }
}

export default function App(){

  useEffect(()=>{
    if(clientID){
      socket.connect()
      socket.emit("user connected", {id: playerID})

      socket.on("recieve play", ({play})=>{
        lobbies[play.lobbyID].board.setTile(play.x, play.y, play.z, play.val)
      })
    }
  }, [clientID])
  
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GamePage/>}/>
        </Routes>
      </Router>
    </>
  )
}
