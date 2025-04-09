import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASKET } from '../../Context/BasketContext';
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
        const response = await fetch("https://amore.cavidhuseynov.me/swagger/index.html/api/ShippingInfo");
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

      const response = await fetch("https://amore.cavidhuseynov.me/swagger/index.html/api/ShippingInfo", {
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

      activatePayment();
    } catch (error) {
      console.error("❌ Məlumatları göndərmə xətası:", error);
      alert("Məlumatları göndərmək mümkün olmadı!");
    }
  };

  const activatePayment = async () => {
    console.log("Ödəniş aktivləşdirilir...");

    const totalPrice = sebet.reduce((total, item) => total + item.quantity * (item.discount > 0 ? item.finalPrice : item.price), 0);
    console.log('Total Price:', totalPrice);
    console.log('Basket Contents:', sebet);
    const token = localStorage.getItem('token');

    try {
      const currentUserResponse = await axios.get('https://amore.cavidhuseynov.me/swagger/index.html/api/Auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const currentUser = currentUserResponse.data;
      console.log("User:", currentUser);

      if (!currentUser) {
        alert("İstifadəçi məlumatları tapılmadı!");
        return;
      }

      const productIds = sebet.map(item => item.id); 
      console.log("Product IDs:", productIds);

      if (productIds.length === 0) {
        alert("No products selected in the basket.");
        return;
      }

      const createOrderData = {
        AppUserId: currentUser.id, 
        ProductIds: productIds 
      };

      console.log("Create Order Data:", createOrderData);

      const createdOrderResponse = await axios.post('https://amore.cavidhuseynov.me/swagger/index.html/api/Order/create', createOrderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const createdOrder = createdOrderResponse.data;
      console.log("Created Order:", createdOrder);

      if (!createdOrder || !createdOrder.orderId) {
        alert('Sifariş yaradılmadı!');
        return;
      }

      navigate('/order?orderId=' + createdOrder.orderId);

    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert("Xəta baş verdi: " + error.response.data.message);
      } else {
        console.error("Error:", error.message);
        alert("Sifariş yaradılarkən xəta baş verdi.");
      }
    }
  };

  const proceedToOrder = () => {
    if (selectedAddress || (formData.name && formData.surname && formData.email && formData.city && formData.streetAddress && formData.apartment)) {
    
      if (selectedAddress) {
        saveFormData();
      } else {
     
        activatePayment();
      }
    } else {
      alert("Zəhmət olmasa, ünvan seçin və ya məlumatları daxil edin!");
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
