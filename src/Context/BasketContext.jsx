import React, { createContext, useState } from 'react'
import { Cookies } from 'react-cookie'

export const BASKET=createContext(null)
function BasketContext({ children }) {
    const cook =new Cookies()

    const [sebet,setSebet]=useState(cook.get('Sebet') || [])
    function bassketadd(title,about,imgUrl,desciption,price){
        const newSebet = [
            ...sebet,
            { title,about,imgUrl,desciption,price },
      ];setSebet(newSebet);
        cook.set("sebet",newSebet)
  
        
    }
  return (
    <BASKET.Provider value={{ sebet, bassketadd }}>
    {children}
  </BASKET.Provider>
  )
}

export default BasketContext