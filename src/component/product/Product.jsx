import React from 'react'

function Product() {
  return (
    <>
    
    <div className="font-[sans-serif] bg-gray-100 pt-[150px]">
      <div className="p-4 mx-auto ">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-10">category adi adi</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-xl:gap-4 gap-6">
          <div className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
            <div className="mb-4 bg-gray-100 rounded p-2">
              <img src="https://readymadeui.com/images/coffee2.webp" alt="Product 1"
                className="aspect-[33/35] w-full object-contain" />
            </div>

            <div>
              <div className="flex gap-2">
                <h5 className="text-base font-bold text-gray-800">Sole Elegance</h5>
                <h6 className="text-base text-gray-800 font-bold ml-auto">$10</h6>
              </div>
              <p className="text-gray-500 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p className="text-gray-600 text-[13px] mt-2">Category: test-cate</p>
              <div className="flex items-center gap-2 mt-4">
                <div
                  className="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-[pink-600] inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 h-9 font-semibold w-full bg-[#7a461f] hover:bg-[#eaddd5] hover:text-black text-white tracking-wide ml-auto outline-none border-none rounded">Səbətə at</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Product