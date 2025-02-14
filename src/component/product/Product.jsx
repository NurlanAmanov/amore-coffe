import React, { useContext, useState } from "react";
import { DATA } from "../../Context/Datacontext";
import { BASKET } from "../../Context/BasketContext";
import { useSearchParams, useNavigate } from "react-router-dom";

function Product() {
  const { mehsul } = useContext(DATA);
  const { bassketadd } = useContext(BASKET);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // ✅ Yönləndirmə üçün

  const categoryName = searchParams.get("category");
  const filteredProducts = categoryName
    ? mehsul.filter((item) => item.categoryName === categoryName)
    : mehsul;

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Məhsullar - {categoryName || "Bütün Kateqoriyalar"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} bassketadd={bassketadd} navigate={navigate} />
          ))
        ) : (
          <p className="text-gray-500 text-lg font-semibold text-center col-span-full">
            Bu kateqoriyada məhsul tapılmadı.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductCard({ item, bassketadd, navigate }) {
  const [count, setCount] = useState(1);
  const finalPrice = (item.discount > 0 ? item.finalPrice : item.price) * count;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full">
      <div className="relative">
        <img
          src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
          alt={item.title}
          className="w-full h-64 object-cover hover:scale-[1.1] duration-300 ease cursor-pointer"
          onClick={() => navigate(`/product/${item.id}`)} // ✅ Klik ediləndə yönləndir
        />
        {item.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {item.discount} %
          </span>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h2>
        <p className="text-sm text-gray-600">{item.categoryName}</p>
        <div className="flex items-center py-2">
          {item.discount > 0 ? (
            <>
              <span className="text-lg font-bold text-sm text-gray-500 line-through">
                {item.price} ₼
              </span>
              <span className="text-lg font-bold text-green-600 ml-2">
                {finalPrice} ₼
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">{finalPrice} ₼</span>
          )}
        </div>
        <div className="flex space-x-2">
        <button
            onClick={() => {
              for (let i = 0; i < count; i++) {
                bassketadd(
                  item.title,
                  item.about,
                  item.id,
                  `https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`, // ✅ Düzgün URL göndərildi
                  item.desciption,
                  item.price,
                  item.discount,
                  item.finalPrice
                );
              }
            }}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Səbətə at
          </button>

          {/* <button
           onClick={() => {
            console.log("Göndərilən ID:", item.id); // ✅ Konsolda yoxla
            navigate(`/product/${item.id}`);
          }}// ✅ "Baxış" düyməsinə klik ediləndə yönləndir
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            Baxış
          </button> */}

<button
            onClick={() => {
              for (let i = 0; i < count; i++) {
                bassketadd(
                  item.title,
                  item.about,
                  item.id,
                  `https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`, // ✅ Düzgün URL göndərildi
                  item.desciption,
                  item.price,
                  item.discount,
                  item.finalPrice
                );
              }
            }}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Sevimlilərə at
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
