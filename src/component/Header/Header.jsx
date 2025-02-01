import React, { useEffect, useState } from 'react'
import logo from '../../assets/logos.png'
import music from '../../assets/music.png'
import Cart from '../Main/Cart'
import { Link } from 'react-router-dom'
import { GiShoppingCart } from 'react-icons/gi'

function Header() {
    const [bars, setBars] = useState()
    const [sebet, setSebet] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

 
    const opensebet = () => {
        setSebet(true);
    };


    function openbars() {
        setBars(!bars)
    }
    function closbar() {
        setBars(!bars)
    }
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 10) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return (
        <>
        <div className="banner bg-[#EADDD5] w-full p-2 flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 md:gap-4">
  
  {/* Sol tərəfdəki musiqi ikon və adı */}
  <span className="flex items-center justify-center gap-2 md:gap-4 w-full md:w-[10%]">
    <img src={music} alt="Music" className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] object-cover" />
    <p className="text-sm md:text-base">Music name</p>
  </span>

  {/* Endirim və mesaj hissəsi */}
  <span className="catdirma w-full md:w-[50%] text-center md:text-left">
    <p className="text-sm md:text-xl font-normal">
      Bu aya özəl İlk sifarişi verənlərə <b>40% endirim</b> ⇒ <b>Pulsuz Çatdırılma</b>
    </p>
  </span>

</div>

<header className={`relative ${isScrolled ? "fixed top-0 left-0 w-full shadow-lg bg-[#7a461f] z-50 transition-all duration-300" : ""}`}>
      <nav>
        <div className="mobile-menu relative overflow-hidden xl:hidden 2xl:hidden block bg-[#7a461f]">
          <div className="mobilebar flex items-center justify-between p-4">
            <Link to={"/"} className="w-[130px]">
              <img src={logo} className="w-full h-[60px] object-cover" alt="Logo" />
            </Link>
            <div className="bars gap-4 flex items-center justify-center">
            <i className="fa-regular fa-user text-white text-xl"></i>
              
              <GiShoppingCart className="text-4xl font-[500] text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Menü */}
      <div className="bg-[#7a461f] border-gray-200 px-4 lg:px-6 py-2.5 xl:block 2xl:block hidden">
        
        <div className="head-content p-3 flex items-center justify-between">
          <div className="menu">
            <ul className="flex items-center justify-around gap-5">
              <li>
                <Link to={"/s"} className="text-[#F7F7F7] text-[18px] font-[500]">
                  Lokasiyalar
                </Link>
              </li>
              <li>
                <Link to={"/Haqqimizda"} className="text-[#F7F7F7] text-[15px] font-[500]">
                  Haqqımızda
                </Link>
              </li>
              <li>
                <Link to={"/teklif"} className="text-[#F7F7F7] text-[15px] font-[500]">
                  Bizə təklif göndər
                </Link>
              </li>
              <li>
                <Link to={"/Elaqe"} className="text-[#F7F7F7] text-[15px] font-[500]">
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          <div className="logo-des">
            <p className="text-3xl text-white">Amore</p>
          </div>

          <div className="sebet-acount flex items-center justify-around gap-5">
            <span>
              <Link to={"/sa"} className="bg-[#5A3D2B] p-3 text-[15px] font-[500] text-white rounded-md">
                Sifariş et
              </Link>
            </span>
            <span className="kabinet flex items-center justify-center gap-3">
              <i className="fa-regular fa-user text-white text-xl"></i>
              <Link to={"/cabinet"} className="text-white text-[15px] font-[500]">
                Daxil ol
              </Link>
            </span>
            <span className="cart flex items-center justify-center gap-4">
              <GiShoppingCart className="text-4xl font-[500] text-white" />
              <p className="text-[15px] font-[500] text-white">Səbətim</p>
            </span>
          </div>
        </div>
      </div>
    </header>
            <Cart sebet={sebet} setSebet={setSebet} />

        </>
    )
}

export default Header