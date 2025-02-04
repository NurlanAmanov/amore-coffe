import React, { createContext, useEffect, useState } from 'react'
import { Getbanner, GetDAta, GetDAta2 } from '../service/api'

export const DATA = createContext([])
function Datacontext({ children }) {
    const [data, setData] = useState([])
    const [mehsul, setMehsul] = useState([])
    const [banner, setbanner] = useState([])
    useEffect(() => {
        GetDAta().then(res =>setData(res))
        GetDAta2().then(res =>setMehsul(res))
        Getbanner().then(res =>console.log(res)
        )
    },[])

    return (
        <DATA.Provider value={{ data,mehsul }}>
            {children}
        </DATA.Provider>
    )
}

export default Datacontext