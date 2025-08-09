import './App.css'
import LoginPage from './Pages/LoginPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useState, createContext, useEffect} from 'react'
import ProtectedRoute from './Components/ProtectedRoute';
import HomePage from './Pages/HomePage';
import RegistrationPage from './Pages/RegistrationPage';

export const UserContext = createContext();

function App() {

  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken != token) {
      sessionStorage.setItem('token', token)
    }
  }, [token]);

  return (
    <>
    <UserContext.Provider value={{Token: [token, setToken]}}>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegistrationPage/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
    </>
  )
}

export default App
