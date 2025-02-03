import React, { createContext, useEffect, useState } from 'react'
import { GetDAta } from '../service/api'

export const DATA = createContext([])
function Datacontext({ children }) {
    const [data, setData] = useState([])
    useEffect(() => {
        GetDAta().then(res =>setData(res))
    },[])

    return (
        <DATA.Provider value={{ data }}>
            {children}
        </DATA.Provider>
    )
}

export default Datacontext