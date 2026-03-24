import { Routes, Route } from 'react-router-dom'
import Start from './Pages/Start.jsx'
import Userlogin from './Pages/User/Userlogin.jsx'
import Usersignup from './Pages/User/Usersignup.jsx'
import Captainlogin from './Pages/Captain/Captainlogin.jsx'
import Captainsignup from './Pages/Captain/Captainsignup.jsx'
import Home from './Pages/User/Home.jsx'
import Userprotectedwrapper from './Pages/User/Userprotectedwrapper.jsx'
import Userlogout from './Pages/User/Userlogout.jsx'
import CaptainprotectedWrapper from './Pages/Captain/CaptainprotectedWrapper.jsx'
import Captainhome from './Pages/Captain/Captainhome.jsx'
import Captainlogout from './Pages/Captain/Captainlogout.jsx'
import Riding from './Pages/User/Riding.jsx'
import Captainriding from './Pages/Captain/Captainriding.jsx'



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
        <Route path='/captain-riding' element={<CaptainprotectedWrapper><Captainriding /></CaptainprotectedWrapper>} />
      </Routes>
    </div>
  )
}

export default App