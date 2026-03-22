import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] bg-cover bg-center h-screen w-full bg-red-400 flex justify-between flex-col'>
            <img className = 'w-24 pt-8 pl-9' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo-500x175.png" alt="Uber-logo" />
            <div className='bg-white px-4 py-4 pb-7 '>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center bg-black text-white w-full py-3 rounded-full mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home