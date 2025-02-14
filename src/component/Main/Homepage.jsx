import React from 'react'
import coffeabout from '../../assets/coffe-about.png'
import amorecoffe from '../../assets/coffe.png'
import CoffeeSuggestion from './CoffeeSuggestion'
import Silder from './Silder'
import Category from './Category'
function Homepage() {
  return (
<>
<div className='bg-[#EFE6DD] '>
<section className="hero overflow-hidden  w-full mx-auto  py-4 ">
<div className="silder-content rounded-lg z-40  pb-5 pt-[60px] ">
<Silder className="" />
</div>
</section>
<section className='slogan pt-[50px]'>
<div className="grid md:grid-cols-2 items-center md:gap-8 gap-6 max-w-[95%] mx-auto">
      
      {/* ✅ Sol Tərəf - Mətn və Düymələr */}
      <div className="max-md:order-1 max-md:text-center">
        <h2 className="md:text-4xl text-3xl md:leading-10 font-extrabold text-[#7a461f] mb-4">
          Hər Fincanda Həzzin Zirvəsi
        </h2>
        <p className="mt-4 text-base text-gray-700 leading-relaxed">
          Amore Coffee ilə unikal dadı kəşf edin. Bizim yüksək keyfiyyətli qəhvə dənələrimiz hər fincanda mükəmməl ləzzəti təmin edir.
          İndi sifariş edin və dadını hiss edin!
        </p>

        {/* ✅ Düymələr */}
        <div className="mt-8 flex max-sm:flex-col sm:space-x-4 max-sm:space-y-6">
          <a
            href="/;"
            className="px-6 py-3 text-base font-semibold text-white bg-[#7a461f] rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#7a461f] focus:outline-none focus:ring-opacity-50"
          >
            Menyuya Bax
          </a>
          <a
            href="/;"
            className="px-6 py-3 text-base font-semibold text-[#7a461f] border border-[#c69c6d] rounded-full hover:text-white hover:bg-[#7a461f] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#7a461f] focus:outline-none focus:ring-opacity-50"
          >
            İndi Sifariş Et
          </a>
        </div>
      </div>

      {/* ✅ Sağ Tərəf - Şəkil */}
      <div className="md:h-[450px]">
        <img
          src={coffeabout}
          className="w-[80%] mx-auto h-full object-cover rounded-lg "
          alt="Amore Coffee"
        />
      </div>
    </div>
</section>
<section className='catefory pt-[50px] '>
<Category/>
</section>
<section className='pt-[50px]'>
<CoffeeSuggestion/>
</section>
</div>
</>
  )
}

export default Homepage