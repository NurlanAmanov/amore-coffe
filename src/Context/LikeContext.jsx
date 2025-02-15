import React, { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";

export const LIKESDATA = createContext(null);

function LikeContext({ children }) {
  const cook = new Cookies();
  const [likedItems, setLikedItems] = useState([]);

  // **Component yüklənəndə cookie-dən sevimliləri götür**
  useEffect(() => {
    const storedLikes = cook.get("likes");
    if (storedLikes) {
      setLikedItems(storedLikes);
    }
  }, []);

  

  // **Məhsulu Sevimlilərə əlavə et və ya çıxar**
  function toggleLike(name, id, imgUrl, price, discount, oldPrice) {
    setLikedItems((prevLikes) => {
      let updatedLikes;

      // **Əgər məhsul artıq varsa, onu çıxar**
      const existingIndex = prevLikes.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        updatedLikes = prevLikes.filter((item) => item.id !== id); // ❌ Məhsulu sil
      } else {
        updatedLikes = [...prevLikes, { name, id, imgUrl, price, discount, oldPrice }]; // ✅ Yeni məhsulu əlavə et
      }

      // **Cookie-də yenilə**
      cook.set("likes", updatedLikes, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });

      return updatedLikes;
    });
  }

  return (
    <LIKESDATA.Provider value={{ likedItems, toggleLike }}>
      {children}
    </LIKESDATA.Provider>
  );
}

export default LikeContext;
