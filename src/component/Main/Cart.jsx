import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASKET } from "../../Context/BasketContext";

function Cart({ opensebet, setOpensebet }) {
  const { sebet, removeFromBasket, updateQuantity } = useContext(BASKET);
  const [groupedBasket, setGroupedBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Səbəti qruplaşdır
  useEffect(() => {
    const newGroupedBasket = sebet.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id && i.selectedSize === item.selectedSize);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
      } else {
        acc.push({ 
          ...item, 
          quantity: item.quantity || 1 
        });
      }
      return acc;
    }, []);
    
    setGroupedBasket(newGroupedBasket);
    
    // Toplam qiyməti hesabla
    const newTotalPrice = newGroupedBasket.reduce((total, item) => {
      const effectivePrice = item.discount > 0 
        ? (isNaN(item.finalPrice) ? item.price : item.finalPrice) 
        : item.price;
      const effectiveQuantity = item.quantity || 1;
      return total + effectiveQuantity * effectivePrice;
    }, 0);
    
    setTotalPrice(newTotalPrice);
  }, [sebet]);

  // Məhsul sayını artır
  const incrementQuantity = (item) => {
    updateQuantity && updateQuantity(item.id, item.selectedSize, (item.quantity || 1) + 1);
  };

  // Məhsul sayını azalt
  const decrementQuantity = (item) => {
    if ((item.quantity || 1) > 1) {
      updateQuantity && updateQuantity(item.id, item.selectedSize, (item.quantity || 1) - 1);
    }
  };

  // Məhsulu səbətdən sil
  const handleRemoveItem = (item) => {
    removeFromBasket && removeFromBasket(item.id, item.selectedSize);
  };

  return (
    <section className="relative">
      <div className={`${opensebet ? "block" : "hidden"} sebet-container fixed z-50`}>
        <div 
          className="fixed inset-0 w-full h-full before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpensebet(false);
            }
          }}
        >
          <div className="w-full max-w-lg bg-white shadow-lg relative ml-auto h-screen">
            <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
              {/* Başlıq */}
              <div className="flex items-center gap-4 text-gray-800 border-b pb-4">
                <h3 className="text-2xl font-bold flex-1">Səbət</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500 transition-all"
                  onClick={() => setOpensebet(false)}
                  viewBox="0 0 320.591 320.591"
                >
                  <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                  <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
                </svg>
              </div>

              {/* Məhsullar */}
              {groupedBasket.length > 0 ? (
                groupedBasket.map((item, i) => (
                  <div key={i} className="space-y-4 mt-6 border-b pb-4">
                    <div className="grid grid-cols-3 items-start gap-4">
                      <div className="col-span-2 flex items-start gap-4">
                        <div className="w-24 h-24 bg-gray-100 p-2 rounded-md overflow-hidden">
                          <img
                            src={item.imgUrl || "/api/placeholder/100/100?text=Məhsul"}
                            className="w-full h-full object-contain"
                            alt={item.title}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
                          {item.selectedSize && (
                            <p className="text-xs font-semibold text-gray-500 mt-1">
                              Ölçü: {item.selectedSize}
                            </p>
                          )}
                          
                          {/* Say kontrolleri */}
                          <div className="flex items-center mt-2">
                            <button 
                              onClick={() => decrementQuantity(item)} 
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-l-md"
                            >
                              -
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center bg-gray-50 text-sm">
                              {item.quantity || 1}
                            </span>
                            <button 
                              onClick={() => incrementQuantity(item)} 
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-r-md"
                            >
                              +
                            </button>
                            
                            {/* Silmə düyməsi */}
                            <button 
                              onClick={() => handleRemoveItem(item)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end">
                        {item.discount > 0 && (
                          <span className="text-xs line-through text-gray-400">
                            {item.price.toFixed(2)} ₼
                          </span>
                        )}
                        <h4 className="text-base font-bold text-gray-800">
                          {(item.discount > 0 ? item.finalPrice : item.price).toFixed(2)} ₼
                        </h4>
                        <p className="text-xs text-gray-500">
                          ({((item.discount > 0 ? item.finalPrice : item.price) * (item.quantity || 1)).toFixed(2)} ₼)
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-center text-gray-500 mt-4 font-medium">Səbətiniz boşdur</p>
                  <button 
                    onClick={() => setOpensebet(false)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                  >
                    Alış-verişə davam et
                  </button>
                </div>
              )}
            </div>

            {/* Alt Panel */}
            <div className="p-6 absolute bottom-0 w-full border-t bg-white">
              <ul className="text-gray-800 divide-y space-y-2">
                <li className="flex flex-wrap gap-4 text-base">
                  <span>Məhsullar:</span>
                  <span className="ml-auto">{groupedBasket.reduce((acc, item) => acc + (item.quantity || 1), 0)} ədəd</span>
                </li>
                <li className="flex flex-wrap gap-4 text-lg font-bold pt-2">
                  Toplam: <span className="ml-auto">{totalPrice.toFixed(2)} ₼</span>
                </li>
              </ul>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={() => setOpensebet(false)}
                  className="text-sm font-semibold px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md tracking-wide transition-all"
                >
                  Alış-verişə davam et
                </button>
                
                <Link 
                  to="/Check" 
                  onClick={() => setOpensebet(false)}
                  className={`text-center text-sm font-semibold px-4 py-3 ${
                    groupedBasket.length === 0 
                    ? "bg-blue-300 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700"
                  } text-white rounded-md tracking-wide transition-all`}
                  {...(groupedBasket.length === 0 ? { onClick: (e) => e.preventDefault() } : {})}
                >
                  Ödəniş et
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;