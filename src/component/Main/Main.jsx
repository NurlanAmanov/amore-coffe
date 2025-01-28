import React from 'react'
import coffeabout from '../../assets/coffe-about.png'
import amorecoffe from '../../assets/coffe.png'
import CoffeeSuggestion from './CoffeeSuggestion'
function Main() {
  return (
<>
<section className="bg-[#EFE6DD] hero overflow-hidden pt-[50px]">
	<div className="flex items-center justify-center h-[85vh] herofon relative overflow-hidden">
<div className="title absolute rotate-[270deg] left-[-50px]">
<h1 className='text-[160px] text-white font-semibold '>Amore</h1>
</div>

<div className="coffe-img absolute left-[5%] mx-auto flex items-center justify-center">
<img src={amorecoffe} alt="Amore Coffe"  className='w-[50%] object-cover' />
</div>

<div className="desc-amore max-w-[50%] absolute left-[55%] top-[20%] flex items-start justify-start flex-col gap-6">
	<p className='text-[25px] font-bold text-[#673722]'>Kofe seçiminiz ulduzlardan ilham alsın! ✨☕</p>
	<h2 className='text-7xl text-[#673722] font-bold'>Amore <span className='font-semibold'>Coffee</span> </h2>
	<p className='text-[25px] font-bold text-[#673722]'>Hər fincanda ulduzların enerjisi gizlidir. Bürcünüzə uyğun kofenizi seçin!</p>

	<a href="#" className='text-[30px] text-[#673722] border border-[#673722] hover:bg-[#7a461f] cursor-pointer duration-300 hover:text-white font-semibold mx-0 h-[55px] w-[180px]  flex items-center justify-center rounded-3xl'> KƏŞF ET !</a>
</div>
    </div>


</section>
<section className='about-us bg-[#fff] pt-7'>
<div class="sm:flex items-center max-w-screen-xl">
    <div class="sm:w-1/2 p-5">
        <div class="image object-center text-center">
            <img className=' object-cover  mx-auto w-[50%]' src={coffeabout}/>
        </div>
    </div>
    <div class="sm:w-1/2 p-5">
	<div class="text">
    <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">Amore Coffee</span>
	<h2 class="my-4 font-bold text-3xl sm:text-4xl">Kofe <span class="text-indigo-600">Sevənlərin Dünyası</span></h2>
    <p class="text-gray-700">
        <strong>Amore Coffee</strong>-ə xoş gəlmisiniz! Burada hər qurtum ləzzət, ehtiras və peşəkarlığın təntənəsidir. Bizim missiyamız sadədir: sizə dünyanın ən keyfiyyətli dənələrindən əldə edilən, mükəmməl qovrulmuş kofeni təqdim etmək. İstər günə başlamaq, istərsə də axşamınızı rahat bir fincanla bitirmək üçün Amore Coffee sizə istilik, zənginlik və sevgi dolu kofe təklif edir.
    </p>
    <p class="text-gray-700 mt-4">
        Amore Coffee-də biz inanırıq ki, əla kofe yalnız bir içki deyil, həm də bir təcrübədir. Davamlılıq prinsiplərinə əsaslanaraq əldə etdiyimiz dənələrdən innovativ dəmləmə üsullarına qədər keyfiyyətə və ətraf mühitə qarşı məsuliyyətliyik. Öz mükəmməl kofe anınızı bizimlə kəşf edin.
    </p>
</div>

    </div>
</div>
</section>

<section className='pt-7'>
<CoffeeSuggestion/>
</section>
</>
  )
}

export default Main