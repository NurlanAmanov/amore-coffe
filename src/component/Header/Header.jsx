import React, { useContext, useEffect, useState } from 'react';
import Cart from '../Main/Cart';
import spotfy from '../../assets/icon/spotify.png';
import { Link, useNavigate } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaUser } from "react-icons/fa";
import { DATA } from '../../Context/Datacontext';
import Loginpage from '../../login/Loginpage';
import { BASKET } from '../../Context/BasketContext';
import { useAuth } from '../../Context/Authlogin';

function Header() {
    const { user } = useAuth();
    const { banner, logo } = useContext(DATA);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [opensebet, setOpensebet] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false); // Header-in sabit olub-olmamasını izləyirik
    const { sebet } = useContext(BASKET);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleProfileClick = () => {
        if (user) {
            navigate("/cabinet");
        } else {
            setIsProfileOpen(true);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) { 
                setIsFixed(true); 
            } else {
                setIsFixed(false); 
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen || isProfileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen, isProfileOpen]);

    return (
        <>
            {banner && banner.map((item, i) => (
                <div key={i} className="flex flex-row items-center justify-between bg-[#242434] text-white px-6 h-[60px] py-3 gap-4 max-sm:gap-2 text-center">
                    <img src={spotfy} className="w-[45px] h-[45px] object-contain max-sm:w-[40px] max-sm:h-[40px]" />
                    <p className="text-base max-sm:text-sm max-sm:px-4">{item.description}</p>
                </div>
            ))}
            <header className={`w-full bg-[#f1ece9] shadow-lg z-[40] transition-all duration-300 ${isFixed ? 'fixed top-0 left-0' : 'absolute'} ${banner ? 'top-[60px]' : 'top-0'}`}>
                <div className="container mx-auto max-w-screen-xl px-6">
                    <div className="flex items-center justify-between w-full mx-auto py-3">
                        {/* Sol tərəfdə menyu */}
                        <nav className="hidden xl:flex items-center gap-6">
                            <Link to="/lokasiya" className="text-black text-base font-medium transition">Lokasiyalar</Link>
                            <Link to="/about" className="text-black text-base font-medium transition">Haqqımızda</Link>
                            <Link to="/teklif" className="text-black text-base font-medium transition">Bizə təklif göndər</Link>
                            <Link to="/music" className="text-black text-base font-medium transition">music</Link>
                        </nav>

                        {/* Orta hissədə logo */}
                        <Link to="/" className="flex items-center justify-center xl:translate-x-[-50px]">
                            {logo.map((item) => (
                                <img
                                    src={`https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                                    alt="Logo"
                                    className="h-[60px] w-[90px] xl:w-[150px] object-cover"
                                />
                            ))}
                        </Link>

                        {/* Sağ tərəfdə Sifariş et, Profil, Səbət */}
                        <div className="flex items-center gap-4">
                            <Link to={'Allcategory'} className='border flex rounded-md items-center hover:bg-[#de9f69] hover:text-white duration-300 cursor-pointer justify-center w-[60%] border-[#de9f69] text-center py-2 px-2 mx-auto'>
                                Sifariş et
                            </Link>

                            {/* Profil düyməsi */}
                            <div id="profile-dropdown" className="relative">
                                <FaUser
                                    className="text-black text-xl cursor-pointer"
                                    onClick={handleProfileClick}
                                />
                            </div>

                            {/* Səbət düyməsi */}
                            <div className="relative">
                                <GiShoppingCart className="text-2xl text-black cursor-pointer"
                                    onClick={() => setOpensebet(true)} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {sebet.length}
                                </span>
                            </div>

                            {/* Mobil menyu açma düyməsi */}
                            <IoMenu className="xl:hidden text-2xl text-black cursor-pointer" onClick={toggleMenu} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Sağdan Açılan Mobil Menyu */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 
                ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`bg-[#7a461f] w-3/4 sm:w-1/2 md:w-1/3 h-full p-6 text-black flex flex-col space-y-6 transition-transform 
                    duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <IoClose className="text-3xl cursor-pointer self-end" onClick={toggleMenu} />
                    <Link to="/" className="text-lg font-medium" onClick={toggleMenu}>Lokasiyalar</Link>
                    <Link to="/about" className="text-lg font-medium" onClick={toggleMenu}>Haqqımızda</Link>
                    <Link to="/teklif" className="text-lg font-medium" onClick={toggleMenu}>Bizə təklif göndər</Link>
                </div>
            </div>

            {/* Login Modal (Əgər istifadəçi daxil olmayıbsa açılacaq) */}
            {!user && isProfileOpen && <Loginpage toggleProfile={() => setIsProfileOpen(false)} />}
            <Cart opensebet={opensebet} setOpensebet={setOpensebet} />
        </>
    );
}

export default Header;
