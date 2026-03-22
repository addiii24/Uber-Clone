import {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../Context/Captaincontext.jsx'


const Captainprotectedwrapper = ({ children }) => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const {captain ,setCaptain} = useContext(CaptainDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
            return
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                const data = response.data
                setCaptain(data.captain)
                setIsLoading(false)
            }
        }).catch((error) => {
            console.error('Profile error:', error.response?.data || error.message)
            localStorage.removeItem('captain-token')
            navigate('/captain-login')
        })
    }, [token])

    if(isLoading){
        return <div>Loading...</div>
    }
    return <>{children}</>
}

export default Captainprotectedwrapper