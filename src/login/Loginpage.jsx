import React from 'react';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

function LoginPage({ toggleProfile }) {
  const handleBackdropClick = (e) => {
    // Əgər klik edilən yer modalın özüdürsə, bağlama.
    if (e.target.id === "modal-backdrop") {
      toggleProfile();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]"
      onClick={handleBackdropClick} // Yalnız backdrop klik olunanda işləyəcək
    >
      <div className="bg-white shadow-lg p-6 rounded w-[90%] mx-auto xl:w-[450px] transition-opacity duration-300 relative"
        onClick={(e) => e.stopPropagation()} // Modalın içində klik edildikdə bağlanmasın
      >
        <span className="flex items-center justify-between w-full mb-4">
          <h3 className="text-gray-800 text-3xl font-bold">Daxil olun</h3>
          <MdClose onClick={toggleProfile} className="text-[30px] cursor-pointer font-[500]" />
        </span>
        <form className="space-y-4">
          <div className="mb-8">
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              <span className="font-bold text-[#4A2C2A]">Amore Coffee – Qəhvə Həzzinin Zirvəsi!</span> Hesabınıza daxil olun və eksklüziv təkliflərdən yararlanın.
            </p>
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">E-mail:</label>
            <input name="username" type="email" required className="w-full text-sm text-gray-800 border border-gray-300 p-3 rounded-lg outline-blue-600" placeholder="E-mailinizi daxil edin" />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Şifrə</label>
            <input name="password" type="password" required className="w-full text-sm text-gray-800 border border-gray-300 p-3 rounded-lg outline-blue-600" placeholder="Şifrənizi daxil edin" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">Məni xatırla</label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:underline font-semibold">Şifrəni unutmusunuz?</a>
            </div>
          </div>
          <div className="mt-8">
            <button type="button" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Daxil ol</button>
          </div>
          <p className="text-sm mt-8 text-center text-gray-500">Hesabınız yoxdur? <Link to={"/qeydiyyat"} className="text-blue-600 font-semibold hover:underline">Qeydiyyatdan keçin</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
