import React, { useEffect, useState } from 'react';
import logo from '../../assets/Amore.png';
import music from '../../assets/music.png';
import Cart from '../Main/Cart';
import { Link } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { IoMenu, IoClose } from 'react-icons/io5';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sebet, setSebet] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen]);

    return (
        <>
            {/* 📌 Banner (Mobil və Desktop üçün fix edilmişdir) */}
            <div className={`fixed top-0  left-0 w-full bg-[#EADDD5]  text-black px-4 py-3 flex flex-row md:flex-row items-center justify-center text-center rounded font-[sans-serif] gap-2 md:gap-4 z-50`}>
                <img src={music} alt="Music" className="w-[25px] h-[25px] md:w-[40px] md:h-[40px] object-cover" />
                <p className="text-xs md:text-sm lg:text-base">Music name</p>
                <div className="mt-2 md:mt-0">
                    <button type="button" className="bg-white text-black py-2 px-4 md:py-2.5 md:px-5 rounded text-xs md:text-sm hover:underline">
                        Bu aya özəl İlk sifarişi verənlərə 40% endirim ⇒ Pulsuz Çatdırılma
                    </button>
                </div>
            </div>

            {/* 📌 Fixed Header (Banner ilə birlikdə sabit qalır) */}
            <header className={`fixed top-[60px] h-auto left-0 w-full bg-[#7a461f] shadow-lg z-50 transition-all duration-300`}>
            <div className="container mx-auto max-w-screen-xl px-6">
    <div className="flex items-center justify-between py-3">
        
        {/* ✅ Logo (Daha balanslı ölçü) */}
        <Link to={"/"} className="flex items-center">
            <img src={logo} alt="Logo" className="h-[60px] w-[90px] xl:w-[150px] 2xl:w-[150px] object-cover" />
        </Link>

        {/* ✅ Desktop Menü (Sol tərəfdə) */}
        <nav className="hidden xl:flex items-center gap-6">
            <Link to="/s" className="text-white text-base font-medium hover:text-gray-300 transition">Lokasiyalar</Link>
            <Link to="/about" className="text-white text-base font-medium hover:text-gray-300 transition">Haqqımızda</Link>
            <Link to="/teklif" className="text-white text-base font-medium hover:text-gray-300 transition">Bizə təklif göndər</Link>
            <Link to="/contact" className="text-white text-base font-medium hover:text-gray-300 transition">Əlaqə</Link>
        </nav>

        {/* ✅ Sağ Tərəf */}
        <div className="flex items-center gap-4">
            {/* İstifadəçi İkonu */}
            <i className="fa-regular fa-user text-white text-xl cursor-pointer hover:text-gray-300"></i>

            {/* ✅ Səbət */}
            <div className="relative">
                <GiShoppingCart className="text-2xl text-white cursor-pointer hover:text-gray-300" onClick={() => setSebet(true)} />
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


                {/* 📌 Mobil Menyu (Banner ilə birlikdə görünür) */}
                <div className={`fixed top-[0px] right-0 w-[250px] h-full bg-[#7a461f] text-white transform transition-transform duration-300 z-50 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-lg font-semibold">Menyu</h2>
                        <IoClose onClick={toggleMenu} className="text-3xl cursor-pointer" />
                    </div>
                    <ul className="flex flex-col space-y-4 p-4">
                        <li><Link to="/" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>Ana Səhifə</Link></li>
                        <li><Link to="/services" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>Xidmətlər</Link></li>
                        <li><Link to="/about" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>Haqqımızda</Link></li>
                        <li><Link to="/contact" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>Əlaqə</Link></li>
                    </ul>
                </div>

                {/* 📌 Background Overlay (Menyunu açanda fon qaralır) */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleMenu}></div>
                )}
            </header>

            {/* 📌 Səbət */}
            <Cart sebet={sebet} setSebet={setSebet} />
        </>
    );
}

export default Header;
