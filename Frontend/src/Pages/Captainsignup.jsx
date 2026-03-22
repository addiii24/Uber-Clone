import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainsignup = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    
    const [vehicleColor, setVehicleColor] = useState("")
    const [vehiclePlate, setVehiclePlate] = useState("")
    const [vehicleCapacity, setVehicleCapacity] = useState("")
    const [vehicleType, setVehicleType] = useState("")
    
    const [captainData, setCaptainData] = useState({})
 
    const submitHandler = (e) => {
     e.preventDefault()
     setCaptainData({
       fullname: {
         firstname: firstName,
         lastname: lastName
       },
       email : email,
       password : password,
       vehicle: {
         color: vehicleColor,
         plate: vehiclePlate,
         capacity: vehicleCapacity,
         vehicletype: vehicleType
       }
     })
     console.log(captainData)
     setemail('')
     setFirstName('')
     setLastName('')
     setpassword('')
     setVehicleColor('')
     setVehiclePlate('')
     setVehicleCapacity('')
     setVehicleType('')
    }
    
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

          <h3 className='text-base font-medium mb-2'>What's our Captain's email?</h3>
          <input 
            required 
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
            type="email" 
            placeholder='email@example.com' 
          />
          
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input 
            required
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
            type="password" 
            placeholder='password' 
          />
          
          <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-6'>
            <input 
              required 
              value={vehicleColor}
              onChange={(e)=>setVehicleColor(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
              type="text" 
              placeholder='Vehicle Color' 
            />
            <input 
              required
              value={vehiclePlate}
              onChange={(e)=>setVehiclePlate(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
              type="text" 
              placeholder='Vehicle Plate' 
            />
          </div>
          <div className='flex gap-4 mb-6'>
            <input 
              required 
              value={vehicleCapacity}
              onChange={(e)=>setVehicleCapacity(e.target.value)}
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black'
              type="number" 
              placeholder='Vehicle Capacity' 
            />
            <select
              required
              value={vehicleType}
              onChange={(e)=>setVehicleType(e.target.value)}
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
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'>
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