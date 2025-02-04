import React, { createContext, useEffect, useState } from 'react'
import { Getbanner, GetData, GetData2 } from '../service/api'

export const DATA = createContext([])
function Datacontext({ children }) {
    const [data, setData] = useState([])
    const [mehsul, setMehsul] = useState([])
    const [banner, setbanner] = useState([])
    useEffect(() => {
        GetData().then(res =>setData(res))
        GetData2().then(res =>setMehsul(res))
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