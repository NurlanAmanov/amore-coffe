import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const register = async (userData) => {
        try {
            const response = await axios.post(
                "https://finalprojectt-001-site1.jtempurl.com/api/Auth/Register",
                userData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("Qeydiyyat uğurlu oldu:", response.data);
            setUser(response.data);
            alert("Qeydiyyat uğurla tamamlandı!");
            navigate("/login");
        } catch (error) {
            console.error("Qeydiyyat zamanı xəta:", error.response?.data || error.message);
            alert("Qeydiyyat zamanı xəta baş verdi!");

            if (error.response?.data?.errors) {
                console.log("Backend Validation Errors:", error.response.data.errors);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, register }}>
            {children}
        </AuthContext.Provider>
    );
};
