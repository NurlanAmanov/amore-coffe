import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Səbətdəki məhsulları və ümumi qiyməti location-dan alırıq
  const { totalPrice = 0, orderIds = '' } = location.state || {};

  // 🔹 İstifadəçinin `userId`-sini çəkmək üçün state
  const [userId, setUserId] = useState('');

  // 🔹 Forma üçün state
  const [formData, setFormData] = useState({
    cvv: '',
    cardholderName: '',
    paymentMethod: 'Card', // Backend formatına uyğun dəyişdirilib
    cardNumber: '',
    expDate: '',
    paymentToken: 'tok_visa', // Default olaraq Visa üçün token
    orderId: orderIds,
    totalPrice: totalPrice
  });

  // 🔹 `Auth/profile` API-dən istifadəçinin `userId`-sini çəkmək
  useEffect(() => {
    const fetchUserProfile = async () => {
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
          setUserId(response.data.id); // 🔥 `userId` state-ə yazılır
        }
      } catch (error) {
        console.error("İstifadəçi məlumatları yüklənmədi:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // 🔹 Form daxilində dəyişiklikləri idarə edən funksiya
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Ödənişi icra edən funksiya
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // ✅ FormData istifadə edərək multipart/form-data formatında göndəririk
      const form = new FormData();
      form.append('CVV', formData.cvv);
      form.append('TotalPrice', formData.totalPrice);
      form.append('CardholderName', formData.cardholderName);
      form.append('PaymentMethod', formData.paymentMethod);
      form.append('AppUserId', userId); // 🔥 `userId` avtomatik olaraq API-dən gəlir
      form.append('OrderId', formData.orderId);
      form.append('PaymentToken', formData.paymentToken);
      form.append('CardNumber', formData.cardNumber);
      form.append('EXP', formData.expDate);

      console.log("📦 Göndərilən FormData:", Object.fromEntries(form.entries()));

      // 🔹 API Çağırışı (`multipart/form-data` formatında)
      const response = await fetch(
        "https://finalprojectt-001-site1.jtempurl.com/api/Checkout/process-payment",
        {
          method: "POST",
          headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
          },
          body: form, // 🔥 FormData bədən olaraq göndərilir
        }
      );

      if (!response.ok) {
        const result = await response.json();
        console.error("API Response:", result);
        throw new Error(result.message || "Ödənişin işlənməsi zamanı xəta baş verdi.");
      }

      const result = await response.json();
      console.log("✅ Ödəniş uğurla tamamlandı:", result);
      alert("Ödəniş uğurla tamamlandı!");
      navigate("/confirmation"); // Ödəniş tamamlandıqdan sonra yönləndir

    } catch (error) {
      console.error("❌ Ödəniş xətası:", error);
      alert("Ödəniş zamanı xəta baş verdi!");
    }
  };

  return (
    <div className='py-[160px]'>
      <h1>Sifariş Təsdiqi</h1>
      <p><strong>Ümumi Qiymət:</strong> {totalPrice.toFixed(2)} ₼</p>
      <p><strong>Sifarişlər:</strong> {orderIds}</p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kart Sahibi</label>
          <input 
            type="text" 
            name="cardholderName" 
            value={formData.cardholderName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kart Nömrəsi</label>
          <input 
            type="text" 
            name="cardNumber" 
            value={formData.cardNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bitmə Tarixi (MM/YY)</label>
          <input 
            type="text" 
            name="expDate" 
            value={formData.expDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input 
            type="text" 
            name="cvv" 
            value={formData.cvv}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ödəniş Metodu</label>
          <select 
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Card">Kart (Visa, MasterCard)</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Ödənişi Tamamla
        </button>
      </form>
    </div>
  );
}

export default Order;
