import React, { createContext, useEffect, useState } from 'react'
import { GetCabinet } from '../service/Cabinet'


export const CABINETDATA = createContext([])
function CabinetDatam({ children }) {
    const [cabinetmehsul, setcabinetmehsul] = useState([])

    useEffect(() => {
        GetCabinet().then(res =>setcabinetmehsul(res))
      
 
    },[])

    return (
        <CABINETDATA.Provider value={{cabinetmehsul }}>
            {children}
        </CABINETDATA.Provider>
    )
}

export default CabinetDatam