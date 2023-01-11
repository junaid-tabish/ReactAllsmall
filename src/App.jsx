import React from 'react'
import NavBar from './components/NavBar'
import { Routes,Route } from 'react-router-dom'
import Products from './components/Products'
import Login from './components/Login'
import Signup from './components/Signup'

export default function App() {
  return (
    <div>
    <NavBar/>
    <Routes>
      <Route path='/product' element={<Products/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
  )
}
