import TempGamePage from "./pages/TempGamePage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import InvitePage from "./pages/InvitePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TempGamePage/>}/>
          <Route path="/test" element={<GamePage/>}/>
          <Route path="/Login" element={<LoginPage/>}/>
          <Route path="/Invites" element={<InvitePage/>}/>
        </Routes>
      </Router>
    </>
  )
}
