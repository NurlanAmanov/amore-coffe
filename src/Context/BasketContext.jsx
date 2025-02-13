import React, { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";

export const BASKET = createContext(null);

function BasketContext({ children }) {
  const cook = new Cookies();

  // **Cookie-dən səbəti götür, əgər boşdursa `[]` qoy**
  const [sebet, setSebet] = useState(() => {
    const storedSebet = cook.get("sebet");
    return storedSebet ? storedSebet : [];
  });

  // **Məhsul səbətə əlavə edildikdə cookiedə saxla**
  function bassketadd(title, about, id, imgUrl, desciption, price,discount,finalPrice) {
    const newSebet = [...sebet, { title, about, id, imgUrl, desciption, price, }];

    setSebet(newSebet);
    

    cook.set("sebet", newSebet, {
      path: "/",
      expires: new Date(Date.now() + 86400 * 1000), 
    });


  }

  
  useEffect(() => {
 
  }, []);

  return (
    <BASKET.Provider value={{ sebet, bassketadd }}>
      {children}
    </BASKET.Provider>
  );
}

export default BasketContext;
