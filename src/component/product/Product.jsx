import React, { useContext, useState } from "react";
import { DATA } from "../../Context/Datacontext";
import { BASKET } from "../../Context/BasketContext";
import { LIKESDATA } from "../../Context/LikeContext";
import { useSearchParams, useNavigate } from "react-router-dom";

function Product() {
  const { mehsul } = useContext(DATA);
  const { sebet = [], bassketadd } = useContext(BASKET);
  const { toggleLike, likedItems } = useContext(LIKESDATA);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryName = searchParams.get("category");
  const filteredProducts = categoryName
    ? mehsul.filter((item) => item.categoryName === categoryName)
    : mehsul;

  return (
    <div className="max-w-7xl mx-auto py-[90px] px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Məhsullar - {categoryName || "Bütün Kateqoriyalar"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              sebet={sebet}
              bassketadd={bassketadd}
              toggleLike={toggleLike}
              likedItems={likedItems}
              navigate={navigate}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg font-semibold text-center col-span-full">
            Bu kateqoriyada məhsul tapılmadı!
          </p>
        )}
      </div>
    </div>
  );
}

function ProductCard({ item, sebet = [], bassketadd, toggleLike, likedItems, navigate }) {
  const [count, setCount] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(item.productVariants[0]?.variant?.name || "Boyuk");

  const selectedVariantPrice = item.productVariants?.find(
    (variant) => variant.variant.name === selectedVariant
  );

  const finalPrice = (item.discount > 0 ? item.finalPrice : item.price) * count + (selectedVariantPrice?.variant?.price || 0);
  const isInBasket = sebet.some((basketItem) => basketItem.id === item.id);
  
  // Check if the item is in favorites
  const isInFavorites = likedItems.some((likedItem) => likedItem.id === item.id);

  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      {/* Məhsul şəkli və endirim */}
      <a onClick={() => navigate(`/product/${item.id}`)} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover"
          src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
          alt={item.title}
        />
        {item.discount > 0 && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-red-500 px-2 text-center text-sm font-medium text-white">
            {item.discount} %
          </span>
        )}
      </a>

      {/* Məhsul başlığı və məlumatları */}
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">{item.title}</h5>
        <p className="text-sm text-gray-600">{item.categoryName}</p>
        <p className="text-sm text-gray-600">{item.description}</p>

        {/* Variant seçimi */}
        {item.productVariants && item.productVariants.length > 0 && (
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Ölçü seçimi:</label>
            <select
              className="w-full mt-1 p-2 border rounded-md"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {item.productVariants.map((variant) => (
                <option key={variant.variantId} value={variant.variant.name}>
                  {variant.variant.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Qiymət və say */}
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-2xl mr-2 font-bold text-slate-900">{finalPrice.toFixed(2)} ₼</span>
            <span className="text-sm text-slate-900 line-through">{item.price} ₼</span>
          </p>
        </div>

        {/* Say artırma */}
        <div className="flex items-center mb-5 justify-between bg-gray-100 px-3 py-2 rounded-lg mt-4">
          <button
            className="text-gray-700 text-lg font-bold"
            onClick={() => setCount(count > 1 ? count - 1 : 1)}
          >
            -
          </button>
          <span className="text-lg font-semibold">{count}</span>
          <button
            className="text-gray-700 text-lg font-bold"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>

        {/* Səbətə əlavə et düyməsi */}
        <button
          onClick={() => {
            if (!isInBasket) {
              bassketadd(
                item.title,
                item.about,
                item.id,
                `https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`,
                item.description,
                item.price,
                item.discount,
                item.finalPrice,
                count,
                selectedVariant // Seçilən variantı əlavə edirik
              );
            }
          }}
          className={`p-2 w-[95%] mx-auto flex items-center justify-center gap-3 rounded-lg font-semibold transition duration-200 ${
            isInBasket
              ? "bg-gray-300 text-gray-700 cursor-not-allowed" // Deaktiv düymə
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isInBasket ? (
            <>
              <span className="mr-2">✅</span>
              Səbətdədir
            </>
          ) : (
            <>
              <span className="mr-2">🛒</span>
              Səbətə at
            </>
          )}
        </button>

        {/* Sevimlilərə əlavə et / Sil düyməsi */}
        <button
          onClick={() => {
            toggleLike(item); // Toggle like (əlavə et və ya çıxar)
          }}
          className={`p-2 w-[95%] mx-auto my-3 flex items-center justify-center gap-3 rounded-lg font-semibold transition duration-200 ${
            isInFavorites
              ? "bg-gray-300 text-gray-700 cursor-not-allowed" // Deaktiv düymə
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
          disabled={isInFavorites} // Düymə deaktiv olur
        >
          {isInFavorites ? (
            <>
              <span className="mr-2">✅</span>
              Sevimlilərdədir
            </>
          ) : (
            <>
              <span className="mr-2">❤️</span>
              Sevimlilərə at
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Product;
