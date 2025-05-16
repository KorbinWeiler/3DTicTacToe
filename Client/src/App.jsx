import { useState, useEffect } from 'react'
import { createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'
import GameBoardUtils from './Utils/GameBoardUtils'

export const UpdateContext = createContext(null)
let test = new GameBoardUtils();

function App() {
  const [count, setCount] = useState(0)
  const [update, forceUpdate] = useState("")

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
      let win = false;
      console.log("Current Space " + x,y,z)
      win = win || test.checkWin('X',0, 0, z, 1, 1, 0); //down to the right same z
      win = win || test.checkWin('X',0, 0, z, 1, 1, 1); //down to the right all z

      win = win || test.checkWin('X',3, 0, z , -1, 1, 0); //down to the left same z
      win = win || test.checkWin('X',3, 0, z , -1, 1, 1); //down to the left all z

      test.checkWin(0, 3, z);
      test.checkWin(3, 3, z);

      win = win || test.checkWin('X',x, 0, z, 0, 1, 0);
      win = win || test.checkWin('X',x, 0, z, 0, 1, 1);

      win = win || test.checkWin('X',0, y, z, 1, 0, 0);
      win = win || test.checkWin('X',0, y, z, 1, 0, 1);

      win = win || test.checkWin('X',x, y, 0, 0, 0, 1);

      setWinner(win);
      console.log(win)
    }

  }

  useEffect(()=>{
    if(test == undefined){
      console.log("Bad Boi")
    }
    console.log()
    winCheckRunner()
  }, [update])

  return (
    <>
      <UpdateContext.Provider value={{updates: [update, forceUpdate]}}>
        {winner ? <h1>Winnner</h1> : <GameBoard BackendGameBoard={test.boards}/>}
      </UpdateContext.Provider>
    </>
  )
}

export default App
