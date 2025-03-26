import React from 'react'
import { Routes } from 'react-router'
import Landing from './pages/Landing/Landing'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ToDoList from './pages/ToDo/ToDoList'

function App() {
  return (
    <Routes>
  
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/to-do-list" element={<ToDoList />} />


    </Routes>
  )
  
}

export default App