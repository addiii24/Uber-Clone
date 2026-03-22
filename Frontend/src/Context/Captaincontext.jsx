import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const Captaincontext = ({ children }) => {
    const [captain, setCaptain] = useState({
        email : '',
        fullname : {
            firstname : '',
            lastname : ''
        },
        vehicle : {
            color : '',
            plate : '',
            capacity : '',
            vehicletype : ''
        }
    })

    return (
        <div>
            <CaptainDataContext.Provider value={{captain, setCaptain}}>
                {children}
            </CaptainDataContext.Provider>
        </div>
    )
}

export default Captaincontext