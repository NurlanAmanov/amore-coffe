import React, { useContext } from 'react'
import { DATA } from '../../Context/Datacontext'

function Abouthome() {
const {slogan}=useContext(DATA)
  return (
    <>
    
    
    <section className='about py-[50px] bg-[#f7f7f7]'>
<p className='text-3xl font-[600] text-center'>Haqqımızda</p>
<hr className='h-[50px] w-[3px] my-6 mx-auto bg-[#db9457]'/>
<div className="content text-center">
<p className="text-gray-700 text-lg leading-relaxed text-center w-[90%] mx-auto">
       {slogan && slogan.map((item)=>{
        return(
            <span>{item.description}</span>
        )
       })}
      </p>
      <a href="#" className='border border-[#db9457] mx-auto w-[150px]  py-3 block mt-12'>Daha çox öyrən....</a>
</div>
</section>
    </>
  )
}

export default Abouthome