import GameUI from "./components/GameUI"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GameUI/>}/>
        </Routes>
      </Router>
    </>
  )
}
