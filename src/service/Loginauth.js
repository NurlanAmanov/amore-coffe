import axios from "axios";

const BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api";

// Axios instance yaradılır (Bearer Token əlavə edir)
const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Sorğulara avtomatik Bearer Token əlavə edirik
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("🔑 Authorization Header:", config.headers.Authorization); // ✅ Debug üçün log əlavə edirik
    }

    return config;
});

export const loginUser = async (formData) => {
    try {
        console.log("📤 Göndərilən məlumatlar:", formData);

        const formDataToSend = new FormData();
        formDataToSend.append("UserNameOrEmail", formData.UserNameOrEmail);
        formDataToSend.append("Password", formData.Password);

        console.log("📦 Göndərilən FormData:", Object.fromEntries(formDataToSend.entries()));

        // API sorğusu
        const response = await apiClient.post('/Auth/Login', formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: "text", // 🔥 JSON yox, düz mətn kimi oxu
        });

        console.log("✅ Login uğurludur (text formatında cavab):", response.data);

        return response.data; // JSON çevirmirik
    } catch (error) {
        console.error("❌ Login xətası:", error.response?.data);
        throw error.response?.data || "Giriş zamanı xəta baş verdi!";
    }
};



// Çıxış funksiyası
export const logoutUser = () => {
    localStorage.removeItem("token");
    console.log("🚪 Çıxış edildi, token silindi.");
    window.location.reload(); // Çıxışdan sonra səhifəni yeniləyirik
};

export default apiClient;
