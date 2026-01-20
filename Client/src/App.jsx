import './App.css';
import LoginPage from './pages/LoginPage.jsx';
import {BrowserRouter as Router, Routes, Route, redirect, data} from 'react-router-dom'
import {useState, createContext, useEffect} from 'react'
import ProtectedRoute from './Components/ProtectedRoute'; //ProtectedRoutes are used to protect routes that require authentication
import RestrictedRoute from './Components/RestrictedRoute'; //RestrictedRoutes are used to restrict access based on certain conditions
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage.jsx';
import ProfilePage from './Pages/ProfilePage';
import InvitePage from './pages/InvitePage';
import FriendsPage from './Pages/FriendsPage';
import GamesPage from './Pages/GamesPage';
import PlayGamePage from './Pages/PlayGamePage';
import { UserContext } from './Utils/UserContext';
import { io } from "socket.io-client";
import { useRef } from 'react';

const SocketIP = import.meta.env.VITE_SERVER_IP + ":" + import.meta.env.VITE_SOCKET_PORT;

function App() {
  const [notifty, setNotify] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  let user = JSON.parse(sessionStorage.getItem('user'));

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if(!token && socket){
      if(socket.connected){
        socket.disconnect();
        setSocket(null);
      }
      return;
    }


    if (!socket && token) {
      const s = io(SocketIP, {
        auth: {
          token: token,
          clientID: user.name,
        },
        autoConnect: false,
        reconnection: false,
      });

      s.on("update", (updateType) => {
        console.log("Received update: " + updateType);
        // Trigger a refresh in components that depend on this data
        setNotify(prev => !prev);
      });

      s.connect();  
      setSocket(s); 
    }

    return () => {
      if(socket){
        socket.disconnect();
        setSocket(null);
      }
    }  
  }, [token]);

  return (
    <>
    <UserContext.Provider value={{Token: [token, setToken], User: user, Socket: socket, Refresh: [notifty, setNotify]}}>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegistrationPage/>}/>
          <Route path="/Profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/Invite" element={<ProtectedRoute><InvitePage /></ProtectedRoute>} />
          <Route path="/Friends" element={<ProtectedRoute><FriendsPage /></ProtectedRoute>} />
          <Route path="/Games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
          <Route path="/Game/:gameID" element={<ProtectedRoute><PlayGamePage /></ProtectedRoute>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </UserContext.Provider>
    </>
  )
}

export default App
