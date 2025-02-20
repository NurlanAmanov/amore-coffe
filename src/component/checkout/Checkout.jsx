import React, { useState, useContext, useEffect } from 'react';
import { BASKET } from '../../Context/BasketContext';
import { Link } from 'react-router-dom';

function Checkout() {
  const { sebet } = useContext(BASKET);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    streetAddress: "",
    apartment: "",
  });

  const [selectedAddress, setSelectedAddress] = useState(""); // Seçili ünvana görə məlumat
  const [shippingInfo, setShippingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Göndərmə məlumatlarını yükləyir
  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const response = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/ShippingInfo");
        const data = await response.json();
        if (!response.ok) throw new Error("Göndərmə məlumatları yüklənmədi.");
        setShippingInfo(data);
      } catch (error) {
        console.error("Göndərmə məlumatlarını yükləmə xətası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingInfo();
  }, []);

  // Seçilən məlumatları formda saxlayırıq
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Ünvan seçimindən sonra formu avtomatik doldurmaq
  const handleAddressChange = (e) => {
    const selected = e.target.value;
    setSelectedAddress(selected);

    // Seçilmiş ünvana əsasən formu doldururuq
    const selectedShipping = shippingInfo.find(item => item.id === selected);
    if (selectedShipping) {
      setFormData({
        name: selectedShipping.name,
        surname: selectedShipping.surname,
        email: selectedShipping.email,
        city: selectedShipping.city,
        streetAddress: selectedShipping.streetAddress,
        apartment: selectedShipping.apartment,
      });
    }
  };

  // Məhsulları qruplaşdırır və toplam məbləği hesablayır
  const groupedBasket = sebet.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const totalPrice = groupedBasket.reduce(
    (total, item) => total + item.quantity * (item.discount > 0 ? item.finalPrice : item.price),
    0
  );

  // **Sifariş məlumatlarını backend-ə göndərir (multipart/form-data)**
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Surname", formData.surname);
      formDataToSend.append("Email", formData.email);
      formDataToSend.append("City", formData.city);
      formDataToSend.append("StreetAdress", formData.streetAddress);
      formDataToSend.append("Apartment", formData.apartment);

      const response = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/ShippingInfo", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`, // Token əlavə edilib
        },
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) throw new Error("Sifariş uğursuz oldu!");

      console.log("✅ Sifariş uğurla göndərildi:", result);
      alert("Sifariş uğurla tamamlandı!");

    } catch (error) {
      console.error("❌ Xəta baş verdi:", error);
      alert("Sifariş zamanı xəta baş verdi!");
    }
  };

  return (
    <div className="py-[150px] bg-white">
      <div className="mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
            <form onSubmit={handleSubmit} className="lg:mt-16">
              <h2 className="text-xl font-bold text-gray-800">Göndərmə məlumatı</h2>
              {loading ? (
                <p>Göndərmə məlumatları yüklənir...</p>
              ) : (
                <div>
                  {/* Ünvan seçim */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Ünvan Seçin</label>
                    <select
                      value={selectedAddress}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Ünvan seçin</option>
                      {shippingInfo.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.name} - {address.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Form sahələri */}
                  <div className="grid sm:grid-cols-2 gap-8 mt-8">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                    />
                    <input
                      type="text"
                      name="surname"
                      placeholder="Surname"
                      value={formData.surname}
                      onChange={handleChange}
                      className="input"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="input"
                    />
                    <input
                      type="text"
                      name="streetAddress"
                      placeholder="Street address"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      className="input"
                    />
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="submit"
                  className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
              Məlumatları yadda saxla
                </button>
                <Link
  to={{
    pathname: '/order',
    state: { totalPrice }, // TotalPrice məlumatını ötür
  }}
  className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  Ödəniş et ({totalPrice.toFixed(2)} ₼)
</Link>
              </div>
            </form>
          </div>

          {/* **Sifarişin ümumi xülasəsi** */}
          <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
            <div className="p-6 overflow-auto">
              <h2 className="text-xl font-bold text-gray-800">Sifariş xülasəsi</h2>
              <div className="space-y-6 mt-8">
                {groupedBasket.length > 0 ? (
                  groupedBasket.map((item, index) => (
                    <div key={index} className="flex gap-4 border-b pb-4">
                      <div className="w-[100px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                        <img src={item.imgUrl} className="w-full object-contain" alt={item.title} />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm text-gray-800 font-bold">{item.title}</h3>
                        <p className="text-xs font-semibold text-gray-500">Ölçü: {item.selectedSize}</p>
                        <p className="text-xs font-semibold text-gray-500">Miqdar: {item.quantity}</p>
                        <p className="text-xs font-semibold text-gray-500">Toplam: {(item.quantity * item.finalPrice).toFixed(2)} ₼</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Səbət boşdur.</p>
                )}
              </div>
              <div className="mt-6 border-t pt-4 text-lg font-bold text-gray-800">
                <span>Toplam məbləğ:</span>
                <span className="ml-auto">{totalPrice.toFixed(2)} ₼</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
