import React, { useState } from 'react'
import logo from '../../assets/logos.png'
import logo2 from '../../assets/logo.png'
import { Link, Links } from 'react-router-dom'
import Cart from '../Main/Cart'

function Header() {
    const [bars, setBars] = useState()
    const [sebet, setSebet] = useState(false);

    const opensebet = () => {
        setSebet(true);
    };


    function openbars() {
        setBars(!bars)
    }
    function closbar() {
        setBars(!bars)
    }


    return (
        <>
            <header className="relative" >
                <nav >
                    <div className="mobile-menu relative overflow-hidden xl:hidden 2xl:hidden block bg-[#7a461f]">
                        <div className="mobilebar flex items-center justify-between p-4">
                            <Link to={'/'} className='w-[130px] '>
                                <img src={logo} className='w-[100%] h-[60px]  object-cover' />
                            </Link>
                            <div className="bars mx-4">
                                <a href="#" className="text-xl bg-white rounded-md text-black px-4 lg:px-5 py-2 lg:py-2.5 mr-2"><i className="fa-regular fa-user  text-md"></i></a>
                                <a onClick={opensebet} href="#" className="text-xl bg-white rounded-md text-black px-4 lg:px-5 py-2 lg:py-2.5 mr-2"><i className="fa-solid fa-cart-shopping  text-md"></i></a>
                                <a onClick={openbars} className="fa-solid fa-bars  text-white text-2xl "></a>
                            </div>

                        </div>
                        <div className={`${bars ? 'top-0 ' : 'top-[-100%]'} flex p-5 items-start justify-between flex-row-reverse z-30 duration-300 w-full h-[100vh]  fixed bg-black bg-opacity-90`}>
                            <i onClick={closbar} className="fa-solid fa-x p-2 text-xl font-semibold text-white"></i>
                            <div className="burger-menu-list">
                                <ul className=' flex items-start justify-center flex-col text-white'>
                                    <li className='text-2xl font-semibold'><a href="#">Ana səhifə</a></li>
                                    <li className='text-2xl font-semibold'><Link to={"haqqimizda"}>Haqqımızda</Link></li>
                                    <li className='text-2xl font-semibold'> <a href="#">Bizə sorğu göndər</a></li>
                                    <li className='text-2xl font-semibold'><Link to={"Elaqe"} href="#">Əlaqə</Link></li>
                                    <li className='text-2xl font-semibold'><a href="#">lorem</a></li>
                                    <Link to={'/teklif'} className="text-2xl font-semibold' ">Bizə təklif göndər</Link>
                                </ul>
                            </div>
                        </div>
                    </div>

                </nav>

                <div class="bg-[#7a461f] fixed w-full z-20 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 xl:block 2xl:block hidden ">
                    <div className="menu flex items-center justify-between max-w-[95%] mx-auto">
                        <ul className="flex flex-col items-center justify-center mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to={'/'} className="block py-2 pr-4 pl-3 text-[white] rounded  lg:p-0  text-xl  hover:text-white duration-500 " aria-current="page">Ana səhifə</Link>
                            </li>
                            <li>
                                <Link to={"haqqimizda"} className="block py-2 pr-4 pl-3 text-white rounded  lg:p-0  text-xl hover:text-white duration-500  ">Haqqımızda</Link>
                            </li>
                            <li>
                                <Link to={"Elaqe"} className="block py-2 pr-4 pl-3 text-white rounded  lg:p-0  text-xl hover:text-white duration-500  ">Əlaqə</Link>
                            </li>


                        </ul>

                        <a href="/" class="flex items-center">
                            <img src={logo} className="w-48 h-16 object-cover" alt="Flowbite Logo" />

                        </a>
                        <ul className="flex flex-col items-center justify-center mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to={'/teklif'} className="block bg-black py-2 px-2  text-white  rounded   text-xl hover:text-white duration-500 ">Bizə təklif göndər</Link>
                            </li>
                            <a href="#" className="text-md bg-white rounded-md text-black px-4 lg:px-5 py-2 lg:py-2.5 mr-2"><i className="fa-regular fa-user  text-md"></i></a>
                            <a onClick={opensebet} className="text-md bg-white rounded-md text-black px-4 lg:px-5 py-2 lg:py-2.5 mr-2"><i className="fa-solid fa-cart-shopping  text-md"></i></a>

                        </ul>

                    </div>
                </div>

            </header>
            <Cart sebet={sebet} setSebet={setSebet} />

        </>
    )
}

export default Header