import React, { useState, useEffect } from "react";
import axios from "axios";

function AccountInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 LocalStorage-dan token götürmək
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("İstifadəçi token tapılmadı.");
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setUserInfo(response.data);
        } else {
          throw new Error("Profil məlumatları tapılmadı.");
        }
      } catch (error) {
        setError("Məlumatlar yüklənərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <div className=" w-full bg-white shadow-md rounded-lg  p-4 mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">İstifadəçi Məlumatları</h2>

      {/* 🔹 Yüklənmə və ya xəta mesajları */}
      {loading ? (
        <p className="text-gray-500 text-center">Məlumatlar yüklənir...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : userInfo ? (
        <div className="border border-gray-300 rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold">Ad:</td>
                <td className="p-2">{userInfo.name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Soyad:</td>
                <td className="p-2">{userInfo.surName}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Email:</td>
                <td className="p-2">{userInfo.email}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">İstifadəçi Adı:</td>
                <td className="p-2">{userInfo.userName}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">İstifadəçi ID:</td>
                <td className="p-2">{userInfo.id}</td>
              </tr>
            </tbody>
          </table>

          {/* 🔹 Promokodlar */}
          {userInfo.userPromocodes && userInfo.userPromocodes.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-lg font-semibold border-b pb-2">Promokodlar</h3>
              <table className="w-full text-left border-collapse mt-2">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="p-2">Kod</th>
                    <th className="p-2">Endirim (%)</th>
                    <th className="p-2">Bitmə Tarixi</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.userPromocodes.map((promo) => (
                    <tr key={promo.id} className="border-b">
                      <td className="p-2">{promo.promocode.code}</td>
                      <td className="p-2">{promo.promocode.discountPercentage}%</td>
                      <td className="p-2">{new Date(promo.promocode.expirationDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">Promokod yoxdur.</p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">İstifadəçi məlumatları mövcud deyil.</p>
      )}
    </div>
  );
}

export default AccountInfo;
