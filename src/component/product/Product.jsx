import React, { useContext } from 'react'
import { DATA } from '../../Context/Datacontext'
import { data } from 'react-router-dom';
import { BASKET } from '../../Context/BasketContext';

function Product() {

  const {mehsul}=useContext(DATA)
const {bassketadd}=useContext(BASKET)
  
  return (
    <>
 <div className="prodcut-main pt-[160px] px-[90px]">
 {mehsul.map((item,i)=>{
      return(
        <div className="bg-white w-[230px]  rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
            <div className="mb-4 bg-gray-100 rounded p-2">
              <img src={item.imgUrl} alt={item.title}
                className="aspect-[33/35] w-full object-contain" />
            </div>

            <div>
              <div className="flex gap-2">
                <h5 className="text-base font-bold text-gray-800">{item.title}</h5>
                <h6 className="text-base text-gray-800 font-bold ml-auto">{item.price}</h6>
              </div>
              <p className="text-gray-500 text-[13px] mt-2">{item.desciption}</p>
              <p className="text-gray-600 text-[13px] mt-2">{item.about}</p>
              <div className="flex items-center gap-2 mt-4">
                <div
                  className="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-[pink-600] inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button onClick={()=>bassketadd(item.title,item.desciption,item.about,item.imgUrl,item.price)} type="button" className="text-sm px-2 h-9 font-semibold w-full bg-[#7a461f] hover:bg-[#eaddd5] hover:text-black text-white tracking-wide ml-auto outline-none border-none rounded">Səbətə at</button>
              </div>
            </div>
          </div>

        
      )
    })}
 </div>
    
    </>
  )
}

export default Product
