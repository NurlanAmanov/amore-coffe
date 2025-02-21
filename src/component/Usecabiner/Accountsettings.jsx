import React, { useState, useEffect } from "react";

function AccountInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // LocalStorage-dan istifadəçi məlumatlarını oxumaq
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Yalnız istifadəçi login olduqda və token mövcud olduqda API çağırışı edilir
    if (user && user.email && user.token) {
      setLoading(true);
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`https://finalprojectt-001-site1.jtempurl.com/api/Auth/${user.email}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`, // Token başlığı ilə
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            console.log("API-dən gələn məlumat:", data); // Konsola çıxar
            setUserInfo(data);
          } else {
            throw new Error('Məlumatları çəkmək mümkün olmadı.');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserInfo();
    }
  }, [user]); // user dəyişdikdə çağırılır

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">İstifadəçi Məlumatları</h2>
      {loading ? (
        <p className="text-gray-500">Məlumatlar yüklənir...</p>
      ) : userInfo ? (
        <div className="space-y-2">
          <p><strong>Ad:</strong> {userInfo.name}</p>
          <p><strong>Soyad:</strong> {userInfo.surName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>İstifadəçi Adı:</strong> {userInfo.userName}</p>

          {/* Promokodlar */}
          {userInfo.userPromocodes && userInfo.userPromocodes.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mt-4">Promokodlar</h3>
              <ul>
                {userInfo.userPromocodes.map((promo) => (
                  <li key={promo.id} className="mt-2">
                    <p><strong>Promokod:</strong> {promo.promocode.code}</p>
                    <p><strong>Endirim Faizi:</strong> {promo.promocode.discountPercentage}%</p>
                    <p><strong>Bitmə Tarixi:</strong> {new Date(promo.promocode.expirationDate).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">İstifadəçi məlumatları yoxdur.</p>
      )}
    </div>
  );
}

export default AccountInfo;
