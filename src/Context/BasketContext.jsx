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

  // **Məhsul səbətə əlavə ediləndə cookiedə saxla**
  function bassketadd(title, about, id, imgUrl, description, price, discount, finalPrice, count) {
    setSebet((prevSebet) => {
      let newSebet = [...prevSebet];

      // Məhsul varsa, sayını artır
      const existingProductIndex = newSebet.findIndex((item) => item.id === id);
      if (existingProductIndex !== -1) {
        newSebet[existingProductIndex] = {
          ...newSebet[existingProductIndex],
          count: newSebet[existingProductIndex].count + count, // ✅ Say artır
        };
      } else {
        // Yeni məhsulu əlavə et
        newSebet.push({ title, about, id, imgUrl, description, price, discount, finalPrice, count });
      }

      // **Yenilənmiş səbəti cookiedə saxla**
      cook.set("sebet", newSebet, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });

      return newSebet;
    });
  }

  return (
    <BASKET.Provider value={{ sebet, bassketadd }}>
      {children}
    </BASKET.Provider>
  );
}

export default BasketContext;
