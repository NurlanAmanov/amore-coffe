import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/Authlogin";

function AccountInfo() {
  const { user } = useAuth(); // Login olmuş istifadəçinin məlumatlarını əldə et
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surName: '',
    userName: '',
  });

  useEffect(() => {
    if (user && user.email) {
      setLoading(true);
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`https://finalprojectt-001-site1.jtempurl.com/api/Auth/${user.email}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
            setFormData({
              name: data.name,
              surName: data.surName,
              userName: data.userName,
            });
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
  }, [user]);

  const updateUserInfo = async (updatedData) => {
    try {
      const response = await fetch(`https://finalprojectt-001-site1.jtempurl.com/api/Auth/${user.email}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        alert('Məlumatlar uğurla yeniləndi!');
      } else {
        throw new Error('Yeniləmə uğursuz oldu.');
      }
    } catch (error) {
      console.error('Yeniləmə xətası:', error);
      alert('Yeniləmə zamanı xəta baş verdi.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">İstifadəçi Məlumatları</h2>
      {loading ? (
        <p className="text-gray-500">Məlumatlar yüklənir...</p>
      ) : userInfo ? (
        <div className="space-y-2">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Ad:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Soyad:</label>
                <input
                  type="text"
                  name="surName"
                  value={formData.surName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">İstifadəçi Adı:</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Yadda Saxla
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="ml-2 bg-gray-500 text-white p-2 rounded"
              >
                Ləğv et
              </button>
            </form>
          ) : (
            <>
              <p><strong>Ad:</strong> {userInfo.name}</p>
              <p><strong>Soyad:</strong> {userInfo.surName}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>İstifadəçi Adı:</strong> {userInfo.userName}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 text-white p-2 rounded mt-4"
              >
                Məlumatları Yenilə
              </button>
            </>
          )}
          {userInfo.userPromocodes && userInfo.userPromocodes.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mt-4">Promokodlar</h3>
              <ul>
                {userInfo.userPromocodes.map((promo) => (
                  <li key={promo.id}>
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