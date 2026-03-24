import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import {UserDataContext} from '../../Context/Usercontext.jsx'

const Usersignup = () => {
   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")
   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")


   const navigate = useNavigate();

   const {user,setUser} = useContext(UserDataContext)

   const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email : email,
      password : password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if(response.status === 201){
        const data = response.data
        setUser(data.user)
        setemail('')
        setFirstName('')
        setLastName('')
        setpassword('')
        navigate('/home')
      }
    } catch (error) {
      console.error('Signup error:', JSON.stringify(error.response?.data, null, 2) || error.message)
    }
   }

  return (
    <div className='p-7 h-screen flex flex-col justify-between max-w-md mx-auto'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-base font-medium mb-2'>What's your name?</h3>
          <div className='flex gap-4 mb-6'>
            <input 
              required 
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
              type="text" 
              placeholder='First name' 
            />
            <input 
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
              type="text" 
              placeholder='Last name' 
            />
          </div>

          <h3 className='text-base font-medium mb-2'>What's your email?</h3>
          <input 
            required 
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
            type="email" 
            placeholder='email@example.com' 
          />
          
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input 
            required
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
            type="password" 
            placeholder='password' 
          />
          
          <button 
            type='submit' 
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'>
            Create account
          </button>
          
          <p className='text-center mt-2'>
            Already have a account? <Link to='/login' className='text-blue-600 font-medium'>Login here</Link>
          </p>
        </form>
      </div>

      <div>
        <p className='text-[10px] leading-tight text-gray-400'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default Usersignup