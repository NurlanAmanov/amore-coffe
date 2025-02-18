import React, { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";

export const LIKESDATA = createContext(null);

function LikeContext({ children }) {
  const cook = new Cookies();

  // **Cookie-dən sevimliləri götür, əgər boşdursa `[]` qoy**
  const [likedItems, setLikedItems] = useState([]);

  // **Səhifə yüklənəndə cookiedən `likedItems` oxu**
  useEffect(() => {
    const storedLikes = cook.get("likes");
    if (storedLikes && Array.isArray(storedLikes)) {
      setLikedItems(storedLikes);
    }
  }, []);

  // **Məhsulu Sevimlilərə əlavə et və ya çıxar**
  function toggleLike(product) {
    setLikedItems((prevLikes) => {
      let updatedLikes;

      // **Əgər məhsul artıq varsa, onu çıxar**
      const existingProductIndex = prevLikes.findIndex((item) => item.id === product.id);
      if (existingProductIndex !== -1) {
        updatedLikes = prevLikes.filter((item) => item.id !== product.id); // ❌ Məhsulu sil
      } else {
        updatedLikes = [...prevLikes, product]; // ✅ Yeni məhsulu əlavə et
      }

      // **Yenilənmiş sevimliləri cookiedə saxla**
      cook.set("likes", updatedLikes, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });

      return updatedLikes;
    });
  }

  // **Məhsulu sevimlilərdən çıxarma funksiyası**
  function likeRemove(id) {
    setLikedItems((prevLikes) => {
      const updatedLikes = prevLikes.filter((item) => item.id !== id);
      cook.set("likes", updatedLikes, { path: "/" });
      return updatedLikes;
    });
  }

  console.log("Cari sevimlilər:", likedItems); // ✅ Konsolda sevimlilərin içini yoxla

  return (
    <LIKESDATA.Provider value={{ likedItems, toggleLike, likeRemove }}>
      {children}
    </LIKESDATA.Provider>
  );
}

export default LikeContext;
