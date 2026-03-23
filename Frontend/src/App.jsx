import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './Pages/Start.jsx'
import Userlogin from './Pages/Userlogin.jsx'
import Usersignup from './Pages/Usersignup.jsx'
import Captainlogin from './Pages/Captainlogin.jsx'
import Captainsignup from './Pages/Captainsignup.jsx'
import Home from './Pages/Home.jsx'
import Userprotectedwrapper from './Pages/Userprotectedwrapper.jsx'
import Userlogout from './Pages/Userlogout.jsx'
import CaptainprotectedWrapper from './Pages/CaptainprotectedWrapper.jsx'
import Captainhome from './Pages/Captainhome.jsx'
import Captainlogout from './Pages/Captainlogout.jsx'
import Riding from './Pages/Riding.jsx'




const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<Userlogin />} />
        <Route path='/signup' element={<Usersignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<Captainsignup />} />
        <Route path='/captain-home' element={<CaptainprotectedWrapper><Captainhome /></CaptainprotectedWrapper>} />
        <Route path='/captain-logout' element={<CaptainprotectedWrapper><Captainlogout /></CaptainprotectedWrapper>} />
        <Route path='/home' element={<Userprotectedwrapper><Home /></Userprotectedwrapper>} />
        <Route path='/logout' element={<Userprotectedwrapper><Userlogout /></Userprotectedwrapper>} />
        <Route path='/riding' element={<Userprotectedwrapper><Riding /></Userprotectedwrapper>} />
      </Routes>
    </div>
  )
}

export default App