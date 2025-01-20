import React from 'react'
import coffeabout from '../../assets/coffe-about.png'
import CoffeeSuggestion from './CoffeeSuggestion'
function Main() {
  return (
<>
<section className="bg-[#ffb71c] hero overflow-hidden">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="xl:text-5xl 2xl:text-5xl text-3xl font-bold leading-none sm:text-3xl text-white">Ac mattis
				<span className="dark:text-violet-600 text-md">senectus</span>erat pharetra
			</h1>
			<p className="mt-6 mb-8 text-lg font-semibold sm:mb-12 text-white">Dictum aliquam porta in condimentum ac integer
				<br  className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<a rel="noopener noreferrer" href="#" className="px-8 py-3 border hover:bg-white hover:text-black duration-300  text-white text-lg font-semibold rounded ">Koffe dünyası ilə tanış ol</a>

			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src="https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-flying-cup-of-coffee-with-splash-and-png-image_12831547.png" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
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