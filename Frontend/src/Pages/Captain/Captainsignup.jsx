import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useContext } from 'react'
import { CaptainDataContext } from '../../Context/Captaincontext.jsx'


const Captainsignup = () => {
  const [email, setemail] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setpassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const [vehicleColor, setVehicleColor] = useState("")
  const [vehiclePlate, setVehiclePlate] = useState("")
  const [vehicleCapacity, setVehicleCapacity] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpMessage, setOtpMessage] = useState({ text: '', type: '' }) // type: 'success' | 'error'

  const navigate = useNavigate();

  const {captain, setCaptain} = useContext(CaptainDataContext);


  const submitHandler = async (e) => {
    e.preventDefault()
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      mobile: mobile,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicletype: vehicleType
      }
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('captain-token', data.token)
        setemail('')
        setMobile('')
        setFirstName('')
        setLastName('')
        setpassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
        navigate('/captain-home')
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
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Driver Logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-base font-medium mb-2'>What's our Captain's name?</h3>
          <div className='flex gap-4 mb-6'>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
              type="text"
              placeholder='First name'
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base outline-none focus:ring-2 focus:ring-black'
              type="text"
              placeholder='Last name'
            />
          </div>

          <h3 className='text-base font-medium mb-2'>What's our Captain's email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            disabled={otpSent}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black disabled:bg-gray-300'
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

          <h3 className='text-base font-medium mb-2'>What's our Captain's mobile?</h3>
          <input
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
            type="tel"
            placeholder='1234567890'
          />

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
            type="password"
            placeholder='password'
          />

          <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-6'>
            <input
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
              type="text"
              placeholder='Vehicle Color'
            />
            <input
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
              type="text"
              placeholder='Vehicle Plate'
            />
          </div>
          <div className='flex gap-4 mb-6'>
            <input
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
              type="number"
              placeholder='Vehicle Capacity'
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Moto</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={!otpVerified}
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg disabled:bg-gray-400'>
            Create Captain Account
          </button>

          <p className='text-center mt-2'>
            Already have a account? <Link to='/captain-login' className='text-blue-600 font-medium'>Login here</Link>
          </p>
        </form>
      </div>

      <div>
        <p className='text-[10px] leading-tight mt-6 text-gray-400'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default Captainsignup