import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASKET } from '../../Context/BasketContext';

function Order() {
  // Hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sebet, basketRemove } = useContext(BASKET);
  
  // Constants
  const API_BASE_URL = 'https://finalprojectt-001-site1.jtempurl.com';
  const token = localStorage.getItem("token");
  const currentOrderId = searchParams.get('orderId');

  // State
  const [userId, setUserId] = useState('');
  const [promocode, setPromocode] = useState('');  
  const [promocodeInput, setPromocodeInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalTotalPrice, setOriginalTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [order, setOrder] = useState(null);
  const [consolidatedProducts, setConsolidatedProducts] = useState([]);
  const [formData, setFormData] = useState({
    cvv: '',
    cardholderName: '',
    paymentMethod: 'Card',
    cardNumber: '',
    expDate: '',
    paymentToken: 'tok_visa',
  });
  
  // Helpers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const showNotification = (message, isError = false) => {
    if (isError) {
      console.error(`❌ ${message}`);
      setError(message);
      setSuccessMessage('');
    } else {
      setSuccessMessage(message);
      setError('');
    }
  };

  // Consolidate identical products
  const consolidateProducts = (orderData) => {
    if (!orderData) return [];
    
    const productMap = new Map();
    
    orderData.forEach(({ orderProducts }) => {
      orderProducts.forEach(({ id, product }) => {
        const productId = product.id;
        
        if (productMap.has(productId)) {
          const existingProduct = productMap.get(productId);
          existingProduct.quantity += 1;
          existingProduct.totalPrice += product.price;
        } else {
          productMap.set(productId, {
            id: productId,
            title: product.title,
            imgUrl: product.imgUrl,
            price: product.price,
            quantity: 1,
            totalPrice: product.price
          });
        }
      });
    });
    
    return Array.from(productMap.values());
  };

  // API calls
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.id) {
        setUserId(response.data.id);
        fetchUserOrder();
        
        if (response.data.userPromocodes?.length > 0) {
          const promo = response.data.userPromocodes[0].promocode;
          setPromocode(promo.code);  
          setDiscount(promo.discount); 
        }
      } else {
        throw new Error("İstifadəçi ID tapılmadı!");
      }
    } catch (error) {
      showNotification("İstifadəçi məlumatı yüklənə bilmədi!", true);
    }
  };

  const fetchUserOrder = async () => {
    try {
      if (!currentOrderId) {
        showNotification("Sifariş tapılmadı!", true);
        return;
      }
  
      const response = await axios.get(`${API_BASE_URL}/api/Order/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.data) {
        const orderData = response.data;
        setOrder(orderData);
        
        // Consolidate products
        const consolidated = consolidateProducts(orderData);
        setConsolidatedProducts(consolidated);

        // Calculate total price
        calculateTotalPrice(orderData);
      }
    } catch (error) {
      showNotification(`Sifarişlər yüklənmədi: ${error.response?.data || error.message}`, true);
    }
  };

  const calculateTotalPrice = (orderData, discountValue = discount) => {
    if (orderData) {
      let total = 0;
      orderData.forEach(({ orderProducts }) => {
        orderProducts.forEach(({ product }) => {
          total += product.price;
        });
      });
      
      setOriginalTotalPrice(total);
      
      // Apply discount if available
      if (discountValue > 0) {
        const discountAmount = total * discountValue / 100;
        total = total - discountAmount;
      }
      
      setTotalPrice(total);
    }
  };

  const applyPromocode = async () => {
    if (!promocodeInput.trim()) {
      showNotification("Zəhmət olmasa promokodu daxil edin", true);
      return;
    }
  
    if (!userId) {
      showNotification("İstifadəçi ID tapılmadı!", true);
      return;
    }
  
    try {
      // Try using a more robust approach with a JSON body instead of query parameters
      const response = await axios.post(
        `${API_BASE_URL}/api/Promocode/use-promocode`,
        {
          userId: userId,
          promocodeCode: promocodeInput
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "*/*"
          },
        }
      );
  
      if (response.status === 200) {
        // Add more detailed success handling
        console.log("Promocode response:", response.data);
        
        // Fetch updated user data to get the applied discount
        await fetchUserData();
        
        // Show success message
        showNotification(`Promokod uğurla tətbiq edildi!`);
      }
    } catch (error) {
      console.error("Error applying promocode:", error);
      
      // Better error handling with more details
      let errorMessage = "Promokod tətbiq edilə bilmədi!";
      
      if (error.response) {
        console.log("Error response:", error.response.data);
        
        // Try to extract a more specific error message if available
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.status === 400) {
          errorMessage = "Promokod etibarsızdır və ya artıq istifadə edilib";
        }
      }
      
      showNotification(errorMessage, true);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const paymentFormData = new FormData();
      
      // Add payment details to form data
      Object.entries({
        CardholderName: formData.cardholderName,
        CardNumber: formData.cardNumber,
        EXP: formData.expDate,
        CVV: formData.cvv,
        PaymentMethod: "tok_visa",
        PaymentToken: "tok_visa",
        AppUserId: userId,
        OrderId: currentOrderId,
        TotalPrice: totalPrice,
        Promocode: promocode || ''
      }).forEach(([key, value]) => {
        paymentFormData.append(key, value);
      });

      const paymentResponse = await axios.post(
        `${API_BASE_URL}/api/Checkout/process-payment`, 
        paymentFormData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(paymentResponse.data) {
        showNotification('Ödəniş uğurla tamamlandı!');
        navigate('/cabinet');
      }
    } catch(error) {
      showNotification('Ödəniş zamanı xəta baş verdi!', true);
    }
  };

  // Effects
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  // Need to recalculate total price when discount changes
  useEffect(() => {
    if (order && discount > 0) {
      calculateTotalPrice(order, discount);
    }
  }, [discount]);

  // Render helpers
  const renderConsolidatedOrderItems = () => {
    if (!consolidatedProducts.length) {
      return <p className="text-gray-500">ℹ️ Sizin heç bir sifarişiniz yoxdur.</p>;
    }

    return (
      <ul className="mt-4 space-y-4">
        {consolidatedProducts.map((product) => (
          <li key={product.id} className="flex items-center border rounded-md bg-gray-50 overflow-hidden">
            <img 
              src={`${API_BASE_URL}${product.imgUrl}`} 
              alt={product.title} 
              className="w-24 h-24 object-cover mr-4"
            />
            <div className="flex-grow p-4">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600">
                  <span className="font-medium">{product.price} ₼</span> × {product.quantity}
                </p>
                <p className="font-bold text-lg">{product.totalPrice} ₼</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='py-[160px]'>
      <div className="max-w-[1200px] px-5 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sifariş Təsdiqi</h1>
        
        {/* Order summary */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Ödəniş məlumatı</h2>
          <div className="space-y-2 border-b pb-4 mb-4">
            <p><strong>Əsas Qiymət:</strong> {originalTotalPrice.toFixed(2)} ₼</p>
            {discount > 0 && (
              <p>
                <strong>Endirim:</strong> {discount}% 
                ({(originalTotalPrice * discount / 100).toFixed(2)} ₼)
              </p>
            )}
            <p className="text-lg font-bold">
              <strong>Yekun Qiymət:</strong> {totalPrice.toFixed(2)} ₼
            </p>
          </div>
          
          {/* Promocode input area */}
          <div className="mt-6">
            <h3 className="font-medium mb-2">Promokod</h3>
            {successMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <input 
                type="text" 
                value={promocodeInput}
                onChange={(e) => setPromocodeInput(e.target.value)}
                placeholder="Promokodu daxil edin"
                className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="button"
                onClick={applyPromocode}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Tətbiq et
              </button>
            </div>
            {promocode && (
              <p className="mt-2 text-green-600">
                Aktiv promokod: <strong>{promocode}</strong> ({discount}% endirim)
              </p>
            )}
          </div>
        </div>

        {/* Order items */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Sizin Sifarişləriniz</h2>
          {renderConsolidatedOrderItems()}
        </div>

        {/* Payment form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ödəniş məlumatları</h2>
          
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Kart Sahibinin Adı</label>
              <input 
                type="text" 
                name="cardholderName" 
                value={formData.cardholderName}
                onChange={handleInputChange} 
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Kart Nömrəsi</label>
              <input 
                type="text" 
                name="cardNumber" 
                value={formData.cardNumber}
                onChange={handleInputChange} 
                required
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">Bitmə Tarixi</label>
                <input 
                  type="text" 
                  name="expDate" 
                  value={formData.expDate}
                  onChange={handleInputChange} 
                  required
                  placeholder="MM/YY"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              
              <div className="w-1/3">
                <label className="block text-gray-700 mb-1">CVV</label>
                <input 
                  type="text" 
                  name="cvv" 
                  value={formData.cvv}
                  onChange={handleInputChange} 
                  required
                  placeholder="XXX"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="px-6 py-3 w-full bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors mt-4"
            >
              Ödənişi Tamamla
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;