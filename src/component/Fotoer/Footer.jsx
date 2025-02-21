import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import fb from '../../assets/icon/facebook.png'
import insta from '../../assets/icon/instagram.png'
import linkedin from '../../assets/icon/linkedin.png'
import twlogo from '../../assets/icon/twlogo.png'
import { DATA } from '../../Context/Datacontext'
function Footer() {
  const {socailmedia}=useContext(DATA)

  
  return (
   <>
<footer className='bg-[#333333] p-5'>
<div className="footer-conent flex items-center justify-between p-3 xl:flex-row flex-col gap-2">
  <div  className="social flex items-center justify-center gap-3">

{socailmedia && socailmedia.map((item,i)=>{
  return(
<>
<a key={i} href={item.facebookUrl}>
<img src={fb} className='w-[30px] object-cover' />
</a>
<a key={i}  href={item.instagramUrl}>

<img src={insta} className='w-[30px] object-cover' />
</a>
<a key={i}  href={item.linkedinUrl}>
<img src={linkedin} className='w-[30px] object-cover' />
</a>
<a key={i} href={item.twitterUrl}>
<img src={twlogo} className='w-[30px] object-cover' />
</a>
</>
  )
})}
  </div>
  <div className="text">
    <ul className='text-white flex items-center justify-center gap-4'>
      <li><a href="#">Məxfilik siyasəti</a></li>
      <li><a href="#">Karyer</a></li>
      <li><a href="#">Əlaqə</a></li>
    </ul>
  </div>
</div>
</footer>
   </>
  )
}

export default Footer