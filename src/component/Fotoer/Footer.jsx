import React from 'react'
import { Link } from 'react-router-dom'
import fb from '../../assets/icon/facebook.png'
import insta from '../../assets/icon/instagram.png'
import linkedin from '../../assets/icon/linkedin.png'
function Footer() {
  return (
   <>
<footer className='bg-[#333333] p-5'>
<div className="footer-conent flex items-center justify-between p-3 xl:flex-row flex-col gap-2">
  <div className="social flex items-center justify-center gap-3">
<img src={fb} className='w-[30px] object-cover' />
<img src={insta} className='w-[30px] object-cover' />
<img src={linkedin} className='w-[30px] object-cover' />
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