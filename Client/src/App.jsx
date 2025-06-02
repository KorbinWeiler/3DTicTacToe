import GamePage from "./pages/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from 'socket.io-client';
import { createContext, useContext } from "react";

const socket = io('http://localhost:3000');

export const UserContext = createContext(null)

export default function App(){
  return(
    <>
    <UserContext.Provider value={{Socket: socket}}>
      <Router>
        <Routes>
          
          <Route path="/" element={<GamePage/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
    </>
  )
}
