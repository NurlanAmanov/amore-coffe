import React from 'react'
import coffeabout from '../../assets/coffe-about.png'
import amorecoffe from '../../assets/coffe.png'
import CoffeeSuggestion from './CoffeeSuggestion'
import Silder from './Silder'
import Category from './Category'
function Homepage() {


  return (
<>
<div className='bg-[#f1ece9] '>
<section className="silder pt-[30px]">
<Silder />
</section>

<section className='catefory py-[50px] bg-white '>
  <p className='text-3xl font-[600] text-center'>Kateqoriyalar</p>
  <hr className='h-[50px] w-[3px] my-6 mx-auto bg-[#db9457]'/>
  <p className="text-lg text-center font-semibold">Seçilmiş ləzzətlərlə hazırlanmış menu</p>
<Category/>
</section>
<section className='about py-[50px] bg-[#f7f7f7]'>
<p className='text-3xl font-[600] text-center'>Haqqımızda</p>
<hr className='h-[50px] w-[3px] my-6 mx-auto bg-[#db9457]'/>
<div className="content text-center">
<p className="text-gray-700 text-lg leading-relaxed text-center w-[90%] mx-auto">
        Hər şeyi qəlb, bədən və ruhla edirik. Dünyanın dörd bir yanından fermerlərlə dərin tərəfdaşlıqlar 
        qurmağa və birlikdə perspektiv yaratmağa çalışırıq;
        <br />
        etibar və hörmətə əsaslanan sağlam iş münasibətləri qururuq.
      </p>
      <a href="#" className='border border-[#db9457] mx-auto w-[150px]  py-3 block mt-12'>Daha çox öyrən....</a>
</div>
</section>

<section className='encoxsatilan'>
<div className="max-w-4xl mx-auto py-10 px-2">
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        
        {/* İlk 3 şəkil */}
        <img src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg" alt="Soyuq Kofe" className="w-full h-full object-cover rounded-lg hover:scale-[1.01] duration-300"/>
        <img src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg" alt="Rahat Künc" className="w-full h-full object-cover rounded-lg hover:scale-[1.01] duration-300"/>
        <img src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg" alt="Dondurmalı Kofe" className="w-full h-full object-cover rounded-lg hover:scale-[1.01] duration-300"/>
        <img src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg" alt="Dondurmalı Kofe" className="w-full h-full object-cover rounded-lg hover:scale-[1.01] duration-300"/>

        {/* Mərkəzdə Başlıq */}
        <div className="flex items-center justify-center bg-gray-200 text-center text-xl font-semibold p-6 rounded-lg">
          ƏN ÇOX <br /> SATILANLAR
        </div>

        {/* Son 5 şəkil */}
        <img src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg" alt="Şam və Kofe" className="w-full h-full object-cover rounded-lg hover:scale-[1.01] duration-300"/>
        <img src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg" alt="Şam və Kofe" className="w-full h-full object-cover rounded-lg hover:scale-[1.01] duration-300"/>
        <img src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg" alt="Şam və Kofe" className="w-full h-full object-cover rounded-lg hover:scale-[1.01] duration-300"/>
        <img src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg" alt="Şam və Kofe" className="w-full h-full object-cover rounded-lg hover:scale-[1.01] duration-300"/>

      

      </div>
    </div>
</section>
<section className='pt-[50px]'>
<CoffeeSuggestion/>
</section>
<section className='followinsta bg-white py-[50px]'>
<h3 className='text-2xl font-semibold text-center p-4'>Instagramda bizi izlə</h3>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 items-center justify-center">
  {Array(6).fill("").map((_, index) => (
    <img
      key={index}
      src="https://www.coffeebeancompany.co.uk/app/uploads/2017/04/Coffee-Shop-1024x765.jpg"
      alt="Soyuq Kofe"
      className="w-full h-[220px] hover:-translate-y-4 duration-300 ease-in object-cover"
    />
  ))}
</div>

</section>
</div>
</>
  )
}

export default Homepage