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
   const [mobile, setMobile] = useState("")

   const [otp, setOtp] = useState("")
   const [otpSent, setOtpSent] = useState(false)
   const [otpVerified, setOtpVerified] = useState(false)
   const [otpMessage, setOtpMessage] = useState({ text: '', type: '' })


   const navigate = useNavigate();

   const {user,setUser} = useContext(UserDataContext)

   const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      mobile: mobile,
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
        setMobile('')
        navigate('/home')
      }
    } catch (error) {
      console.error('Signup error:', JSON.stringify(error.response?.data, null, 2) || error.message)
    }
   }

   const handleSendOtp = async () => {
       try {
           await axios.post(`${import.meta.env.VITE_BASE_URL}/users/send-otp`, { email });
           setOtpSent(true);
           setOtpMessage({ text: 'OTP sent to your email!', type: 'success' });
       } catch(err) {
           setOtpMessage({ text: err.response?.data?.message || "Failed to send OTP", type: 'error' });
       }
   };

   const handleVerifyOtp = async () => {
       try {
           await axios.post(`${import.meta.env.VITE_BASE_URL}/users/verify-otp`, { email, otp: otp.trim() });
           setOtpVerified(true);
           setOtpMessage({ text: '', type: '' });
       } catch(err) {
           setOtpMessage({ text: err.response?.data?.message || "Invalid OTP. Please try again.", type: 'error' });
       }
   };

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

           <h3 className='text-base font-medium mb-2'>What's our user mobile?</h3>
          <input
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
            type="tel"
            placeholder='1234567890'
          />

          <h3 className='text-base font-medium mb-2'>What's your email?</h3>
          <input 
            required 
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            disabled={otpSent}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black disabled:bg-gray-300'
            type="email" 
            placeholder='email@example.com' 
          />

          {!otpSent ? (
              <button 
                type="button" 
                onClick={handleSendOtp}
                disabled={!email}
                className='bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 w-full mb-2 disabled:bg-gray-400'>
                Send OTP
              </button>
            ) : !otpVerified ? (
              <>
                <h3 className='text-base font-medium mb-2'>Enter OTP</h3>
                <div className='flex gap-2 mb-2'>
                  <input 
                    required 
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    className='bg-[#eeeeee] flex-1 rounded-lg px-4 py-2 border text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
                    type="text" 
                    placeholder='6-digit OTP' 
                    maxLength={6}
                  />
                  <button 
                    type="button" 
                    onClick={handleVerifyOtp}
                    className='bg-green-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-green-700'>
                    Verify
                  </button>
                </div>
              </>
            ) : null}

          {otpMessage.text && (
            <p className={`text-sm font-medium mb-4 ${otpMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {otpMessage.type === 'success' ? '✅ ' : '❌ '}{otpMessage.text}
            </p>
          )}
          {otpVerified && (
            <div className='text-green-600 font-medium mb-4 flex items-center gap-2'>
              ✅ Email Verified Successfully
            </div>
          )}
          
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
            disabled={!otpVerified}
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg disabled:bg-gray-400'>
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