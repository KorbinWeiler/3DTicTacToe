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
  let user = sessionStorage.getItem('user');

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
        </Routes>
      </Router>
    </UserContext.Provider>
    </>
  )
}

export default App
