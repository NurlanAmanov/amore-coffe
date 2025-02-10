import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext"; // Context API import edilir
import { useNavigate } from "react-router-dom"; // Qeydiyyatdan sonra yönləndirmək üçün

function RegisterPage() {
    const { register } = useContext(AuthContext); // Context-dən register funksiyasını götürürük
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        surname: "", // Düzgün adlandırma
        userName: "",
        email: "",
        dateOfBirth: "", // Tarix düzəldilib
        gender: "",
        password: "",
        confirmPassword: "",
    });

    // Input dəyişikliklərini izləyirik
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === "dateOfBirth") {
            console.log("Seçilmiş Tarix:", e.target.value); // Tarixi konsolda görmək üçün
        }
    };

    // Qeydiyyat üçün API sorğusu
    const handleSubmit = async (e) => {
        e.preventDefault(); // Formun avtomatik göndərilməsinin qarşısını alır

        if (formData.password !== formData.confirmPassword) {
            alert("Şifrələr uyğun gəlmir!");
            return;
        }

        // Tarixi `YYYY-MM-DD` formatına çevirmək (əgər input boş deyilsə)
        const formattedDate = formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split("T")[0] : "";

        const userData = {
            Name: formData.name.trim(),
            Surname: formData.surname.trim(),
            UserName: formData.userName.trim(),
            Email: formData.email.trim(),
            DateOfBirth: formattedDate, // Tarixi uyğun formatda göndəririk
            Gender: formData.gender,
            Password: formData.password,
            ConfirmPassword: formData.confirmPassword,
        };

        await register(userData);
        navigate("/login"); // Uğurlu qeydiyyatdan sonra login səhifəsinə yönləndir
    };

    return (
        <section className="py-[90px] bg-[#efe6dd]">
            <div className="bg-white mt-[60px] shadow-lg p-6 rounded w-[90%] mx-auto transition-opacity duration-300 relative">
                <div className="text-center mb-6">
                    <h2 className="text-gray-800 text-2xl font-bold">Amore Coffee Qeydiyyat</h2>
                    <h4 className="text-gray-600 text-base mt-2">Hesabınızı yaradın</h4>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Ad" required />
                        <input name="surname" type="text" value={formData.surname} onChange={handleChange} placeholder="Soyad" required />
                        <input name="userName" type="text" value={formData.userName} onChange={handleChange} placeholder="İstifadəçi adı" required />
                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
                        <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Cinsiyyət</option>
                            <option value="Kişi">Kişi</option>
                            <option value="Qadın">Qadın</option>
                        </select>
                        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Şifrə" required />
                        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Şifrəni təsdiqləyin" required />
                    </div>
                    <button type="submit">Qeydiyyatdan keç</button>
                </form>
            </div>
        </section>
    );
}

export default RegisterPage;
