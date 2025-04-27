import React from 'react'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'


const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/task" element={<TaskPage />} /> */}
    </Routes>
    </>
  )
}

export default App