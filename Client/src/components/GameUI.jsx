import { useState, useEffect } from 'react'
import { createContext } from 'react'
import '../App.css'
import GameBoard from './GameBoard'
import GameBoardUtils from '../Utils/GameBoardUtils'

export const UpdateContext = createContext(null)
let test = new GameBoardUtils();

function GameUI({lobbyInfo}) {
    
  const [update, forceUpdate] = useState("")

  const [lobbyID, setLobbyID] = useState("1")

  //http://localhost:5173/?id=111

  // BEGINNING
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Store client ID when connected
    socket.on('connect', ({userID}) => { //change this to only connect if there is a user id or maybe into app.jsx/gamepage.jsx
    });

    // Listen for incoming messages
    socket.on('receiveMessage', ({ from, text }) => {
      setMessages((prev) => [...prev, `${from}: ${text}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const sendMessage = () => {
  //   if (update) {
  //     socket.emit("sendPlay", {play, opponentID})
  //     forceUpdate('');
  //   }
  // };

  //END

  const [winner, setWinner] = useState(false)

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
      const lobby = update.substring(4)
      let win = false;

      win = win || lobbies[lobby].board.checkWin(playerVlaue,0, 0, 0, 1, 1, 0); //down to the right same z
      win = win || lobbies[lobby].board.checkWin(playerVlaue,0, 0, 0, 1, 1, 1); //down to the right all z

      win = win || lobbies[lobby].board.checkWin(playerVlaue,3, 0, z , -1, 1, 0); //down to the left same z
      win = win || lobbies[lobby].board.checkWin(playerVlaue,3, 0, 0 , -1, 1, 1); //down to the left all z

      win = win || lobbies[lobby].board.checkWin(playerVlaue,x, 0, 0, 0, 1, 1);
      win = win || lobbies[lobby].board.checkWin(playerVlaue,x, 0, z, 0, 1, 0);
      win = win || lobbies[lobby].board.checkWin(playerVlaue,x, 0, z, 0, 1, 0);

      win = win || lobbies[lobby].board.checkWin(playerVlaue,0, y, z, 1, 0, 0);
      win = win || lobbies[lobby].board.checkWin(playerVlaue,0, y, z, 1, 0, 1);
      win = win || lobbies[lobby].board.checkWin(playerVlaue,0, y, 0, 1, 0, 1);

      win = win || lobbies[lobby].board.checkWin(playerVlaue,x, y, 0, 0, 0, 1);

      setWinner(win);
      console.log(win)
      return win;
    }
  }

  useEffect(()=>{
    if(lobbies[lobbyID].yourTurn && update){
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

      //socket.to(lobbies[lobbyID].opponentID).emit(play)
      socket.emit("sendPlay", {play, opponentID})
    }
  }, [update])

  //move the winner check into the board so that it can change from game to game
  return (
    <>
      <p>{lobbyInfo.playerID ?  lobbyInfo.playerID : "no Player ID"}</p>
      <p>{lobbyInfo.opponentID ? lobbyInfo.opponentID : "No Opponent"}</p>
      <UpdateContext.Provider value={{updates: [update, forceUpdate]}}>
        {winner ? <h1>Winnner</h1> : <GameBoard BackendGameBoard={lobbyInfo.board}/>}
      </UpdateContext.Provider>
    </>
  )
}

export default GameUI