import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Userlogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'}/users/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        }).catch((error) => {
            console.error('Logout error:', error.response?.data || error.message)
            localStorage.removeItem('token')
            navigate('/login')
        })
    }, [])

    return <div className='h-screen flex items-center justify-center'>Logging out...</div>
}

export default Userlogout