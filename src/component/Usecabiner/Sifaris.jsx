import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sifaris() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    const currentOrderId = "ff03745f-c514-48c9-8983-1434a4695bc9"; // Burada sifarişin ID-ni əlavə edin

    useEffect(() => {
        // `orderId` ilə sifarişi çəkirik
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`https://amore.cavidhuseynov.me/api/Order/${currentOrderId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                console.log("Order Details:", response.data);

                if (!response.data) {
                    console.log("Bu sifariş tapılmadı.");
                }

                setOrder(response.data);
                setLoading(false);

            } catch (error) {
                console.error("Sifarişi yükləmək mümkün olmadı:", error);
                setError('Sifarişi yükləmək mümkün olmadı');
                setLoading(false);
            }
        };

        fetchOrder();
    }, [token, currentOrderId]);

    if (loading) {
        return <p>Məlumatlar yüklənir...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="overflow-x-auto">
            {order ? (
                <div>
                    <h2 className="text-lg font-semibold">Sifariş Detalları</h2>
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-black">Məhsullar</th>
                                <th className="p-4 text-left text-sm font-semibold text-black">Qiymət</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {order.orderProducts.map((orderItem) => (
                                <tr key={orderItem.id}>
                                    <td className="p-4 text-sm">
                                        {/* Məhsul şəkilini və başlığını göstəririk */}
                                        {orderItem.product && (
                                            <>
                                                <img
                                                    src={`https://amore.cavidhuseynov.me${orderItem.product.imgUrl}`}
                                                    alt={orderItem.product.title}
                                                    className="w-10 h-10 object-cover mr-2"
                                                />
                                                <p>{orderItem.product.title} x {orderItem.quantity}</p>
                                            </>
                                        )}
                                    </td>
                                    <td className="p-4 text-sm">{orderItem.product.price * orderItem.quantity} ₼</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">Sifariş məlumatları mövcud deyil.</p>
            )}
        </div>
    );
}

export default Sifaris;
