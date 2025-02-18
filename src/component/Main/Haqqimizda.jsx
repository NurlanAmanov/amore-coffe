import React from 'react'

import imgabout from '../../assets/silder/bg3.png'
function Haqqimizda() {
  return (
<>
<div className="head-text bg-[#f2f2f2] w-full py-[60px]">
   <h3 className='text-center text-2xl text-black pt-[60px]'>Haqqımızda</h3>
   </div>

<div className="about-conten w-[95%] mx-auto py-4">
<div className="about-img  mx-auto flex items-center justify-center">
<img src={imgabout} alt="about" className='w-[90%] h-[430px] object-cover' />
</div>
<div className="about-content px-5 py-8 p-2 border border-[#cccccc] my-12 rounded-xl">
    <p className='text-xl font-semibold'>
         
Giovanni'nin xüsusi kafe qarışıqları, yerli İtalyan dadlarını və aromalarını barındıraraq, hər yudumda zəngin bir mədəni mirası ifadə edir. 20-ci əsrin ortalarına doğru, Amore Coffee Shop, İtalyan sərhədlərini aşaraq beynəlxalq bir fenomenə çevrilmiş və kafe sevərlərin vazkeçilməz dayanacaqlarından biri halına gəlmişdir. Bu gün belə Amore Coffee Shop, Giovanni'nin kafe istehsalına olan tutkusunu və Rosa'ya olan sevgisini hər bir fincanda yaşatmağa davam edir.
Bu tarixi məkan, ziyarətçilərə yalnız bir fincan kafe təqdim etməklə kalmır, eyni zamanda onlara bir hekayə, bir miras sunar. Amore Coffee Shop'a addım atan hər kəs, İtalyan kafe mədəniyyətinin dərinliklərinə dalma və həqiqi bir aşk hekayəsinin hissəsi olma fürsəti tapar. Bakıya gələn bu unikal kafe məkanı, İtalyan kafe sənətinin və Rosa ilə Giovanni'nin sonsuz sevgi hekayəsini Azərbaycanın mədəni peyzajına daşıyır, ziyarətçilərə yalnız ləzzətli bir fincan kafe deyil, həm də unudulmaz bir təcrübə təklif edir.
    </p>
</div>
</div>
</>
  )
}

export default Haqqimizda