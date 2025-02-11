import axios from "axios";

const BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api";

// 🔥 Axios instance (Avtomatik Bearer Token əlavə edir)
const apiClient = axios.create({
    baseURL: BASE_URL,
});

// 🔥 API-yə hər sorğu göndərəndə Bearer tokeni əlavə et
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("🔑 Authorization Header:", config.headers.Authorization); // ✅ Debug üçün log əlavə edildi
    }

    return config;
});

// ✅ **Düzgün `multipart/form-data` login sorğusu:**
export const loginUser = async (formData) => {
    try {
        console.log("📤 Göndərilən məlumatlar:", formData);

        // ✅ `multipart/form-data` üçün `FormData` obyekti yaradılır
        const formDataToSend = new FormData();
        formDataToSend.append("UserNameOrEmail", formData.UserNameOrEmail);
        formDataToSend.append("Password", formData.Password);

        console.log("📦 Göndərilən FormData:", Object.fromEntries(formDataToSend.entries()));

        const response = await apiClient.post(`/Auth/Login`, formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("✅ Login cavabı:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Login xətası:", error.response?.data || "Bilinməyən xəta baş verdi!");
        throw error.response?.data || "Giriş zamanı xəta baş verdi!";
    }
};

// 🔥 LOGOUT FUNKSİYASI (Tokeni silir və səhifəni yeniləyir)
export const logoutUser = () => {
    localStorage.removeItem("token");
    console.log("🚪 Çıxış edildi, token silindi.");
    window.location.reload(); // 🔄 Logout edildikdən sonra səhifəni yenilə
};

export default apiClient;
