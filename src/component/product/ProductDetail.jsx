import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoStarSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BASKET } from "../../Context/BasketContext";
import Coment from "../Main/Coment";

const ProductDetail = () => {
  const { id } = useParams(); // URL-dən məhsulun ID-sini alır
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Orta");
  const [quantity, setQuantity] = useState(1);
  const { bassketadd } = useContext(BASKET);

  useEffect(() => {
    fetchProductById(id); // Komponent yükləndikdə məhsul məlumatlarını çəkir
  }, [id]);

  // 🔹 ID əsasında serverdən məhsul məlumatını çəkən funksiya
  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(
        `https://finalprojectt-001-site1.jtempurl.com/api/Product/${productId}`
      );
      setProduct(response.data); // Məhsul məlumatını state-də saxla
      if (response.data && response.data.sizes && response.data.sizes.length > 0) {
        setSelectedSize(response.data.sizes[0]); // İlk ölçü seçimini et
      }
    } catch (error) {
      console.error("Məhsul yüklənərkən xəta baş verdi:", error);
    }
  };
  console.log(id);

  // 🔹 Yükləmə effekti
  if (!product) {
    return (
      <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
        <div className="h-48 rounded-t dark:bg-gray-300"></div>
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
          <div className="w-full h-6 rounded dark:bg-gray-300"></div>
          <div className="w-full h-6 rounded dark:bg-gray-300"></div>
          <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:max-w-5xl w-[95%] mx-auto py-4 xl:p-6 mt-36">
      {/* Məhsul Məlumatları */}
      <div className="flex gap-10 xl:flex-row flex-col w-full justify-center items-center">
        {/* Məhsul Şəkli */}
        <div className="xl:w-1/3 w-[90%] mx-auto">
          <img
            src={`http://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`}
            alt={product.title}
            className="w-full rounded-lg"
          />
        </div>

        {/* Məhsul Bilgiləri */}
        <div className="xl:w-2/3 w-[95%] mx-auto">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <span className="text-gray-500 text-sm my-4 font-[500]">
            Kateqoriya : {product.categoryName}
          </span>

          {/* Reytinq */}
          <div className="flex items-center gap-1 mt-2">
            <IoStarSharp className="text-yellow-500" />
            <IoStarSharp className="text-yellow-500" />
            <IoStarSharp className="text-yellow-500" />
            <IoStarSharp className="text-yellow-500" />
            <IoStarSharp className="text-yellow-500" />
            <span className="text-gray-500 text-sm">2 rəylər</span>
          </div>
          <span className="text-gray-500 text-sm my-4 font-[500]">
            Taglar : {product.tags.map((tag, index) => (
              <span key={index}>
                {tag.tag.name}
                {index < product.tags.length - 1 && ', '} {/* Əgər tag-lar çoxdursa, aralarına vergül qoyulur */}
              </span>
            ))}
          </span>
          {/* Qiymət */}
          <div className="mt-4 text-lg font-semibold">
            <span className="text-red-500">{product.finalPrice} ₼</span>
            <span className="line-through text-gray-400 ml-2">{product.price}₼</span>
          </div>

          {/* Variantlar / Seçimlər */}
          <div className="mt-4">
            <h3 className="text-lg font-medium">Ölçü Seçin:</h3>
            <div className="flex gap-4 mt-2">
              {product.productVariants.map((variant) => (
                <button
                  key={variant.variantId}
                  onClick={() => setSelectedSize(variant.variant.name)}  // Ölçü seçimi
                  className={`px-4 py-2 border rounded-lg ${selectedSize === variant.variant.name ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {variant.variant.name}
                </button>
              ))}
            </div>
          </div>

          {/* Açıklama */}
          <p className="text-gray-600 mt-2">{product.description}</p>

          {/* Səbətə Əlavə */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => {
                const totalPrice = product.finalPrice * quantity;
                bassketadd(
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
              <CiHeart className="text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Şərhlər və Yeni Şərh Formu */}
      <Coment productId={id} />
    </div>
  );
};

export default ProductDetail;
