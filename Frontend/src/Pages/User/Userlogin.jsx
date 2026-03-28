import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserDataContext } from '../../Context/Usercontext'
import axios from 'axios';

const Userlogin = () => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState("")

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault()

    const userData = {
      email: email,
      password: password
    }

    setAuthError("")
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        setemail('')
        setpassword('')
        navigate('/home')
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid email or password. Please try again."
      setAuthError(msg)
    }



  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between max-w-md mx-auto'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        <form onSubmit={(e) => {
          submithandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className='bg-[#eeeeee] mb-2 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
            type={showPassword ? "text" : "password"}
            placeholder='password'
          />

          <div className='flex items-center gap-2 mb-7'>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className='w-4 h-4 cursor-pointer'
            />
            <label htmlFor="showPassword" size='text-sm text-gray-600 cursor-pointer'>Show Password</label>
          </div>

          {authError && (
            <div className='flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm font-medium animate-[fadeIn_0.2s_ease]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 text-red-500">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {authError}
            </div>
          )}

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>
            Login
          </button>

          <p className='text-center mt-2'>
            New here? <Link to='/signup' className='text-blue-600 font-medium'>Create new Account</Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg'>
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default Userlogin