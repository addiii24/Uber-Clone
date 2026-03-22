import React from 'react'

const userdatacontext =  createContext()

const [user, setuser] = useState({
    email : '',
    fullname : {
        firstname : '',
        lastname : ''
    }
})

const Usercontext = ({children} , value = {[user,setuser]}) => {
  return (
    <div>
        <userdatacontext>
            {children}
        </userdatacontext>
    </div>
  )
}

export default Usercontext