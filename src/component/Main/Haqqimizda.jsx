import React from 'react'
import cofe1 from '../../assets/cofe1.avif'
import cofe2 from '../../assets/cofe-2.avif'
import cofe3 from '../../assets/cofe-3.avif'
import cofe4 from '../../assets/cofe-4.avif'
function Haqqimizda() {
  return (
<>


<div class="w-full lg:h-screen h-full m-auto flex items-center justify-cetner py-12 dark:bg-gray-900">
    <div class="w-full h-full flex flex-col justify-center items-center sm:px-4 px-2">
 
        <div class="lg:w-[90%] w-full mx-auto flex flex-col lg:gap-6 lg:flex-row items-center justify-center ">
            <div class="relative">
   
                <img src={cofe1}  class="absolute z-20 lg:left-[2rem] -top-4 left-[1rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"  alt="Side Image" />

                <img src={cofe2}   class="absolute z-20 lg:top-[12rem] sm:top-[11rem] top-[5rem] sm:-left-[3rem] -left-[2rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"  alt="Side Image 2" />

                
                <img src={cofe3}    class="absolute z-20 lg:top-[23rem] sm:top-[20.5rem] top-[10.5rem] left-[2rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"  alt="Side Image 3" />

              
                <img src={cofe4}
            class="rounded-full relative object-cover right-0 lg:w-[27rem] lg:h-[27rem] sm:w-[25rem] sm:h-[25rem] w-[12rem] h-[12rem] outline sm:outline-offset-[.77em] outline-offset-[.37em] outline-[#ffb71c]"
            alt="About us" />
            </div>
           
            <div
                class="lg:w-[60%] p-4 w-full h-full shadow-xl shadow-green-300/40 flex flex-col justify-center items-center sm:px-6 px-4 rounded-xl">
                <h2 class="text-4xl text-center text-green-600 dark:text-green-400 font-bold px-4 py-1 md:mt-0 mt-10">
                Amore Coffee
                </h2>
                <p class="md:text-3xl text-2xl text-center text-gray-800 dark:text-gray-200 font-bold my-5">Kofe Sevənlərin Dünyası
                </p>
                <p class="md:text-xl sm:text-lg text-base mt-2 text-justify sm:px-2 dark:text-gray-300">Amore Coffee-də biz inanırıq ki, əla kofe yalnız bir içki deyil, həm də bir təcrübədir. Davamlılıq prinsiplərinə əsaslanaraq əldə etdiyimiz dənələrdən innovativ dəmləmə üsullarına qədər keyfiyyətə və ətraf mühitə qarşı məsuliyyətliyik. Öz mükəmməl kofe anınızı bizimlə kəşf edin.
                </p>

                


            </div>

        </div>
    </div>
</div>
</>
  )
}

export default Haqqimizda