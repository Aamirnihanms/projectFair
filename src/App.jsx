import { useContext, useState } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Auth from './pages/Auth'
import Projoects from './pages/Projoects'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { TokenAuthContext } from './context/AuthContext'

function App() {

     const {isAuthorised,setIsAuthorised} = useContext(TokenAuthContext)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth insideRegister={true} />} />
      <Route path="/projects" element={isAuthorised?<Projoects />:<Navigate to={'/login'}/>} />
      <Route path="/dashboard" element={isAuthorised?<Dashboard />:<Navigate to={'/login'}/> } />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
