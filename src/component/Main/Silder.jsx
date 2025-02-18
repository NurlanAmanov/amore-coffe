import React from 'react'

function Silder() {
  return (
    <>
 <div className="w-[95%] mx-auto overflow-x-hidden grid grid-cols-1 lg:grid-cols-2 items-center md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5" data-aos="fade-right" data-aos-duration="800">
      
      {/* Yazı olan hissə */}
      <div className="pr-2 py-14 md:py-0 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-black xl:text-3xl lg:text-2xl">
          <span className="block w-full">Koffe seçiminiz ulduzlardan ilham alsın</span>
          İndi sifariş edin və dadını hiss edin!
        </h1>
        <p className="py-4 text-lg text-gray-500 2xl:py-8 md:py-6 2xl:pr-5">
          Hər Fincanda Həzzin Zirvəsi
        </p>
        <div className="mt-4">
          <a href="#contact" className="px-5 py-3 text-lg tracking-wider text-black bg-transparent border border-[#de9f69] rounded-lg md:px-8 hover:bg-[#de9f69] hover:text-white duration-300">
            <span>Keçid et</span>
          </a>
        </div>
      </div>

      {/* Şəkil olan hissə */}
      <div className="flex justify-center lg:justify-end">
        <img
          id="heroImg1"
          className="transition-all duration-300 ease-in-out  w-full max-w-md lg:max-w-xl"
          src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg"
          alt="Awesome hero page image"
          width="500"
          height="488"
        />
      </div>

    </div>

    
    </>
  )
}

export default Silder