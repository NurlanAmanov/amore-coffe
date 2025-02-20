import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoStarSharp } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import { BASKET } from '../../Context/BasketContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedSize, setSelectedSize] = useState("Orta");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]); // Rəyləri saxlamaq üçün yeni state
  const { basketAdd } = useContext(BASKET);

  useEffect(() => {
    fetchProductById(id);
    fetchUserData();
    fetchReviews(); // Rəyləri yükləmək
  }, [id]);

  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Product/${productId}`);
      setProduct(response.data);
      if (response.data && response.data.sizes && response.data.sizes.length > 0) {
        setSelectedSize(response.data.sizes[0]);
      }
    } catch (error) {
      console.error("Məhsul yüklənərkən xəta baş verdi:", error);
      alert('Məhsul məlumatlarını yükləyə bilmədik. Xahiş edirik birazdan yenidən cəhd edin.');
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserName(response.data.userName);
    } catch (error) {
      console.error("İstifadəçi məlumatları yüklənərkən xəta baş verdi:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Review?productId=${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Rəylər yüklənərkən xəta baş verdi:", error);
    }
  };

  const submitComment = async () => {
    try {
      const payload = {
        productId: id,
        userName: userName,
        rating: 5, // Misal üçün reytinq
        comment: comment
      };
      const response = await axios.post('https://finalprojectt-001-site1.jtempurl.com/api/Review', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Şərh əlavə edildi!');
        setComment('');
        fetchReviews(); // Rəyləri yenidən yüklə
      }
    } catch (error) {
      console.error("Şərh göndərilərkən xəta baş verdi:", error);
      alert('Şərh əlavə edilə bilmədi. Xahiş edirik yenidən cəhd edin.');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="xl:max-w-5xl w-[95%] mx-auto py-4 xl:p-6 mt-36">
        <div className="flex gap-10 xl:flex-row flex-col w-full justify-center items-center ">
          <div className="xl:w-1/3 w-[90%] mx-auto">
            <img
              src={`http://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`}
              alt={product.title}
              className="w-full rounded-lg"
            />
          </div>
          <div className="xl:w-2/3 w-[95%] mx-auto ">
            <span className="text-sm text-gray-500">Kateqoriyaya qayıt</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-md">{product.discount}%</span>
              <h1 className="text-3xl font-semibold">{product.title}</h1>
            </div>
            <span className="text-gray-500 text-sm my-4 font-[500]">Kateqoriya  : {product.categoryName}</span>
            <div className="flex items-center gap-1 mt-2">
              <IoStarSharp className="text-yellow-500" />
              <IoStarSharp className="text-yellow-500" />
              <IoStarSharp className="text-yellow-500" />
              <IoStarSharp className="text-yellow-500" />
              <IoStarSharp className="text-yellow-500" />
              <span className="text-gray-500 text-sm">{reviews.length} rəylər</span>
            </div>
            <div className="mt-4 text-lg font-semibold">
              <span className="text-red-500">{product.finalPrice} ₼</span>
              <span className="line-through text-gray-400 ml-2">{product.price}₼</span>
            </div>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4">
              <h3 className="text-sm font-medium">Tags:</h3>
              <div className="flex gap-2 mt-2 flex-wrap">
                {product.tags && product.tags.map(tag => (
                  <span key={tag.id} className="bg-gray-200 text-black px-3 py-1 rounded-full">
                    {tag.tag.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium">Ölçü:</h3>
              <div className="flex gap-2 mt-2">
                {product.productVariants && product.productVariants.map(variant => (
                  <button
                    key={variant.variantId}
                    onClick={() => setSelectedSize(variant.variant.name)}
                    className={`px-3 py-1 border rounded-md ${selectedSize === variant.variant.name ? "border-black" : "border-gray-300"}`}
                  >
                    {variant.variant.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center border rounded-md px-3 py-1">
                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1} className="text-lg">-</button>
                <span className="mx-3">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-lg">+</button>
              </div>
              <button
                onClick={() => {
                  const totalPrice = product.finalPrice * quantity;
                  basketAdd(
                    product.title,
                    product.about,
                    product.id,
                    `https://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`,
                    product.price,
                    product.discount,
                    totalPrice,
                    selectedSize,
                    quantity
                  );
                }}
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                Səbətə at
              </button>
              <button className="border p-2 rounded-lg">
                <CiHeart className='text-black' />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold">Rəylər</h2>
        <textarea className="w-full border p-2 mt-2 rounded-lg" placeholder="Rəy əlavə et"
          value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <button className="mt-2 bg-black text-white px-5 py-2 rounded-lg" onClick={submitComment}>Göndər</button>
        <div className="mt-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{review.userName}</span>
                <div className="flex items-center">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <IoStarSharp key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;