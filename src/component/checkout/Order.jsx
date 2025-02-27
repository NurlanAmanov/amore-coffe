import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASKET } from '../../Context/BasketContext';

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentOrderId = searchParams.get('orderId');

  const { sebet, basketRemove } = useContext(BASKET);

  const [userId, setUserId] = useState('');
  const [promocode, setPromocode] = useState('');  
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  console.log(totalPrice, 'totalPrice')

  const [formData, setFormData] = useState({
    cvv: '',
    cardholderName: '',
    paymentMethod: 'Card',
    cardNumber: '',
    expDate: '',
    paymentToken: 'tok_visa',
  });

  // **Ödəniş funksiyası**
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const paymentFormData = new FormData();
      paymentFormData.append('CardholderName', formData.cardholderName);
      paymentFormData.append('CardNumber', formData.cardNumber);
      paymentFormData.append('EXP', formData.expDate);
      paymentFormData.append('CVV', formData.cvv);
      paymentFormData.append('PaymentMethod', "tok_visa");
      paymentFormData.append('PaymentToken', "tok_visa");
      paymentFormData.append('AppUserId', userId);
      paymentFormData.append('OrderId', currentOrderId);
      paymentFormData.append('TotalPrice', totalPrice);

      // NOTE: IT IS ISSUE HERE YOU SHOULD SEND REAL PROMOCODE TO GET SUCCESS PAYMENT
      paymentFormData.append('Promocode', 'string');  

      const paymentResponse = await axios.post('https://finalprojectt-001-site1.jtempurl.com/api/Checkout/process-payment', paymentFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(paymentResponse.data) {
        alert('Ödəniş uğurla tamamlandı!');
        navigate('/cabinet');
      }
    } catch(e) {
      console.error("❌ Ödəniş xətası:", e);
      setError('Ödəniş zamanı xəta baş verdi!');
    }
  };

  
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
          fetchUserOrder(response.data.id);
          
       
          if (response.data.userPromocodes?.length > 0) {
            const promo = response.data.userPromocodes[0].promocode;
            setPromocode(promo.code);  
            setDiscount(promo.discount); 
            setTotalPrice(prevPrice => prevPrice - promo.discount); 
          }

        } else {
          throw new Error("İstifadəçi ID tapılmadı!");
        }
      } catch (error) {
        console.error("❌ İstifadəçi məlumatı yüklənmədi:", error);
        setError('İstifadəçi məlumatı yüklənə bilmədi!');
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserOrder = async () => {
    try {
      if (!currentOrderId) {
        alert('Sifariş tapılmadı!');
        return;
      }
  
    
      const response = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Order/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
  
      if (response.data) {
        const orderData = response.data;
        setOrder(orderData);
  
       
        // const productPromises = orderData.orderProducts.map((orderProduct) => {
        //   return axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Product/${orderProduct.product.id}`, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //       "Content-Type": "application/json",
        //     },
        //   });
        // });
  
        // const productResponses = await Promise.all(productPromises);
        

        // const updatedOrderProducts = orderData.orderProducts.map((orderProduct, index) => {
        //   return {
        //     ...orderProduct,
        //     product: {
        //       ...orderProduct.product,
        //       title: productResponses[index].data.title,
        //       imgUrl: productResponses[index].data.imgUrl,
        //     },
        //   };
        // });
  
      
        // setOrder({
        //   ...orderData,
        //   orderProducts: updatedOrderProducts,
        // });

        // TEMP SOLUTION
        let total = 0;
        orderData.map(({ orderProducts }) => (
          orderProducts.map(({product}) => (
            total += product.price
          ))
        ))

        setTotalPrice(total)
  
 
        // setTotalPrice(orderData.reduce((total, item) => total + item.product.price, 0));
      } else {
        // setOrder(null);
      }
    } catch (error) {
      console.error("❌ Sifarişlər yüklənmədi:", error.response?.data || error.message);
      // setOrder(null);
    }
  };
  

  return (
    <div className='py-[160px]'>
      <div className="max-w-[1200px] px-5 mx-auto">
        <h1>Sifariş Təsdiqi</h1>
        <p><strong>Əsas Qiymət:</strong> {totalPrice.toFixed(2)} ₼</p>

     

        <p><strong>Endirim:</strong> {discount}%</p>
        <p><strong>Yekun Qiymət:</strong> {totalPrice.toFixed(2)} ₼</p>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Sizin Sifarişləriniz:</h2>
          {order ? (
            <ul className="mt-4 space-y-2 flex gap-3 h-">
              {order?.map(({orderProducts}) => {
                return orderProducts.map(({id, product}) =>(
                  <li key={id} className="p-4 border rounded-md bg-gray-100">
                    {/* <p><strong>Mehsul ID:</strong> {product.id}</p> */}
                    <p><strong>Məhsul adı:</strong> {product.title}</p>
                    <img style={{ borderRadius: "10px" }} src={`https://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`} alt={product.title} className="w-24 h-24 object-cover"/>
                    <p><strong>Qiymət:</strong> {product.price} ₼</p>
                  </li>
                ))
              })}
            </ul>
          ) : (
            <p className="text-gray-500">ℹ️ Sizin heç bir sifarişiniz yoxdur.</p>
          )}
        </div>

        <form onSubmit={handlePayment} className="mt-8 flex flex-col gap-3">
          <input type="text" name="cardholderName" value={formData.cardholderName}
                 onChange={e => setFormData({...formData, cardholderName: e.target.value})} required
                 className="w-full p-2 border rounded-md" placeholder="Kart Sahibinin Adı"/>

          <input type="text" name="cardNumber" value={formData.cardNumber}
                 onChange={e => setFormData({...formData, cardNumber: e.target.value})} required
                 className="w-full p-2 border rounded-md" placeholder="Kart Nömrəsi"/>

          <input type="text" name="expDate" value={formData.expDate}
                 onChange={e => setFormData({...formData, expDate: e.target.value})} required
                 className="w-full p-2 border rounded-md" placeholder="Bitmə Tarixi (MM/YY)"/>

          <input type="text" name="cvv" value={formData.cvv}
                 onChange={e => setFormData({...formData, cvv: e.target.value})} required
                 className="w-full p-2 border rounded-md" placeholder="CVV"/>

          <button type="submit" className="px-4 py-3 w-full max-w-[500px] mx-auto bg-blue-600 text-white rounded-md hover:bg-blue-700">Ödənişi Tamamla</button>
        </form>
      </div>
    </div>
  );
}

export default Order;
