import React, { useContext } from "react";
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

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Məhsullar - {categoryName || "Bütün Kateqoriyalar"}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((item, i) => (



      <div className="rounded-lg border  border-gray-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2">
      {/* 📌 Məhsul şəkli */}
      <div className="h-56 w-full flex items-center justify-center">
        <a href="#">
          <img
            className="mx-auto h-full"
            src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
            alt={item.title}
          />
        </a>
      </div>

      {/* 📌 Məhsul məlumatları */}
      <div className="pt-6">
        {/* Endirim etiketi */}
        {item.discount > 0 && (
          <span className="rounded bg-blue-400 px-2.5 py-0.5 text-xs font-medium text-white">
            -{item.discount}%
          </span>
        )}

        {/* Məhsul adı */}
        <a href="#" className="block mt-2 text-lg font-semibold leading-tight text-gray-900 hover:underline">
          {item.title}
        </a>

        {/* 📌 Qiymət və Endirim */}
        <div className="mt-2 flex items-center justify-between">
          {item.discount > 0 ? (
            <>
              <span className="text-gray-400 line-through text-sm">{item.price} ₼</span>
              <span className="text-lg font-bold text-red-500">{item.finalPrice} ₼</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">{item.price} ₼</span>
          )}
        </div>
        <span className="font-semibold mt-2 flex items-center gap-4 text-gray-700 text-sm">{item.about}</span>
        {/* 📌 Xüsusiyyətlər */}
        <ul className="mt-2 flex items-center gap-4 text-gray-700 text-sm">
          <li>Ölçü: <span className="font-semibold">{item.size}</span></li>
          <li>Şəkər: <span className="font-semibold">{item.sugar}</span></li>
          <li>Şəkər: </li>
        </ul>

        {/* 📌 Səbətə at düyməsi */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() =>
              bassketadd(
                item.title,
                item.desciption,
                item.id,
                item.about,
                item.imgUrl,
                item.discount > 0 ? item.finalPrice : item.price // Əgər endirim varsa finalPrice, yoxdursa price göndərilir
              )
            }
            type="button"
            className="inline-flex items-center rounded-lg bg-[#7a461f] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#eaddd5] hover:text-black transition-all"
          >
            <svg
              className="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Səbətə at
          </button>
        </div>
      </div>
    </div>
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

export default Product;
