import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Captainlogin = () => {
   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")
   const [captaindata, setcaptaindata] = useState({})

   const submithandler = (e) => {
    e.preventDefault()
    setcaptaindata({email : email ,password : password})

    setemail('')
    setpassword('')
   }

  return (
    <div className='p-7 h-screen flex flex-col justify-between max-w-md mx-auto'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Driver Logo" />
        <form onSubmit={(e) => {
          submithandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input 
            required 
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
            type="email" 
            placeholder='email@example.com' 
          />
          
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
            required
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
            type="password" 
            placeholder='password' 
          />
          
          <button 
            type='submit' 
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>
            Login
          </button>
          
          <p className='text-center mt-2'>
            Join a fleet? <Link to='/captain-signup' className='text-blue-600 font-medium'>Register as a Captain</Link>
          </p>
        </form>
      </div>

      <div>
        <Link 
          to='/login' 
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg'>
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin