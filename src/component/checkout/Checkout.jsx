import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASKET } from '../../Context/BasketContext';
import {GetCabinet} from "../../service/Cabinet.js";
import axios from "axios";

function Checkout() {
  const { sebet } = useContext(BASKET);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    streetAddress: "",
    apartment: "",
  });

  const [selectedAddress, setSelectedAddress] = useState("");
  const [shippingInfo, setShippingInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShippingInfo() {
      try {
        const response = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/ShippingInfo");
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Göndərmə məlumatları yüklənmədi.");
        }
        setShippingInfo(data);
      } catch (error) {
        console.error("Göndərmə məlumatlarını yükləmə xətası:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShippingInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    const selected = e.target.value;
    setSelectedAddress(selected);

    if (selected) {
      const selectedShipping = shippingInfo.find(item => item.id === selected);
      setFormData({
        name: selectedShipping.name,
        surname: selectedShipping.surname,
        email: selectedShipping.email,
        city: selectedShipping.city,
        streetAddress: selectedShipping.streetAddress,
        apartment: selectedShipping.apartment,
      });
    } else {
      setFormData({
        name: "",
        surname: "",
        email: "",
        city: "",
        streetAddress: "",
        apartment: "",
      });
    }
  };

  const saveFormData = async () => {
    try {
      const form = new FormData();
      form.append("Name", formData.name);
      form.append("Surname", formData.surname);
      form.append("Email", formData.email);
      form.append("City", formData.city);
      form.append("StreetAdress", formData.streetAddress);
      form.append("Apartment", formData.apartment);

      const response = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/ShippingInfo", {
        method: "POST",
        headers: {
          "accept": "*/*",
        },
        body: form,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Məlumatlar uğursuz oldu!");

      console.log("✅ Məlumatlar uğurla göndərildi:", result);
      alert("Məlumatlar uğurla göndərildi!");

      // Ödənişi aktivləşdirmək
      activatePayment(result.id);
    } catch (error) {
      console.error("❌ Məlumatları göndərmə xətası:", error);
      alert("Məlumatları göndərmək mümkün olmadı!");
    }
  };

  const activatePayment = async (shippingInfoId) => {
    // Bu addımda ödənişin aktivləşdirilməsini həyata keçiririk
    // Əgər ödəniş üçün xüsusi bir endpoint varsa, buraya onu əlavə edirik
    console.log("Ödəniş aktivləşdirilir...");

    // Yönləndirmə əməliyyatı
    const totalPrice = sebet.reduce((total, item) => total + item.quantity * (item.discount > 0 ? item.finalPrice : item.price), 0);
    console.log(totalPrice, 'Total Price');
    console.log(sebet, 'Basket');
    const token = localStorage.getItem('token');
    const currentUser = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.data).catch(err => console.error(err));

    if(currentUser) {
      const createOrderFormData = new FormData();
        createOrderFormData.append("AppUserId", currentUser.id);
        createOrderFormData.append("ProductIds", sebet.map(item => item.id));
      const createdOrder = await axios.post('https://finalprojectt-001-site1.jtempurl.com/api/Order/create', createOrderFormData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => res.data).catch(err => console.error(err));

      if(!createdOrder || !createdOrder.orderId) {
        alert('Sifariş yaradılmadı!');
        return;
      }

      console.log(createdOrder, 'Created Order');
      navigate('/order?orderId=' + createdOrder.orderId);
    }
  };

  const proceedToOrder = () => {
    if (selectedAddress) {
      saveFormData();
    } else {
      alert("Zəhmət olmasa, ünvan seçin!");
    }
  };

  const isFormValid = formData.name && formData.surname && formData.email && formData.city && formData.streetAddress && formData.apartment;

  return (
    <div className="py-[150px] bg-white">
      <div className="mx-auto w-full max-w-4xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Sifariş Məlumatları</h2>
        {loading ? (
          <p>Göndərmə məlumatları yüklənir...</p>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ünvan Seçin:</label>
              <select value={selectedAddress} onChange={handleAddressChange} className="w-full p-2 border rounded-lg">
                <option value="">Ünvanı seçin</option>
                {shippingInfo.map(address => (
                  <option key={address.id} value={address.id}>{address.name} - {address.city}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(formData).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key[0].toUpperCase() + key.slice(1)}
                  className="p-2 border rounded-lg"
                  required
                />
              ))}
            </div>
            <button type="button" onClick={proceedToOrder} disabled={!isFormValid} className={`mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Sifarişə Keçin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
