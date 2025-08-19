import './App.css'
import LoginPage from './Pages/LoginPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useState, createContext, useEffect, use} from 'react'
import { io } from "socket.io-client";
import ProtectedRoute from './Components/ProtectedRoute'; //ProtectedRoutes are used to protect routes that require authentication
import RestrictedRoute from './Components/RestrictedRoute'; //RestrictedRoutes are used to restrict access based on certain conditions
import HomePage from './Pages/HomePage';
import RegistrationPage from './Pages/RegistrationPage';
import ProfilePage from './Pages/ProfilePage';
import InvitePage from './Pages/InvitePage';
import FriendsPage from './Pages/FriendsPage';
import GamesPage from './Pages/GamesPage';
import PlayGamePage from './Pages/PlayGamePage';

export const UserContext = createContext();

function App() {
  sessionStorage.setItem('user', JSON.stringify({name: 'PlayerOne', rank: 5, points: 1200, gameID: '1' }));
  //const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [token, setToken] = useState("jafijajfoiajf")
  const [updateFlag, setUpdateFlag] = useState(false); // This flag is used to force updates. It is a boolean to make for easy update triggers.
  let user = JSON.parse(sessionStorage.getItem('user'));
  console.log("User: ", user);

  const SERVER_URL = "http://localhost:4000";

  const socket = io(SERVER_URL, {
    autoConnect: true,
    transports: ["websocket"],
  });

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken != token) {
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', user);

      socket.on("Update", () => {
        setUpdateFlag(prev => !prev); // Toggle the update flag to force a re-render
      });

      // Cleanup on unmount
      return () => {
        socket.off("Update");
      };
    }
  }, [token]);

  return (
    <>
    <UserContext.Provider value={{Token: [token, setToken], UpdateFlag: [updateFlag, setUpdateFlag], User: user}}>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegistrationPage/>}/>
          <Route path="/Profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/Invite" element={<ProtectedRoute><InvitePage /></ProtectedRoute>} />
          <Route path="/Friends" element={<ProtectedRoute><FriendsPage /></ProtectedRoute>} />
          <Route path="/Games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
          <Route path="/Game/:gameID" element={<RestrictedRoute><PlayGamePage /></RestrictedRoute>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </UserContext.Provider>
    </>
  )
}

export default App
