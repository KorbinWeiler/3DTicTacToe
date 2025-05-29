import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { io } from 'socket.io-client';
import './App.css'
import GameBoard from './components/GameBoard'
import GameBoardUtils from './Utils/GameBoardUtils'

const socket = io('http://localhost:3000');

export const UpdateContext = createContext(null)
let test = new GameBoardUtils();

const lobbies = {
  "1": {
    opponentID: null,
    board: new GameBoardUtils(),
    yourTurn: true
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [update, forceUpdate] = useState("")

  const [lobbyID, setLobbyID] = useState("1")

  // BEGINNING
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    // Store client ID when connected
    socket.on('connect', () => {
      setClientId(socket.id);
    });

    // Listen for incoming messages
    socket.on('receiveMessage', ({ from, text }) => {
      setMessages((prev) => [...prev, `${from}: ${text}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, [lobbyID]);

  const sendMessage = () => {
    if (update) {
      socket.to(opponentID).emit(play)
      //socket.emit('sendMessage', { room, message: input });
      forceUpdate('');
    }
  };
  //END

  const [winner, setWinner] = useState(false)

  async function postPlay(winState){
    const res = await fetch("SomeServerEnpoint", {
      method: "POST",
      body: JSON.stringify({
        x: update[0],
        y: update[1],
        z: update[2],
        val: update[3],
        lobbyID: update.substring(4),
        isWin: winState
      })
    })
}
  
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
      let win = false;

      win = win || test.checkWin(playerVlaue,0, 0, 0, 1, 1, 0); //down to the right same z
      win = win || test.checkWin(playerVlaue,0, 0, 0, 1, 1, 1); //down to the right all z

      win = win || test.checkWin(playerVlaue,3, 0, z , -1, 1, 0); //down to the left same z
      win = win || test.checkWin(playerVlaue,3, 0, 0 , -1, 1, 1); //down to the left all z

      win = win || test.checkWin(playerVlaue,x, 0, 0, 0, 1, 1);
      win = win || test.checkWin(playerVlaue,x, 0, z, 0, 1, 0);
      win = win || test.checkWin(playerVlaue,x, 0, z, 0, 1, 0);

      win = win || test.checkWin(playerVlaue,0, y, z, 1, 0, 0);
      win = win || test.checkWin(playerVlaue,0, y, z, 1, 0, 1);
      win = win || test.checkWin(playerVlaue,0, y, 0, 1, 0, 1);

      win = win || test.checkWin(playerVlaue,x, y, 0, 0, 0, 1);

      setWinner(win);
      console.log(win)
      return win;
    }
  }

  useEffect(()=>{
    if(lobbies[lobbyID].yourTurn && update){
      const win = winCheckRunner()
      lobbies[lobbyID].yourTurn = false;

      const play = {
        x: update[0],
        y: update[1],
        z: update[2],
        val: update[3],
        lobbyID: update.substring(4),
        isWin: win
      }

      socket.to(lobbies[lobbyID].opponentID).emit(play)
      forceUpdate('')
      //postPlay(win)
    }
  }, [update])

  //move the winner check into the board so that it can change from game to game
  return (
    <>
      <UpdateContext.Provider value={{updates: [update, forceUpdate]}}>
        {winner ? <h1>Winnner</h1> : <GameBoard BackendGameBoard={lobbies[lobbyID].board}/>}
      </UpdateContext.Provider>
    </>
  )
}

export default App
