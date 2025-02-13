import React, { useContext, useState } from "react";
import { DATA } from "../../Context/Datacontext";
import { BASKET } from "../../Context/BasketContext";
import { useSearchParams } from "react-router-dom";

function Product() {
  const { mehsul } = useContext(DATA);
  const { bassketadd } = useContext(BASKET);
  const [searchParams] = useSearchParams();

  const categoryName = searchParams.get("category");
  const filteredProducts = categoryName
    ? mehsul.filter((item) => item.categoryName === categoryName)
    : mehsul;

  // New state for selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Məhsullar - {categoryName || "Bütün Kateqoriyalar"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              bassketadd={bassketadd}
              setSelectedProduct={setSelectedProduct} // Set the selected product
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg font-semibold text-center col-span-full">
            Bu kateqoriyada məhsul tapılmadı.
          </p>
        )}
      </div>

      {/* Pop-up Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct} // Close the modal
        />
      )}
    </div>
  );
}

function ProductCard({ item, bassketadd, setSelectedProduct }) {
  const [count, setCount] = useState(1);
  const finalPrice = (item.discount > 0 ? item.finalPrice : item.price) * count;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full">
      <div className="relative">
        <img
          src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
          alt={item.title}
          className="w-full h-64 object-cover hover:scale-[1.1] duration-300 ease"
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
              <span className="text-lg font-bold text-green-600 text-sm text-gray-500 line-through">
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
        <div className="flex items-center justify-between my-3">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            onClick={() => setCount(count > 1 ? count - 1 : 1)}
          >
            -
          </button>
          <span className="text-lg font-semibold">{count}</span>
          <button
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
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

          <button
            onClick={() => setSelectedProduct(item)} // Open modal on click
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            Baxış
          </button>
        </div>
      </div>
    </div>
  );
}
function ProductModal({ product, setSelectedProduct }) {
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center pb-3 border-b border-gray-300">
          <h3 className="text-gray-800 text-xl font-bold flex-1">{product.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
            viewBox="0 0 320.591 320.591"
            onClick={() => setSelectedProduct(null)} // Close the modal when clicking the close icon
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            ></path>
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            ></path>
          </svg>
        </div>

        <div className="my-6">
          <img
            src={`http://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`}
            alt={product.title}
            className="w-full h-64 object-cover mb-4"
          />
          <p className="text-gray-600 text-sm leading-relaxed">{product.about}</p>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            <span className="font-bold">Qiymət: </span>{" "}
            {product.discount > 0 ? (
              <>
                <span className="line-through text-gray-500">{product.price} ₼</span>{" "}
                <span className="text-lg font-semibold text-green-600">{product.finalPrice} ₼</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-900">{product.price} ₼</span>
            )}
          </p>
        </div>

        <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            onClick={() => setSelectedProduct(null)} // Close the modal
          >
            Seçilmişlərə at
          </button>
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
        </div>
      </div>
    </div>
  );
}


export default Product;
