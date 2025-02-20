import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoStarSharp } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import{ BASKET } from '../../Context/BasketContext';

const ProductDetail = () => {
  const { id } = useParams();  // URL-dən məhsulun ID'sini alır
  const [product, setProduct] = useState(null);  // Məhsul məlumatlarını saxlamaq üçün state
  const [selectedSize, setSelectedSize] = useState("Orta");
  const [quantity, setQuantity] = useState(1);
  const {bassketadd} = useContext(BASKET)
  useEffect(() => {
    fetchProductById(id);  // Komponent yükləndikdə məhsul məlumatlarını çəkir
  }, [id]);

  // ID əsasında serverdən məhsul məlumatını çəkən funksiya
  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(`https://finalprojectt-001-site1.jtempurl.com/api/Product/${productId}`);
      setProduct(response.data);  // Məhsul məlumatını state-də saxla
      if (response.data && response.data.sizes && response.data.sizes.length > 0) {
        setSelectedSize(response.data.sizes[0]);  // İlk ölçü seçimini et
      }
    } catch (error) {
      console.error("Məhsul yüklənərkən xəta baş verdi:", error);
    }
  };

  // Əgər məhsul məlumatı yoxdursa, yükləmə göstəricisi qaytar
  if (!product) {
    return<div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
    <div className="h-48 rounded-t dark:bg-gray-300"></div>
    <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
      <div className="w-full h-6 rounded dark:bg-gray-300"></div>
      <div className="w-full h-6 rounded dark:bg-gray-300"></div>
      <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
    </div>
  </div>
  }

  return (
    <>



      <div className="xl:max-w-5xl w-[95%] mx-auto py-4 xl:p-6 mt-36">
        {/* Üst Bölüm */}
        <div className="flex gap-10 xl:flex-row flex-col w-full justify-center items-center ">
          {/* Ürün Resmi */}
          <div className="xl:w-1/3 w-[90%] mx-auto">
            <img
              src={`http://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`}
              alt={product.title}
              className="w-full rounded-lg"
            />
          </div>

          {/* Ürün Bilgileri */}
          <div className="xl:w-2/3 w-[95%] mx-auto ">
            <span className="text-sm text-gray-500">Kateqoriyaya qayıt</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-md">{product.discount}%</span>

              <h1 className="text-3xl font-semibold">{product.title}</h1>
            </div>
            <span className="text-gray-500 text-sm my-4 font-[500]">Kateqoriya  : {product.categoryName} </span>
            {/* Yıldız ve İnceleme */}
            <div className="flex items-center gap-1 mt-2">
              <IoStarSharp className="text-yellow-500" />
              <IoStarSharp className="text-yellow-500" />
              <IoStarSharp className="text-yellow-500" />
              <IoStarSharp className="text-yellow-500" />
              <IoStarSharp className="text-yellow-500" />


              <span className="text-gray-500 text-sm">2 rəylər</span>
            </div>

            {/* Fiyatlandırma */}
            <div className="mt-4 text-lg font-semibold">
              <span className="text-red-500">{product.finalPrice} ₼</span>
              <span className="line-through text-gray-400 ml-2">{product.price}₼</span>
            </div>

            {/* Açıklama */}
            <p className="text-gray-600 mt-2">
              {product.description}
            </p>
            {/* Tags */}
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


            {/* Ölçü Seçenekleri */}
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

            {/* Miktar & Sepete Ekle */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center border rounded-md px-3 py-1">
                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1} className="text-lg">-</button>
                <span className="mx-3">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-lg">+</button>
              </div>
        <button
  onClick={() => {
    const totalPrice = product.finalPrice * quantity; // Seçilmiş miqdarla son qiymətin hasilini hesabla
    bassketadd(
      product.title,
      product.about,
      product.id,
      `https://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`,
      product.price,
      product.discount,
      totalPrice, // Yekun qiymət
      selectedSize, // Seçilmiş ölçü
      quantity // Seçilmiş miqdar
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

        {/* Yorum Alanı */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold">Rəylər</h2>
          <textarea className="w-full border p-2 mt-2 rounded-lg" placeholder="Rəy əlavə et"></textarea>
          <button className="mt-2 bg-black text-white px-5 py-2 rounded-lg">Göndər</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
