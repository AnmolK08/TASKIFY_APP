import React from 'react'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  return (
    <>
    <Routes>
      {/* <Route path="/" element={<Landing />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/to-do-list" element={<ToDoList />} /> */}
    </Routes>
    </>
  )
}

export default App