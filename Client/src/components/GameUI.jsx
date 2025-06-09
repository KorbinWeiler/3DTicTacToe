import { useState, useEffect, useContext } from 'react'
import { createContext } from 'react'
import '../App.css'
import GameBoard from './GameBoard'
import { gameContext } from '../App'
import GameBoardUtils from "../Utils/GameBoardUtils"

export const UpdateContext = createContext(null)

function GameUI({lobby}) {
  
  const [update, forceUpdate] = useState("") //keep this and send from the socket here?
  //const [lobbyID, setLobbyID] = useState("1") //remove and get from a context

  const {Socket, ClientID} = useContext(gameContext);
  const socket = Socket;
  const [clientID, setClientID] = ClientID

  //http://localhost:5173/?id=111

  const [winner, setWinner] = useState(false)

  // if(lobby.board){
  //   lobby.board = new GameBoardUtils()
  // }

  const opponentID = ""

  function winCheckRunner(){

    //Corners
    //x: 0, y: 0, z: z
    //x: 3, y: 0, z: z
    //x: 0, y: 3, z: z
    //x: 3, y: 3, z: z

    //Down, Left, and Right
    //x: x, y: 0, z: z
    //x: 0, y: y, z: z
    //x: x, y: y, z: 0

    if(update != ""){
      const x = Number(update[0]);
      const y = Number(update[1]);
      const z = Number(update[2]);
      const playerVlaue = update[3];
      const lobbyID = update.substring(4)
      let win = false;

      //Can I put this in a loop somehow to make it look nicer
      win = win || lobby.board.checkWin(playerVlaue,0, 0, 0, 1, 1, 0); //down to the right same z
      win = win || lobby.board.checkWin(playerVlaue,0, 0, 0, 1, 1, 1); //down to the right all z

      win = win || lobby.board.checkWin(playerVlaue,3, 0, z , -1, 1, 0); //down to the left same z
      win = win || lobby.board.checkWin(playerVlaue,3, 0, 0 , -1, 1, 1); //down to the left all z

      win = win || lobby.board.checkWin(playerVlaue,x, 0, 0, 0, 1, 1);
      win = win || lobby.board.checkWin(playerVlaue,x, 0, z, 0, 1, 0);
      win = win || lobby.board.checkWin(playerVlaue,x, 0, z, 0, 1, 0);

      win = win || lobby.board.checkWin(playerVlaue,0, y, z, 1, 0, 0);
      win = win || lobby.board.checkWin(playerVlaue,0, y, z, 1, 0, 1);
      win = win || lobby.board.checkWin(playerVlaue,0, y, 0, 1, 0, 1);

      win = win || lobby.board.checkWin(playerVlaue,x, y, 0, 0, 0, 1);

      setWinner(win);
      return win;
    }
  }

  useEffect(()=>{
    if(lobby.yourTurn && update){
      const win = winCheckRunner()
      //lobbies[lobbyID].yourTurn = false;
      const play = {
        x: update[0],
        y: update[1],
        z: update[2],
        val: update[3],
        lobbyID: update.substring(4),
        isWin: win
      }

      //socket.emit("sendPlay", opponentID, play)
      socket.emit("test message", play)
    }
  }, [update])

  //move the winner check into the board so that it can change from game to game
  return (
    <>
      <p>{clientID ?  clientID : "no Player ID"}</p>
      <p>{opponentID ? opponentID : "No Opponent"}</p>
      <UpdateContext.Provider value={{updates: [update, forceUpdate]}}>
        {winner ? <h1>Winnner</h1> : <GameBoard BackendGameBoard={new GameBoardUtils()}/>}
      </UpdateContext.Provider>
    </>
  )
}

export default GameUI