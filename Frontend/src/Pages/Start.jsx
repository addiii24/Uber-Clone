import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] bg-cover bg-center h-screen w-full max-w-md mx-auto flex justify-between flex-col'>
            <img className='w-16 ml-8 mt-8' src="
        https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber-logo" />
            <div className='bg-white px-4 py-4 pb-7 '>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center bg-black text-white w-full py-3 rounded-full mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start