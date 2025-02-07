import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { BASKET } from '../../Context/BasketContext';

function Cart({ opensebet, setOpensebet }) {
  const {sebet}=useContext(BASKET)
  return (
 <section className='relative'>
     <div className={`${opensebet ? "block" : "hidden"} sebet-container fixed z-50 `}>
      <div className="fixed inset-0 w-full h-full  before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans">
        <div className="w-full max-w-lg bg-white shadow-lg relative ml-auto h-screen">
          <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
            {/* Başlıq */}
            <div className="flex items-center gap-4 text-gray-800">
              <h3 className="text-2xl font-bold flex-1">Səbət</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                onClick={() => setOpensebet(false)} // Səbəti bağlamaq üçün çağırılır
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>

            {/* Məhsul */}
           {sebet.map((item,i)=>{
        return(
          <div key={i} className="space-y-4 mt-12">
          <div className="grid grid-cols-3 items-start gap-4">
            <div className="col-span-2 flex items-start gap-4">
              <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                <img
                  src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                  className="w-full h-full object-contain"
                  alt="Product"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base max-sm:text-sm font-bold text-gray-800">
                 {item.title}
                </h3>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">
                {item.about}
                </p>
              </div>
            </div>
            <div className="ml-auto">
              <h4 className="text-base max-sm:text-sm font-bold text-gray-800">
              {item.price}
              </h4>
            </div>
          </div>
        </div>
        )
            
           })}
          </div>

          {/* Alt Panel */}
          <div className="p-4 absolute bottom-0 w-full border-t bg-white">
            <ul className="text-gray-800 divide-y">
              <li className="flex flex-wrap gap-4 text-lg font-bold">
                Toplam <span className="ml-auto">$125.00</span>
              </li>
            </ul>
            <Link to={'/Check'} >

            <button 
              type="button"
              className="mt-6 text-sm font-semibold px-4 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide"
            >
Ödəniş səhifəsinə keç
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
 </section>
  );
}


export default Cart