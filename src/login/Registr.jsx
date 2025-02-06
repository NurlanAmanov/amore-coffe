

function RegisterPage() {
  return (
  <section className='py-[90px] bg-[#efe6dd]'>
      <div className="bg-white mt-[60px] shadow-lg p-6 rounded w-[90%] mx-auto  transition-opacity duration-300 relative">

    <div className="text-center mb-6">
      <h2 className="text-gray-800 text-2xl font-bold">Amore Coffee Qeydiyyat</h2>
      <h4 className="text-gray-600 text-base mt-2">Hesabınızı yaradın</h4>
    </div>
    <form className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="text-gray-600 text-sm mb-2 block">Ad</label>
          <input name="name" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Adınızı daxil edin" />
        </div>
        <div>
          <label className="text-gray-600 text-sm mb-2 block">Soyad</label>
          <input name="lname" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Soyadınızı daxil edin" />
        </div>
        <div>
          <label className="text-gray-600 text-sm mb-2 block">E-mail</label>
          <input name="email" type="email" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="E-mailinizi daxil edin" />
        </div>
        <div>
          <label className="text-gray-600 text-sm mb-2 block">Mobil nömrə</label>
          <input name="number" type="number" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Mobil nömrənizi daxil edin" />
        </div>
        <div>
          <label className="text-gray-600 text-sm mb-2 block">Şifrə</label>
          <input name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Şifrənizi daxil edin" />
        </div>
        <div>
          <label className="text-gray-600 text-sm mb-2 block">Şifrəni təsdiqləyin</label>
          <input name="cpassword" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Şifrənizi təsdiqləyin" />
        </div>
      </div>
      <div className="mt-8">
        <button type="button" className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
          Qeydiyyatdan keç
        </button>
      </div>
    </form>
  </div>
  </section>
  );
}

export default RegisterPage;
