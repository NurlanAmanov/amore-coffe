import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authlogin";
import Sifaris from "./Sifaris";
import Acountinfo from "./Accountsettings";

// Bölmə komponentləri
// import Favorites from "./Favorites";
// import PromoCodes from "./PromoCodes";
// import Notifications from "./Notifications";


function Cabinet() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hesab"); // Default: "Hesabım"

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Seçim düyməsinə basanda hansı komponentin göstərilməsini müəyyən edirik
  const renderComponent = () => {
    switch (activeTab) {
    
      case "sifarishler":
        return <Sifaris />;
      case "promokodlar":
        return <PromoCodes />;
      case "sevimliler":
        return <Favorites />;
      case "bildirishler":
        return <Notifications />;
      default:
        return <Acountinfo />;
    }
  };

  return (
    <div className="mx-4 py-[130px] min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="border-b py-6 text-4xl font-semibold">Şəxsi kabinet</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        {/* Mobil üçün seçim menyusu */}
        <div className="relative my-4 w-56 sm:hidden">
          <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
          <label htmlhtmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">
            Accounts
          </label>
          <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
            <li onClick={() => setActiveTab("hesabim")} className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Hesabım</li>
            <li onClick={() => setActiveTab("sifarishler")} className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Sifarişlərim</li>
            <li onClick={() => setActiveTab("promokodlar")} className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Promokodlarım</li>
            <li onClick={() => setActiveTab("sevimliler")} className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Sevimlilər</li>
            <li onClick={() => setActiveTab("bildirishler")} className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Bildirişlər</li>
            <li onClick={handleLogout} className="cursor-pointer px-3 py-2 text-sm text-red-600 hover:bg-red-700 hover:text-white">Çıxış</li>
          </ul>
        </div>

        {/* Desktop üçün menyu */}
        <div className="col-span-2 hidden sm:block">
          <ul>
            <li onClick={() => setActiveTab("hesab")} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === "hesab" ? "border-l-blue-700 text-blue-700" : "border-transparent hover:border-l-blue-700 hover:text-blue-700"}`}>
              Hesabım
            </li>
            <li onClick={() => setActiveTab("sifarishler")} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === "sifarishler" ? "border-l-blue-700 text-blue-700" : "border-transparent hover:border-l-blue-700 hover:text-blue-700"}`}>
              Sifarişlərim
            </li>
            <li onClick={() => setActiveTab("promokodlar")} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === "promokodlar" ? "border-l-blue-700 text-blue-700" : "border-transparent hover:border-l-blue-700 hover:text-blue-700"}`}>
              Promokodlarım
            </li>
            <li onClick={() => setActiveTab("sevimliler")} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === "sevimliler" ? "border-l-blue-700 text-blue-700" : "border-transparent hover:border-l-blue-700 hover:text-blue-700"}`}>
              Sevimlilər
            </li>
            <li onClick={() => setActiveTab("bildirishler")} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === "bildirishler" ? "border-l-blue-700 text-blue-700" : "border-transparent hover:border-l-blue-700 hover:text-blue-700"}`}>
              Bildirişlər
            </li>
            <li onClick={handleLogout} className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold text-red-600 transition hover:border-l-red-700 hover:text-red-700">
              Çıxış
            </li>
          </ul>
        </div>

        {/* Dinamik komponentlər burada göstərilir */}
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
     
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Cabinet;
