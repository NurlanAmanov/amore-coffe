import React, { createContext, useEffect, useState } from 'react'
import { Getbanner, GetData, GetProduct } from '../service/api'

export const DATA = createContext([])
function Datacontext({ children }) {
    const [data, setData] = useState([])
    const [mehsul, setMehsul] = useState([])
    const [banner, setbanner] = useState([])
    useEffect(() => {
        GetData().then(res =>setData(res))
        GetProduct().then(res =>setMehsul(res))
 
    },[])

    return (
        <DATA.Provider value={{ data,mehsul }}>
            {children}
        </DATA.Provider>
    )
}

export default Datacontext