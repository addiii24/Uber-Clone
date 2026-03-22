import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const Userprotectedwrapper = ({ children }) => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()
    const {isLoading, setIsLoading} = useState(true)
    const {setCaptain} = useContext(CaptainDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
            return
        }
    }, [token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile `, {
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
        console.error('Logout error:', error.response?.data || error.message)
        localStorage.removeItem('token')
        navigate('/captain-login')
    })

    if(isLoading){
        return <div>Loading...</div>
    }
    return <>{children}</>
}

export default Userprotectedwrapper