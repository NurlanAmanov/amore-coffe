import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sifaris() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        async function fetchData() {
            try {
                // First get user profile
                const userResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                const userId = userResponse.data.id;
                console.log('UserID:', userId);
                
                // Fetch orders
                const ordersResponse = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Order/my-orders', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                setOrders(ordersResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("API çağırışında xəta:", error);
                setError(error.response ? error.response.data : 'Xəta baş verdi');
                setLoading(false);
            }
        }
        
        fetchData();
    }, [token]);

    // Function to combine identical products in an order
    const combineIdenticalProducts = (orderProducts) => {
        if (!orderProducts || !Array.isArray(orderProducts)) return [];
        
        const combinedProducts = {};
        
        orderProducts.forEach(item => {
            if (!item.product) return;
            
            const productId = item.product.id;
            
            if (combinedProducts[productId]) {
                combinedProducts[productId].quantity += item.quantity || 1;
            } else {
                combinedProducts[productId] = {
                    ...item,
                    quantity: item.quantity || 1
                };
            }
        });
        
        return Object.values(combinedProducts);
    };

    if (loading) {
        return <p>Məlumatlar yüklənir...</p>;
    }
    
    if (error) {
        return <p>Xəta: {JSON.stringify(error)}</p>;
    }
    
    return (
        <div className="overflow-x-auto">
            {orders.length > 0 ? (
                <div>
                    <h2 className="text-lg font-semibold">Sifariş Detalları</h2>
                    {orders.map(order => {
                        const combinedProducts = combineIdenticalProducts(order.orderProducts);
                        
                        return (
                            <table key={order.id} className="min-w-full border mb-4">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-4 text-left text-sm font-semibold text-black">Məhsullar</th>
                                        <th className="p-4 text-left text-sm font-semibold text-black">Qiymət</th>
                                        <th className="p-4 text-left text-sm font-semibold text-black">Endirim</th>
                                        <th className="p-4 text-left text-sm font-semibold text-black">Son Qiymət</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {combinedProducts.map((orderItem) => (
                                        <tr key={orderItem.id}>
                                            <td className="p-4 text-sm">
                                                {orderItem.product && (
                                                    <div className="flex items-center">
                                                        <img
                                                            src={`https://finalprojectt-001-site1.jtempurl.com${orderItem.product.imgUrl}`}
                                                            alt={orderItem.product.title}
                                                            className="w-10 h-10 object-cover mr-2"
                                                        />
                                                        <p>{orderItem.product.title} x {orderItem.quantity}</p>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {orderItem.product ? 
                                                    (orderItem.product.price * orderItem.quantity).toFixed(2) : 0} ₼
                                            </td>
                                            <td className="p-4 text-sm">
                                                {orderItem.product ? 
                                                    `${orderItem.product.discount}%` : '0%'}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {orderItem.product ? 
                                                    (orderItem.product.finalPrice * orderItem.quantity).toFixed(2) : 0} ₼
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50">
                                        <td colSpan="3" className="p-4 text-sm font-semibold text-right">Ümumi Məbləğ:</td>
                                        <td className="p-4 text-sm font-semibold">
                                            {combinedProducts.reduce((total, item) => 
                                                total + (item.product?.finalPrice * item.quantity || 0), 0).toFixed(2)} ₼
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-gray-500">Sifariş məlumatları mövcud deyil.</p>
            )}
        </div>
    );
}

export default Sifaris;