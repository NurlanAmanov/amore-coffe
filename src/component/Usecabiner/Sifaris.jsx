import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sifaris() {
    const [userProfile, setUserProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Tokeni localStorage-dan götürürük
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!token) {
                setError('İstifadəçi token tapılmadı.');
                setLoading(false);
                return;
            }

            try {
                // 🔹 İstifadəçi profilini API-dan alırıq
                const profileResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Profile Data:', profileResponse.data);
                
                if (profileResponse.data && profileResponse.data.id) {
                    setUserProfile(profileResponse.data);
                    fetchOrders(profileResponse.data.id); // 🔹 İstifadəçi ID-sinə əsasən sifarişləri yükləyirik
                } else {
                    throw new Error('Profil məlumatları tapılmadı.');
                }
            } catch (error) {
                console.error('İstifadəçi profilini yükləmək mümkün olmadı:', error);
                setError('İstifadəçi profilini yükləmək mümkün olmadı');
                setLoading(false);
            }
        };

        const fetchOrders = async (userId) => {
          try {
              const response = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Order/${userId}`, {
                  headers: { 'Authorization': `Bearer ${token}` }
              });
      
              console.log("Orders for UserID:", userId, response.data);
              
              if (!response.data || response.data.length === 0) {
                  console.log("Bu istifadəçi üçün sifariş tapılmadı.");
              }
      
              setOrders(response.data);
          } catch (error) {
              console.error("Sifarişləri yükləmək mümkün olmadı:", error);
          }
      };
      

        fetchUserProfile();
    }, [token]);

    if (loading) {
        return <p>Məlumatlar yüklənir...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="overflow-x-auto">
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">Sizin heç bir sifarişiniz yoxdur.</p>
            ) : (
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-black">Məhsullar</th>
                            <th className="p-4 text-left text-sm font-semibold text-black">Qiymət</th>
                            <th className="p-4 text-left text-sm font-semibold text-black">Miqdar</th>
                            <th className="p-4 text-left text-sm font-semibold text-black">Ölçü</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((item, index) => (
                            <tr key={index}>
                                <td className="p-4 text-sm flex items-center">
                                    <img src={item.imgUrl} alt={item.title} className="w-10 h-10 mr-4 rounded" />
                                    {item.title}
                                </td>
                                <td className="p-4 text-sm">{item.price} ₼</td>
                                <td className="p-4 text-sm">{item.quantity}</td>
                                <td className="p-4 text-sm">{item.size || 'Seçilməyib'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Sifaris;
