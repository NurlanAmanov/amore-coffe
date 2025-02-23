import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASKET } from '../../Context/BasketContext';

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { sebet, basketRemove } = useContext(BASKET);
  
  const { totalPrice: initialTotalPrice = 0 } = location.state || {};

  const [userId, setUserId] = useState('');
  const [orders, setOrders] = useState([]); // ✅ İstifadəçinin sifarişlərini saxlayırıq
  const [promocode, setPromocode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [error, setError] = useState('');

  // **Forma üçün state**
  const [formData, setFormData] = useState({
    cvv: '',
    cardholderName: '',
    paymentMethod: 'Card',
    cardNumber: '',
    expDate: '',
    paymentToken: 'tok_visa',
  });

  // 🔹 **İstifadəçi məlumatlarını `Auth/profile` API-dən avtomatik çəkmək**
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data && response.data.id) {
          setUserId(response.data.id);
          console.log("✅ User ID uğurla tapıldı:", response.data.id);

          // 🔥 İstifadəçinin `order`-lərini çəkmək
          fetchUserOrders(response.data.id);

          // 🔥 Əgər `userPromocodes` varsa, promokodu avtomatik çəkmək
          if (response.data.userPromocodes?.length > 0) {
            const promo = response.data.userPromocodes[0].promocode;
            setPromocode(promo.code);
            applyPromoCode(promo.code); // ✅ Avtomatik tətbiq et
          }
        } else {
          throw new Error("İstifadəçi ID tapılmadı!");
        }
      } catch (error) {
        console.error("❌ İstifadəçi məlumatı yüklənmədi:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  // 🔹 **İstifadəçinin sifarişlərini (`orders`) API-dən çəkmək**
  const fetchUserOrders = async (userId) => {
    try {
      const response = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Order/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.length > 0) {
        setOrders(response.data); // ✅ Sifarişləri state-də saxlayırıq
        console.log("✅ Sifarişlər tapıldı:", response.data);
      } else {
        console.log("ℹ️ İstifadəçinin sifarişi yoxdur.");
        setOrders([]);
      }
    } catch (error) {
      console.error("❌ Sifarişlər yüklənmədi:", error.response?.data || error.message);
      setOrders([]);
    }
  };

  return (
    <div className='py-[160px]'>
      <h1>Sifariş Təsdiqi</h1>
      <p><strong>Əsas Qiymət:</strong> {initialTotalPrice.toFixed(2)} ₼</p>

      {/* 🔥 Promokod Giriş Yeri */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Promokod daxil edin</label>
        <input 
          type="text" 
          value={promocode} 
          onChange={(e) => setPromocode(e.target.value)} 
          className="w-full p-2 border rounded-md" 
          placeholder="Promokod" 
        />
        <button 
          onClick={() => applyPromoCode()} 
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Tətbiq et
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <p><strong>Endirim:</strong> {discount}%</p>
      <p><strong>Yekun Qiymət:</strong> {totalPrice.toFixed(2)} ₼</p>

      {/* 🔥 Sifarişlərin siyahısı */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Sizin Sifarişləriniz:</h2>
        {orders.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {orders.map((order, index) => (
              <li key={index} className="p-4 border rounded-md bg-gray-100">
                <p><strong>Sifariş ID:</strong> {order.id}</p>
                <p><strong>Məhsul adı:</strong> {order.title}</p>
                <p><strong>Qiymət:</strong> {order.price} ₼</p>
                <p><strong>Status:</strong> {order.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">ℹ️ Sizin heç bir sifarişiniz yoxdur.</p>
        )}
      </div>

      <form className="mt-8">
        <input type="text" name="cardholderName" value={formData.cardholderName} onChange={e => setFormData({ ...formData, cardholderName: e.target.value })} required className="w-full p-2 border rounded-md" placeholder="Kart Sahibinin Adı" />

        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={e => setFormData({ ...formData, cardNumber: e.target.value })} required className="w-full p-2 border rounded-md" placeholder="Kart Nömrəsi" />

        <input type="text" name="expDate" value={formData.expDate} onChange={e => setFormData({ ...formData, expDate: e.target.value })} required className="w-full p-2 border rounded-md" placeholder="Bitmə Tarixi (MM/YY)" />

        <input type="text" name="cvv" value={formData.cvv} onChange={e => setFormData({ ...formData, cvv: e.target.value })} required className="w-full p-2 border rounded-md" placeholder="CVV" />

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Ödənişi Tamamla</button>
      </form>
    </div>
  );
}

export default Order;
