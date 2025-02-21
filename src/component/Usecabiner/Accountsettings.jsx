import React, { useState, useEffect } from "react";

function AccountInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [promocodes, setPromocodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // LocalStorage-dan istifadəçi məlumatlarını oxumaq
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Yalnız istifadəçi login olduqda və token mövcud olduqda API çağırışı edilir
    if (user && user.email && user.token) {
      setLoading(true);
      setError(null); // Hər yeni çağırışda əvvəlki səhvi sıfırlamaq

      const fetchData = async () => {
        try {
          // İki API çağırışını paralel şəkildə yerinə yetir
          const [userResponse, promocodesResponse] = await Promise.all([
            fetch(`https://finalprojectt-001-site1.jtempurl.com/api/Auth?email=${user.email}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
              }
            }),
            fetch(`https://finalprojectt-001-site1.jtempurl.com/api/Auth/Login?email=${user.email}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
              }
            })
          ]);

          // İstifadəçi məlumatlarını çək
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserInfo(userData);
          } else {
            throw new Error('İstifadəçi məlumatları çəkilmədi.');
          }

          // Promokod məlumatlarını çək
          if (promocodesResponse.ok) {
            const promocodesData = await promocodesResponse.json();
            setPromocodes(promocodesData);
          } else {
            throw new Error('Promokod məlumatları çəkilmədi.');
          }
        } catch (error) {
          setError(error.message); // Səhv mesajını idarə et
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setError("İstifadəçi məlumatları tapılmadı.");
      setLoading(false);
    }
  }, [user]); // user dəyişdikdə çağırılır

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">İstifadəçi Məlumatları</h2>
      {loading ? (
        <p className="text-gray-500">Məlumatlar yüklənir...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p> // Səhv mesajını göstərin
      ) : userInfo ? (
        <div className="space-y-2">
          <p><strong>Ad:</strong> {userInfo.name}</p>
          <p><strong>Soyad:</strong> {userInfo.surName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>İstifadəçi Adı:</strong> {userInfo.userName}</p>

          {/* Promokodlar */}
          {promocodes.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mt-4">Promokodlar</h3>
              <ul>
                {promocodes.map((promo) => (
                  <li key={promo.id} className="mt-2">
                    <p><strong>Promokod:</strong> {promo.code}</p>
                    <p><strong>Endirim Faizi:</strong> {promo.discountPercentage}%</p>
                    <p><strong>Bitmə Tarixi:</strong> {new Date(promo.expirationDate).toLocaleDateString()}</p>
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
