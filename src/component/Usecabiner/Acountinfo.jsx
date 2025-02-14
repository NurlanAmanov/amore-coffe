import React from "react";
import { useNavigate } from "react-router-dom"; // Yönləndirmə üçün

import { useAuth } from "../../Context/Authlogin";

function Acountinfo() {
    const { logout } = useAuth(); // logout funksiyasını əldə et
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Çıxışı icra et
        navigate("/"); // Ana səhifəyə yönləndir
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md w-64">
            <button 
                onClick={handleLogout} 
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
                Çıxış
            </button>
        </div>
    );
}

export default Acountinfo;
