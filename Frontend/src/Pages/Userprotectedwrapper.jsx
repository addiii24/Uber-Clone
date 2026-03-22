import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const Userprotectedwrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

    }, [token])

    return <>{children}</>
}

export default Userprotectedwrapper