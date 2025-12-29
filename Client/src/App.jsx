import './App.css';
import LoginPage from './pages/LoginPage.jsx';
import {BrowserRouter as Router, Routes, Route, redirect} from 'react-router-dom'
import {useState, createContext, useEffect} from 'react'
import ProtectedRoute from './Components/ProtectedRoute'; //ProtectedRoutes are used to protect routes that require authentication
import RestrictedRoute from './Components/RestrictedRoute'; //RestrictedRoutes are used to restrict access based on certain conditions
import HomePage from './Pages/HomePage';
import RegistrationPage from './Pages/RegistrationPage';
import ProfilePage from './Pages/ProfilePage';
import InvitePage from './Pages/InvitePage';
import FriendsPage from './Pages/FriendsPage';
import GamesPage from './Pages/GamesPage';
import PlayGamePage from './Pages/PlayGamePage';
import { UserContext } from './Utils/UserContext';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

function App() {
  sessionStorage.setItem('user', JSON.stringify({name: 'PlayerOne', rank: 5, points: 1200, gameID: '1' }));
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  let user = JSON.parse(sessionStorage.getItem('user'));
  console.log("User: ", user);
  //console.log("Token: ", token);


  useEffect(() => {
    //const storedToken = sessionStorage.getItem('token');
    if (sessionStorage.getItem('token') != token) {
      console.log("Token Value: " + token)
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', JSON.stringify(user));

      socket.connect();
    }

    if (socket.connected) {
      return () => {
        socket.disconnect();
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
