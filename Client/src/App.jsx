import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'
import GameBoardUtils from './Utils/GameBoardUtils'

function App() {
  const [count, setCount] = useState(0)
  const test = new GameBoardUtils();

  return (
    <>
      <GameBoard BackendGameBoard={test.boards}/>
    </>
  )
}

export default App
