import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/Amore.png';
import Cart from '../Main/Cart';
import { Link } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaUser } from "react-icons/fa";
import { DATA } from '../../Context/Datacontext';
import Loginpage from '../../login/Loginpage';
import { BASKET } from '../../Context/BasketContext';

function Header() {
    const { banner, isLoggedIn } = useContext(DATA);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [opensebet, setOpensebet] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {sebet}=useContext(BASKET)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    useEffect(() => {
        if (isMenuOpen || isProfileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen, isProfileOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest("#profile-dropdown")) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <>
            {/* 📌 Fixed Header */}
            <header className={`fixed ${banner ? 'top-[60px]' : 'top-0'} left-0 w-full bg-[#7a461f] shadow-lg z-[40] transition-all duration-300`}>
                <div className="container mx-auto max-w-screen-xl px-6">
                    <div className="flex items-center justify-between py-3">
                        {/* ✅ Logo */}
                        <Link to={"/"} className="flex items-center">
                            <img src={logo} alt="Logo" className="h-[60px] w-[90px] xl:w-[150px] object-cover" />
                        </Link>

                        {/* ✅ Desktop Menü */}
                        <nav className="hidden xl:flex items-center gap-6">
                            <Link to="/cabinet" className="text-white text-base font-medium hover:text-gray-300 transition">Lokasiyalar</Link>
                            <Link to="/about" className="text-white text-base font-medium hover:text-gray-300 transition">Haqqımızda</Link>
                            <Link to="/teklif" className="text-white text-base font-medium hover:text-gray-300 transition">Bizə təklif göndər</Link>
                        
                        </nav>

                        {/* ✅ Sağ Tərəf */}
                        <div className="flex items-center gap-4">
                            {/* ✅ İstifadəçi İkonu */}
                            <div className="sifaris-et">
                                <span className='bg-[#4A2C2A] text-white px-4 py-3 rounded-md hover:bg-[#fff] hover:text-[#000] duration-300 ease-in cursor-pointer'>Sifariş et</span>
                            </div>
                            <div id="profile-dropdown" className="relative">
                                <FaUser className="text-white text-xl cursor-pointer hover:text-gray-300" onClick={toggleProfile} />
                            </div>
                            {/* ✅ Səbət */}
                            <div className="relative">
                                <GiShoppingCart className="text-2xl text-white cursor-pointer hover:text-gray-300" onClick={() => setOpensebet(true)} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{sebet.length}</span>
                            </div>
                            {/* ✅ Mobil Menyu Açma */}
                            <IoMenu className="xl:hidden text-2xl text-white cursor-pointer" onClick={toggleMenu} />
                        </div>
                    </div>
                </div>
            </header>

            {/* 📌 Login Modal */}
            {isProfileOpen && <Loginpage toggleProfile={toggleProfile} />}

            {/* 📌 Sağdan Açılan Mobil Menyu */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`bg-[#7a461f] w-3/4 sm:w-1/2 md:w-1/3 h-full p-6 text-white flex flex-col space-y-6 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <IoClose className="text-3xl cursor-pointer self-end" onClick={toggleMenu} />
                    <Link to="/s" className="text-lg font-medium" onClick={toggleMenu}>Lokasiyalar</Link>
                    <Link to="/about" className="text-lg font-medium" onClick={toggleMenu}>Haqqımızda</Link>
                    <Link to="/teklif" className="text-lg font-medium" onClick={toggleMenu}>Bizə təklif göndər</Link>

                </div>
            </div>

            {/* 📌 Səbət */}
            <Cart opensebet={opensebet} setOpensebet={setOpensebet} />
        </>
    );
}

export default Header;
