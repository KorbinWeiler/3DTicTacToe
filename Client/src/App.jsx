import './App.css'
import LoginPage from './Pages/LoginPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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

export const UserContext = createContext();

function App() {
  sessionStorage.setItem('user', JSON.stringify({name: 'PlayerOne', rank: 5, points: 1200, gameID: '1' }));
  //const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [token, setToken] = ("jafijajfoiajf")
  let user = JSON.parse(sessionStorage.getItem('user'));
  console.log("User: ", user);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken != token) {
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', user);
    }
  }, [token]);

  return (
    <>
    <UserContext.Provider value={{Token: [token, setToken], User: user}}>
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
