import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        dob: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Şifrələr uyğun gəlmir!");
            return;
        }

        try {
            const form = new FormData();
            form.append("Name", formData.name);
            form.append("Surname", formData.surname);
            form.append("UserName", formData.userName);
            form.append("Email", formData.email);
            form.append("DateOfBirth", formData.dob);
            form.append("Gender", formData.gender);
            form.append("Password", formData.password);
            form.append("ConfirmPassword", formData.confirmPassword);

            const response = await axios.post(
                "https://finalprojectt-001-site1.jtempurl.com/api/Auth/Register",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Qeydiyyat uğurla tamamlandı!");
            navigate("/");
        } catch (error) {
            alert(`Xəta baş verdi: ${error.response?.data || "Bilinməyən xəta"}`);
        }
    };

    return (
        <section className="py-10 bg-gray-100 flex justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-center text-xl font-bold mb-4">Qeydiyyat</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <input
                        name="name"
                        type="text"
                        placeholder="Ad"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="surname"
                        type="text"
                        placeholder="Soyad"
                        value={formData.surname}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="userName"
                        type="text"
                        placeholder="İstifadəçi adı"
                        value={formData.userName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Cinsiyyət seçin</option>
                        <option value="Kişi">Kişi</option>
                        <option value="Qadın">Qadın</option>
                    </select>
                    <input
                        name="password"
                        type="password"
                        placeholder="Şifrə"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Şifrəni təsdiqləyin"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Qeydiyyatdan keç
                    </button>
                </form>
            </div>
        </section>
    );
}

export default RegisterPage;
