import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/Loginauth";


const AuthContextLogin = createContext();

export const CustomAuthProvider = ({ children }) => {  // ✅ Yeni ad: CustomAuthProvider
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token });
            console.log("✅ İstifadəçi daxil olub:", token);
        } else {
            console.warn("❗ Token tapılmadı, istifadəçi çıxış etmişdir.");
        }
    }, []);

    const login = async (formData) => {
        try {
            console.log("📤 Göndərilən məlumatlar:", formData);
            const data = await loginUser(formData);

            if (data.token) {
                localStorage.setItem("token", data.token);
                setUser({ token: data.token });
                console.log("🔑 Token yadda saxlandı:", data.token);
                navigate("/dashboard");
            } else {
                throw new Error("Token qaytarılmadı!");
            }
        } catch (error) {
            console.error("❌ Giriş zamanı xəta:", error.response?.data || "Bilinməyən xəta!");
            alert("Giriş zamanı xəta baş verdi!");
        }
    };

    const logout = () => {
        logoutUser();
        localStorage.removeItem("token");
        setUser(null);
        console.log("🚪 Çıxış edildi.");
        navigate("/login");
    };

    return (
        <AuthContextLogin.Provider value={{ user, login, logout }}>
            {children || <></>}
        </AuthContextLogin.Provider>
    );
};

// 🔥 `useAuth()` Hook-u
export const useAuth = () => {
    return useContext(AuthContext);
};
