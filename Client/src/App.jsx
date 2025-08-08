import './App.css'
import LoginPage from './Pages/LoginPage'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
