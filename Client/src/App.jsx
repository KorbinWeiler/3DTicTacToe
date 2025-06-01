import GamePage from "./pages/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App(){
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
