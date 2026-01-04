import './App.css';
import LoginPage from './pages/LoginPage.jsx';
import {BrowserRouter as Router, Routes, Route, redirect, data} from 'react-router-dom'
import {useState, createContext, useEffect} from 'react'
import ProtectedRoute from './Components/ProtectedRoute'; //ProtectedRoutes are used to protect routes that require authentication
import RestrictedRoute from './Components/RestrictedRoute'; //RestrictedRoutes are used to restrict access based on certain conditions
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage.jsx';
import ProfilePage from './Pages/ProfilePage';
import InvitePage from './Pages/InvitePage';
import FriendsPage from './Pages/FriendsPage';
import GamesPage from './Pages/GamesPage';
import PlayGamePage from './Pages/PlayGamePage';
import { UserContext } from './Utils/UserContext';
import { io } from "socket.io-client";
import { useRef } from 'react';

const SocketIP = import.meta.env.VITE_SERVER_IP + ":" + import.meta.env.VITE_SOCKET_PORT;

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  let user = JSON.parse(sessionStorage.getItem('user'));
  console.log("User: ", user);
  console.log("token", token);

  const socket = useRef(null)

  useEffect(() => {
    if(!token && socket.current){
      if(socket.current.connected){
        socket.current.disconnect();
        socket.current = null;
      }
      return;
    }


    if (!socket.current && token) {
      socket.current = io(SocketIP, {
        auth: {
          token: token,
          clientID: user.name,
        },
        autoConnect: false,
        reconnection: false,
      });

      socket.current.connect();   
    }

    return () => {
      if(socket.current){
        socket.current.disconnect();
        socket.current = null;
      }
    }  
  }, [token]);


  return (
    <>
    <UserContext.Provider value={{Token: [token, setToken], User: user, Socket: socket}}>
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
