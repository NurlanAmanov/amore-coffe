import React from 'react'
import coffeabout from '../../assets/coffe-about.png'
import amorecoffe from '../../assets/coffe.png'
import CoffeeSuggestion from './CoffeeSuggestion'
import Silder from './Silder'
import Category from './Category'
function Main() {
  return (
<>
<div className='bg-[#EFE6DD] '>
<section className="hero overflow-hidden  w-full mx-auto px-3 py-4 rounded-2xl">
<div className="silder-content ">
<Silder />
</div>
</section>

<section className='catefory pt-[30px]'>
<Category/>
</section>
<section className='pt-[30px]'>
<CoffeeSuggestion/>
</section>
</div>
</>
  )
}

export default Main