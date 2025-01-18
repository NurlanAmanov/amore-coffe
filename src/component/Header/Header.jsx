import React, { useState } from 'react'
import logo from '../../assets/logos.png'
function Header() {
    const [bars,setBars]=useState()
    function openbars (){
        setBars(!bars)
    }
    function closbar (){
        setBars(!bars)
    }
  return (
  <>
  <header >
    <nav >
        <div className="mobile-menu relative overflow-hidden xl:hidden 2xl:hidden block">
        <div className="mobilebar flex items-center justify-between p-4">
        <a href="#" className='w-[120px] '>
            <img  src={logo}  className='w-[100%] h-[60px]  object-cover' />
        </a>
        <div className="bars mx-4">
        <i onClick={openbars} className="fa-solid fa-bars text-black text-2xl "></i>
        </div>
        
        </div>
        <div className={`${bars ? 'top-0 ' : 'top-[-100%]'} flex p-5 items-start justify-between flex-row-reverse z-10 duration-300 w-full h-[100vh]  fixed bg-black bg-opacity-90`}>
           <i onClick={closbar} className="fa-solid fa-x p-2 text-xl font-semibold text-white"></i>
           <div className="burger-menu-list">
           <ul className=' flex items-start justify-center flex-col text-white'>
                <li className='text-2xl font-semibold'><a href="#">Ana səhifə</a></li>
                <li className='text-2xl font-semibold'><a href="#">Haqqımızda</a></li>
                <li className='text-2xl font-semibold'> <a href="#">Bizə sorğu göndər</a></li>
                <li className='text-2xl font-semibold'><a href="#">lorem</a></li>
                <li className='text-2xl font-semibold'><a href="#">lorem</a></li>
             
            </ul>
           </div>
        </div>
        </div>

    </nav>

    <div class="bg-[#ffb71c] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 xl:block 2xl:block hidden ">
        <div class="flex flex-wrap mt-6 justify-between items-center mx-auto max-w-[90%] bg-black text-white p-2 rounded-md">
            <a href="https://flowbite.com" class="flex items-center">
            <img src={logo} className="w-48 h-16 object-cover" alt="Flowbite Logo" />
               
            </a>
            <div class="flex items-center lg:order-2">
                <a href="#" className="text-md bg-white rounded-md text-black px-4 lg:px-5 py-2 lg:py-2.5 mr-2"><i className="fa-regular fa-user  text-md"></i></a>
                <a href="#" className="text-md bg-white rounded-md text-black px-4 lg:px-5 py-2 lg:py-2.5 mr-2"><i className="fa-solid fa-cart-shopping  text-md"></i></a>
                
               
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Amore Coffe</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-white rounded  lg:p-0  text-xl  hover:text-white duration-500 " aria-current="page">Ana səhifə</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-white rounded  lg:p-0  text-xl hover:text-white duration-500  ">Haqqımızda</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-white rounded  lg:p-0  text-xl hover:text-white duration-500  ">Əlaqə</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-white rounded  lg:p-0  text-xl hover:text-white duration-500  ">Bizə təklif göndər</a>
                    </li>
                   
                </ul>
            </div>
        </div>
    </div>
   
  </header>
  </>
  )
}

export default Header