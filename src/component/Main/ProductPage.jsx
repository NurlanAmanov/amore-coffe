import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DATA } from "../../Context/Datacontext"; 
import { BASKET } from "../../Context/BasketContext";
import Product from "../product/Product";
import Teklifler from "../product/Teklifler";
function ProductPage() {
  const { id } = useParams(); 
  const { mehsulid, fetchProductById } = useContext(DATA); 
  const { bassketadd } = useContext(BASKET);
  const [count, setCount] = useState(1);
  useEffect(() => {
    fetchProductById(id); 
  }, [id]);

  if (!mehsulid) {
    return <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96 ">
    <div className="h-48 rounded-t dark:bg-gray-300"></div>
    <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
      <div className="w-full h-6 rounded dark:bg-gray-300"></div>
      <div className="w-full h-6 rounded dark:bg-gray-300"></div>
      <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
    </div>
  </div>;
  }

  return (
   <>


    <div class="font-[sans-serif] p-4 bg-gray-100 py-32">
  <div class="lg:max-w-6xl max-w-xl mx-auto">
    <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
      <div class="w-full lg:sticky top-0">
        <div class="flex flex-col gap-4">
          <div class="bg-white shadow p-2">
            <img  src={`https://finalprojectt-001-site1.jtempurl.com${mehsulid.imgUrl}`}
            alt={mehsulid.title}
              class="w-full  aspect-[11/8] object-cover object-top" />
          </div>
          <div class="bg-white p-2 w-full max-w-full overflow-auto">
            <div class="flex justify-between flex-row gap-4 shrink-0">
              <img src="https://readymadeui.com/images/sunscreen-img-1.webp" alt="Product1"
                class="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-black" />
              <img src="https://readymadeui.com/images/sunscreen-img-2.webp" alt="Product2"
                class="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
              <img src="https://readymadeui.com/images/sunscreen-img-3.webp" alt="Product3"
                class="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
              <img src="https://readymadeui.com/images/sunscreen-img-4.webp" alt="Product4"
                class="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
              <img src="https://readymadeui.com/images/sunscreen-img-5.webp" alt="Product5"
                class="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
              <img src="https://readymadeui.com/images/sunscreen-img-6.webp" alt="Product6"
                class="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full">
        <div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-800">{mehsulid.title}</h3>
          <div class="flex items-center gap-3 mt-1">
            <div class="flex items-center gap-1">
              <p class="text-base text-gray-500">4</p>
              <svg class="w-4 h-4 fill-purple-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg class="w-4 h-4 fill-purple-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg class="w-4 h-4 fill-purple-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg class="w-4 h-4 fill-purple-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg class="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            </div>
            <span class="text-gray-500">|</span>
            <p class="text-sm text-gray-500">  {mehsulid.tags && mehsulid.tags.length > 0 ? (
              mehsulid.tags.map((tagItem) => (
                <span
                  key={tagItem.tag.id}
                  className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded"
                >
                  {tagItem.tag.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">Tag yoxdur</span>
            )}</p>
            <span class="text-gray-500">|</span>
            <p class="text-sm text-gray-500">50 Reviews</p>
          </div>
          <div class="mt-2">
            <p class="text-gray-500 mt-1 text-sm">{mehsulid.about}</p>
          </div>

          <div class="flex items-center flex-wrap gap-2 mt-4">
          {mehsulid.discount > 0 ? (
              <>
            <p class="text-gray-500 text-base"><strike>{mehsulid.price} ₼</strike></p>
            <h4 class="text-[#7a461f] text-2xl sm:text-3xl font-bold">{mehsulid.finalPrice} ₼</h4>
            <div class="flex py-1 px-2 bg-[#7a461f] font-semibold !ml-4">
              <span class="text-white text-sm">-{mehsulid.discount}%</span>
            </div>
                
              </>
            ) : (
              <p className="text-xl font-semibold text-gray-900">{mehsulid.price} ₼</p>
            )}
            
          </div>

        
        </div>

        <hr class="my-6 border-gray-300" />

        <div>
    
          <div className="flex flex-col items-center justify-start md:flex-row w-full gap-6 mt-4">
            {/* Ölçü seçimi */}
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-bold text-gray-800">Ölçü seçin:</h3>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                <option value="small">Kiçik</option>
                <option value="medium">Orta</option>
                <option value="large">Böyük</option>
              </select>
            </div>

            {/* Şəkər dərəcəsi seçimi */}
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-bold text-gray-800">Şəkər dərəcəsi:</h3>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                <option value="low">Az şəkərli</option>
                <option value="medium">Şəkərli</option>
                <option value="high">Tam şəkərli</option>
              </select>
            </div>

  {/* Qiymer */}
  <div className="flex items-center border mt-6 border-gray-300 bg-white px-3 py-2 w-max">
              <button 
                type="button" 
                className="border-none outline-none px-2"
                onClick={() => setCount(prev => Math.max(prev - 1, 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 121.805 121.804">
                  <path d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z"/>
                </svg>
              </button>
              <span className="text-gray-800 text-sm font-semibold px-3">{count}</span>
              <button 
                type="button" 
                className="border-none outline-none px-2"
                onClick={() => setCount(prev => prev + 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512">
                  <path d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z"/>
                  <path d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z"/>
                </svg>
              </button>
            </div>
          </div>


          <div class="mt-4 flex flex-wrap gap-4">
            <button type="button"
              class="px-4 py-3 w-[45%] border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold">
             Sevimlilərə at</button>
             <button  
                onClick={() => {
                  bassketadd(
                    mehsulid.title,
                    mehsulid.about,
                    mehsulid.id,
                    `https://finalprojectt-001-site1.jtempurl.com${mehsulid.imgUrl}`,
                    mehsulid.description,
                    mehsulid.price,
                    mehsulid.discount,
                    mehsulid.finalPrice,
                    count // ✅ SAY DƏYƏRİNİ GÖNDƏRİRİK
                  );
                }} 
                type="button"
                className="px-4 py-3 w-[45%] border border-[#7a461f] outline-none bg-[#7a461f] hover:bg-white hover:text-black duration-300 text-white text-sm font-semibold"
              >
                {count} ədəd Səbətə at
              </button>
          </div>
        </div>

        <hr class="my-6 border-gray-300" />

        <div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-800">Select Delivery Location</h3>
          <p class="text-gray-500 text-sm mt-1">Enter the pincode of your area to check product availability.</p>
          <div class='flex items-center gap-2 mt-4 max-w-sm'>
            <input type='number' placeholder='Enter pincode'
              class='bg-white px-4 py-2.5 text-sm w-full  border border-gray-300 outline-0' />
            <button type='button'
              class='border border-[#7a461f] outline-none bg-[#7a461f] hover:bg-white hover:text-black duration-300 text-white  px-4 py-2.5 text-sm'>Apply</button>
          </div>
        </div>

        <div class='flex justify-between gap-4 mt-6'>
 
  <div class="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 fill-brown-600 inline" viewBox="0 0 24 24">
      <path d="M3 10c0 3.866 3.134 7 7 7s7-3.134 7-7h-14zM10 16c-4.411 0-8-3.589-8-8h18c0 4.411-3.589 8-8 8zM19 12v-2h3v2h-3z" />
    </svg>
    <p class='text-gray-500 text-xs sm:text-sm mt-3'>100% Təzə və Keyfiyyətli Kofe</p>
  </div>


  <div class="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 fill-brown-600 inline" viewBox="0 0 24 24">
      <path d="M12 0c-5.52 0-10 4.48-10 10 0 5.52 4.48 10 10 10 5.52 0 10-4.48 10-10 0-5.52-4.48-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM10 7h4v2h-4v-2zm0 4h4v2h-4v-2z" />
    </svg>
    <p class='text-gray-500 text-xs sm:text-sm mt-3'>Hər Zövqə Uyğun Dad Seçimi</p>
  </div>


  <div class="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 fill-brown-600 inline" viewBox="0 0 24 24">
      <path d="M22 12h-4v-3h-3v3h-4v-3h-3v3h-4v-3h-3v3h-2v8h24v-8h-2zm-18 6h-2v-3h2v3zm16 0h-2v-3h2v3zm-4 0h-8v-3h8v3z" />
    </svg>
    <p class='text-gray-500 text-xs sm:text-sm mt-3'>50 AZN-dən Yuxarı Sifarişlərdə Pulsuz Çatdırılma</p>
  </div>
</div>

      </div>
    </div>
  </div>
</div>

    <div className="prduct">
      <Teklifler/>
    </div>
   </>
    
  );
}

export default ProductPage;
