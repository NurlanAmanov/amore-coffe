import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/Amore.png';
import music from '../../assets/music.png';
import Cart from '../Main/Cart';
import { Link } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaUser } from "react-icons/fa";
import { DATA } from '../../Context/Datacontext';

function Header() {
      const {banner}=useContext(DATA)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [opensebet, setOpensebet] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen]);

    // Kənara klik edildikdə profil menyusunu bağlayır
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
            {/* 📌 Banner */}
         
            {/* 📌 Fixed Header */}
            <header className={`fixed top-[60px] h-auto left-0 w-full bg-[#7a461f] shadow-lg z-[40] transition-all duration-300`}>
                <div className="container mx-auto max-w-screen-xl px-6">
                    <div className="flex items-center justify-between py-3">
                        
                        {/* ✅ Logo */}
                        <Link to={"/"} className="flex items-center">
                            <img src={logo} alt="Logo" className="h-[60px] w-[90px] xl:w-[150px] 2xl:w-[150px] object-cover" />
                        </Link>

                        {/* ✅ Desktop Menü */}
                        <nav className="hidden xl:flex items-center gap-6">
                            <Link to="/s" className="text-white text-base font-medium hover:text-gray-300 transition">Lokasiyalar</Link>
                            <Link to="/about" className="text-white text-base font-medium hover:text-gray-300 transition">Haqqımızda</Link>
                            <Link to="/teklif" className="text-white text-base font-medium hover:text-gray-300 transition">Bizə təklif göndər</Link>
                            <Link to="/contact" className="text-white text-base font-medium hover:text-gray-300 transition">Əlaqə</Link>
                        </nav>

                        {/* ✅ Sağ Tərəf */}
                        <div className="flex items-center gap-4">
                            
                            {/* ✅ İstifadəçi İkonu */}
                            <div id="profile-dropdown" className="relative">
                                <FaUser
                                    className="text-white text-xl cursor-pointer hover:text-gray-300"
                                    onClick={toggleProfile}
                                />
                                
                                {/* ✅ Açılan Profil Menyusu */}
                                {isProfileOpen && (
                                    <div className="bg-white z-[90] shadow-lg py-6 px-6 rounded w-[90%] mx-auto left-0 xl:w-[250px] 2xl:w-[250px] xl:left-auto fixed right-0 xl:right-20 top-[120px] transition-opacity duration-300">
                                        <h6 className="font-semibold text-[15px]">Xoş Gəlmisiniz</h6>
                                        <p className="text-sm text-gray-500 mt-1">Hesabınıza daxil olun və sifarişlərinizi idarə edin</p>
                                        <button
                                            type="button"
                                            className="bg-transparent border border-gray-300 hover:border-black rounded px-4 py-2 mt-4 text-sm text-black"
                                        >
                                            GİRİŞ / QEYDİYYAT
                                        </button>
                                        <hr className="border-b-0 my-4" />
                                        <ul className="space-y-1.5">
                                            <li><Link to="/orders" className="text-sm text-gray-500 hover:text-black">Sifarişlər</Link></li>
                                            <li><Link to="/wishlist" className="text-sm text-gray-500 hover:text-black">İstək Siyahısı</Link></li>
                                            <li><Link to="/gift-cards" className="text-sm text-gray-500 hover:text-black">Hədiyyə Kartları</Link></li>
                                            <li><Link to="/contact" className="text-sm text-gray-500 hover:text-black">Əlaqə</Link></li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* ✅ Səbət */}
                            <div className="relative">
                                <GiShoppingCart className="text-2xl text-white cursor-pointer hover:text-gray-300" onClick={() => setOpensebet(true)} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
                            </div>

                            {/* ✅ Sifariş Et */}
                            <Link to="/order" className="hidden xl:block bg-[#5A3D2B] hover:bg-white hover:text-[#5A3D2B] text-white text-base font-medium px-4 py-2 rounded-md transition duration-300">
                                Sifariş et
                            </Link>

                            {/* ✅ Mobil Menyu Açma */}
                            <IoMenu className="xl:hidden text-2xl text-white cursor-pointer" onClick={toggleMenu} />
                        </div>
                    </div>
                </div>
            </header>

            {/* 📌 Səbət */}
            <Cart opensebet={opensebet} setOpensebet={setOpensebet} />
        </>
    );
}

export default Header;
