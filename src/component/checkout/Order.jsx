import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { BASKET } from "../../Context/BasketContext"; // Səbət konteksti

function Order() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { sebet } = useContext(BASKET); // Səbət məlumatlarını çəkirik

  // State-lər
  const [formData, setFormData] = useState({
    CardholderName: "",
    CVV: "",
    CardNumber: "",
    EXP: "",
    TotalPrice: 0, // Səbətdəki məhsulların ümumi məbləği
    PaymentMethod: "card",
    AppUserId: localStorage.getItem("userId") || "",
    OrderId: "", // Sifariş ID-si səbətdən avtomatik yaradılacaq
    PaymentToken: "", // Stripe token burada əlavə olunacaq
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Səbətdəki məhsulların ümumi məbləğini hesablayır
  useEffect(() => {
    const totalPrice = sebet.reduce((total, item) => {
      return total + item.quantity * (item.discount > 0 ? item.finalPrice : item.price);
    }, 0);

    // Sifariş ID-si yaradın (məsələn, səbətdəki məhsul ID-lərindən istifadə edərək)
    const orderId = sebet.map((item) => item.id).join("-");

    setFormData((prevData) => ({
      ...prevData,
      TotalPrice: totalPrice,
      OrderId: orderId,
    }));
  }, [sebet]);

  // Input dəyərlərinin dəyişməsini idarə edir
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Formun göndərilməsini idarə edir
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setError("Stripe yüklənməyib.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Stripe ilə ödəniş token-i yaradın
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Stripe token-i formData-ya əlavə edin
      formData.PaymentToken = paymentMethod.id;

      // FormData obyekti yaradın
      const formDataToSend = new FormData();
      formDataToSend.append("CVV", formData.CVV);
      formDataToSend.append("TotalPrice", formData.TotalPrice.toString());
      formDataToSend.append("CardholderName", formData.CardholderName);
      formDataToSend.append("PaymentMethod", formData.PaymentMethod);
      formDataToSend.append("AppUserId", formData.AppUserId);
      formDataToSend.append("OrderId", formData.OrderId);
      formDataToSend.append("PaymentToken", formData.PaymentToken);
      formDataToSend.append("CardNumber", formData.CardNumber);
      formDataToSend.append("EXP", formData.EXP);

      // Ödəniş məlumatlarını backend-ə göndər
      const response = await fetch(
        "https://finalprojectt-001-site1.jtempurl.com/api/Checkout/process-payment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: formDataToSend, // FormData ilə göndərin
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Ödəniş zamanı xəta baş verdi.");
      }

      console.log("✅ Ödəniş uğurla tamamlandı:", result);
      alert("Ödəniş uğurla tamamlandı!");
      navigate("/"); // Ödəniş uğurlu olduqda əsas səhifəyə yönləndir
    } catch (error) {
      console.error("❌ Xəta baş verdi:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-[150px] bg-white">
      <div className="mx-auto w-full max-w-4xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Ödəniş məlumatları</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Kart sahibinin adı */}
            <input
              type="text"
              name="CardholderName"
              placeholder="Kart sahibinin adı"
              value={formData.CardholderName}
              onChange={handleChange}
              required
              className="input"
            />

            {/* Kart nömrəsi */}
            <input
              type="text"
              name="CardNumber"
              placeholder="Kart nömrəsi"
              value={formData.CardNumber}
              onChange={handleChange}
              required
              className="input"
            />

            {/* Son istifadə tarixi */}
            <input
              type="text"
              name="EXP"
              placeholder="Son istifadə tarixi (MM/YY)"
              value={formData.EXP}
              onChange={handleChange}
              required
              className="input"
            />

            {/* CVV */}
            <input
              type="text"
              name="CVV"
              placeholder="CVV"
              value={formData.CVV}
              onChange={handleChange}
              required
              className="input"
            />

            {/* Stripe Card Element */}
            <div className="col-span-2">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Xəta mesajı */}
          {error && <div className="text-red-500 mt-4">{error}</div>}

          {/* Ödəniş et düyməsi */}
          <button
            type="submit"
            disabled={loading || !stripe}
            className="mt-6 min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Yüklənir..." : "Ödəniş et"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Order;