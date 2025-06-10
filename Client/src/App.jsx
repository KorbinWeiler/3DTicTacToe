import TempGamePage from "./pages/TempGamePage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import InvitePage from "./pages/InvitePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from 'socket.io-client';
import {useEffect, useState, createContext} from "react"
import GameBoardUtils from "./Utils/GameBoardUtils";

const socket = io('http://localhost:3000', {autoConnect: false});

export const gameContext = new createContext(null);

const games = {
  "1": {
    gameID: "1",
    player1ID: 11,
    player2ID: 12,
    board: null,
    yourTurn: true
  }
}

export default function App(){

  /*
  PlayerID x
  Socket Connection x
  (PlayerID and Socket connection will be sent down in a context)
  List of other sockets connected (maybe should be only stored in the lobbies)
  Lost of lobbies?
  */

  /*
  All socket methods (that will then be passed on in a context)
  */

  const[clientID, setClientID] = useState("")


  useEffect(()=>{
    if(clientID){
      console.log("hello " + clientID)
      socket.auth = {clientID}
      socket.connect()

      socket.on("recieve play", ({play})=>{
        lobbies[play.lobbyID].board.setTile(play.x, play.y, play.z, play.val) //find a way to make this update the screen
      })

      //add socket end point to add game to the games list
      socket.on("add game", (gameID, player1, player2)=>{
        games[gameID] = {
          gameID: gameID,
          player1ID: player1,
          player2ID: player2,
          board: new GameBoardUtils(),
          yourTurn: clientID === player1,
          winner: null
        }
      })

      //add endpoint to send an invite to someone
      //this should actually be a function with the endpoint on the server

      //add endpoint for recieving an invite
      socket.on("received invite", (inviteID)=>{

      })

      //add endpoint for a play that wins the game?
      socket.on("game won", ()=>{

      })

      socket.on("test message", ()=>{
        console.log("Success");
      })
    }
  }, [clientID])
  
  return(
    <>
    <gameContext.Provider value={{Lobbies: games, ClientID: [clientID, setClientID], Socket: socket}}>
      <Router>
        <Routes>
          <Route path="/" element={<TempGamePage/>}/>
          <Route path="/test" element={<GamePage/>}/>
          <Route path="/Login" element={<LoginPage/>}/>
          <Route path="/Invites" element={<InvitePage/>}/>
        </Routes>
      </Router>
      </gameContext.Provider>
    </>
  )
}
