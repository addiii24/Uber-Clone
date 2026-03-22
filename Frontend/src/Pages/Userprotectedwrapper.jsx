import {useEffect,useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../Context/Usercontext.jsx'


const Userprotectedwrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user ,setUser} = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                const data = response.data
                setUser(data.user)
                setIsLoading(false)
            }
        }).catch((error) => {
            console.error('Profile error:', error.response?.data || error.message)
            localStorage.removeItem('token')
            navigate('/login')
        })

    }, [token])

     if(isLoading){
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default Userprotectedwrapper