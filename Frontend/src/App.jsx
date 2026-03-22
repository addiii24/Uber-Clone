import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Userlogin from './Pages/Userlogin.jsx'
import Usersignup from './Pages/Usersignup.jsx'
import Captainlogin from './Pages/Captainlogin.jsx'
import Captainsignup from './Pages/Captainsignup.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Userlogin />} />
        <Route path='/signup' element={<Usersignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<Captainsignup />} />
      </Routes>
    </div>
  )
}

export default App