import TempGamePage from "./pages/TempGamePage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import InvitePage from "./pages/InvitePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from 'socket.io-client';
import {useEffect, useState, createContext, useRef} from "react"
import GameBoardUtils from "./Utils/GameBoardUtils";
import ChatLoginPage from "./pages/ChatLoginPage";

const socket = io('http://localhost:3000', {autoConnect: false});

export const gameContext = new createContext(null);

export const inviteContext = new createContext(null);

const games = {
  "1": {
    gameID: "1",
    player1ID: 11,
    player2ID: 12,
    board: new GameBoardUtils(),
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
  const [invites, setInvites] = useState([])

  useEffect(()=>{
    if(clientID){
      console.log("hello " + clientID)
      //userID = clientID;
      sessionStorage.setItem("userID", clientID)
      socket.auth = {clientID}
      socket.connect()

      // socket.emit("test")

      socket.on("recieve play", ({play})=>{
        lobbies[play.lobbyID].board.setTile(play.x, play.y, play.z, play.val) //find a way to make this update the screen
      })

      socket.on("game invite", (senderID)=>{
        setInvites(prev=>([...prev, senderID]))
      })

      //add socket end point to add game to the games list
      socket.on("add game", (gameID, player1, player2)=>{
        console.log(gameID + " " + player1 + " " + player2)
        games[gameID] = {
          gameID: gameID,
          player1ID: player1,
          player2ID: player2,
          board: new GameBoardUtils(),
          yourTurn: clientID === player1,
          winner: null
        }

        console.log(games)
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

    const user = sessionStorage.getItem("userID")
    if(user != null && clientID != user){
      setClientID(user)
    }
  }, [clientID])
  
  return(
    <>
    <inviteContext.Provider value={{InviteList: [invites, setInvites]}}>
    <gameContext.Provider value={{Lobbies: games, ClientID: [clientID, setClientID], Socket: socket}}>
      <Router>
        <Routes>
          <Route path="/" element={<TempGamePage/>}/>
          <Route path="/test" element={<GamePage/>}/>
          <Route path="/Login" element={<ChatLoginPage/>}/>
          <Route path="/Invites" element={<InvitePage invites={invites}/>}/>
        </Routes>
      </Router>
      </gameContext.Provider>
      </inviteContext.Provider>
    </>
  )
}
