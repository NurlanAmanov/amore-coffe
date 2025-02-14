import React, { useContext, useState } from 'react';
import { BASKET } from '../../Context/BasketContext';

function Checkout() {
  const { sebet } = useContext(BASKET);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    streetAddress: "",
    apartment: "",
    cardholderName: "",
    cardNumber: "",
    exp: "",
    cvv: "",
    paymentMethod: "card",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // **Düzgün səbət qruplaşdırma (count əsasən)**
  const groupedBasket = sebet.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.count += item.count; // ✅ Say artır
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  // **Toplam məbləği hesablayırıq**
  const totalPrice = groupedBasket.reduce(
    (total, item) => total + item.count * (item.discount > 0 ? item.finalPrice : item.price),
    0
  );

  // **Sifarişi backend-ə göndərmək üçün funksiya**
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = "sənin-tokenin"; // 🚨 Burada token əlavə et

      // **Göndərmə məlumatlarını backend-ə göndəririk**
      const shippingResponse = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/ShippingInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          Name: formData.name,
          Surname: formData.surname,
          Email: formData.email,
          City: formData.city,
          StreetAddress: formData.streetAddress,
          Apartment: formData.apartment,
        }),
      });

      if (!shippingResponse.ok) throw new Error("Göndərmə məlumatları uğursuz oldu");

      const shippingResult = await shippingResponse.json();
      console.log("📦 Göndərmə məlumatları uğurla göndərildi:", shippingResult);

      // **Ödəniş məlumatlarını backend-ə göndəririk**
      const paymentResponse = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/Checkout/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          OrderId: crypto.randomUUID(),
          TotalPrice: totalPrice,
          PaymentMethod: formData.paymentMethod,
          CardholderName: formData.cardholderName,
          CardNumber: formData.cardNumber,
          EXP: formData.exp,
          CVV: formData.cvv,
        }),
      });

      if (!paymentResponse.ok) throw new Error("Ödəniş uğursuz oldu");

      const paymentResult = await paymentResponse.json();
      console.log("💳 Ödəniş uğurla icra olundu:", paymentResult);
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
              <div className="grid sm:grid-cols-2 gap-8 mt-8">
                <input type="text" name="name" placeholder="Ad" onChange={handleChange} className="input" />
                <input type="text" name="surname" placeholder="Soyad" onChange={handleChange} className="input" />
                <input type="email" name="email" placeholder="Email ünvanı" onChange={handleChange} className="input" />
                <input type="text" name="streetAddress" placeholder="Ünvan" onChange={handleChange} className="input" />
                <input type="text" name="city" placeholder="Şəhər" onChange={handleChange} className="input" />
                <input type="text" name="apartment" placeholder="Mənzil" onChange={handleChange} className="input" />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-10">Ödəniş məlumatı</h2>
              <div className="grid gap-8 mt-8">
                <input type="text" name="cardholderName" placeholder="Kart sahibinin adı" onChange={handleChange} className="input" />
                <input type="number" name="cardNumber" placeholder="Kart nömrəsi" onChange={handleChange} className="input" />
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" name="exp" placeholder="Bitmə tarixi (MM/YY)" onChange={handleChange} className="input" />
                  <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} className="input" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button type="submit" className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Ödəniş et ({totalPrice.toFixed(2)} ₼)
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
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
                        <p className="text-xs text-gray-500">Miqdar: {item.count}</p>
                        <p className="text-xs text-gray-500">Qiymət: {item.price} ₼</p>
                        <p className="text-xs text-gray-500">Toplam: {(item.count * item.price).toFixed(2)} ₼</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Səbət boşdur.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
