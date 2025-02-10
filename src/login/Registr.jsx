import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Qeydiyyatdan sonra yönləndirmək üçün

function RegisterPage() {
  const navigate = useNavigate(); // Router yönləndirmə funksiyası
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    userName: "", // Yeni sahə əlavə olundu
    email: "",
    dob: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  // Input dəyişikliklərini izləyirik
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Qeydiyyat üçün API sorğusu
  const handleRegister = async (e) => {
    e.preventDefault(); // Formun avtomatik göndərilməsinin qarşısını alır

    if (formData.password !== formData.cpassword) {
        alert("Şifrələr uyğun gəlmir!");
        return;
    }

    // Tarixi string formatında göndəririk
    const formattedDate = formData.dob ? formData.dob.toString() : "";

    try {
        const response = await axios.post(
            "https://finalprojectt-001-site1.jtempurl.com/api/Auth/Register",
            {
                Name: formData.name,
                Surname: formData.lname,
                UserName: formData.userName,
                Email: formData.email,
                DateOfBirth: formattedDate, // Tarixi `YYYY-MM-DD` formatında göndəririk
                Gender: formData.gender,
                Password: formData.password,
                ConfirmPassword: formData.cpassword,
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("Qeydiyyat uğurlu oldu:", response.data);
        alert("Qeydiyyat uğurla tamamlandı!");
        navigate("/login"); // Uğurlu qeydiyyatdan sonra login səhifəsinə yönləndir
    } catch (error) {
        console.error("Qeydiyyat zamanı xəta:", error.response?.data || error.message);
        alert("Qeydiyyat zamanı xəta baş verdi!");

        if (error.response?.data?.errors) {
            console.log("Backend Validation Errors:", error.response.data.errors);
        }
    }
};


  return (
    <section className="py-[90px] bg-[#efe6dd]">
      <div className="bg-white mt-[60px] shadow-lg p-6 rounded w-[90%] mx-auto transition-opacity duration-300 relative">
        <div className="text-center mb-6">
          <h2 className="text-gray-800 text-2xl font-bold">Amore Coffee Qeydiyyat</h2>
          <h4 className="text-gray-600 text-base mt-2">Hesabınızı yaradın</h4>
        </div>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Ad</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Adınızı daxil edin"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Soyad</label>
              <input
                name="lname"
                type="text"
                value={formData.lname}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Soyadınızı daxil edin"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">İstifadəçi adı (Username)</label>
              <input
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="İstifadəçi adınızı daxil edin"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">E-mail</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="E-mailinizi daxil edin"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Doğum tarixi</label>
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Cinsiyyət</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                required
              >
                <option value="">Seçin</option>
                <option value="Kişi">Kişi</option>
                <option value="Qadın">Qadın</option>
              </select>
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Şifrə</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Şifrənizi daxil edin"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Şifrəni təsdiqləyin</label>
              <input
                name="cpassword"
                type="password"
                value={formData.cpassword}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Şifrənizi təsdiqləyin"
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <button type="submit" className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Qeydiyyatdan keç
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
