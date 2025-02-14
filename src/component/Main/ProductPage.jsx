import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DATA } from "../../Context/Datacontext"; 
import { BASKET } from "../../Context/BasketContext";
import Product from "../product/Product";
import Teklifler from "../product/Teklifler";
function ProductPage() {
  const { id } = useParams(); 
  const { mehsulid, fetchProductById } = useContext(DATA); 
  const { bassketadd } = useContext(BASKET);
  useEffect(() => {
    fetchProductById(id); 
  }, [id]);

  if (!mehsulid) {
    return <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96 ">
    <div className="h-48 rounded-t dark:bg-gray-300"></div>
    <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
      <div className="w-full h-6 rounded dark:bg-gray-300"></div>
      <div className="w-full h-6 rounded dark:bg-gray-300"></div>
      <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
    </div>
  </div>;
  }

  return (
   <>
  <div className="font-sans bg-white pt-[80px] px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center max-w-6xl mx-auto">
        {/* Şəkil bölməsi */}
        <div className="w-full flex justify-center">
          <img
            src={`https://finalprojectt-001-site1.jtempurl.com${mehsulid.imgUrl}`}
            alt={mehsulid.title}
            className="w-full lg:w-[60%] max-w-md object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Məhsul məlumatları */}
        <div className="max-w-lg mx-auto">
          <h3 className="text-2xl font-bold text-gray-800">{mehsulid.title}</h3>
          <p className="text-gray-500 mt-2">{mehsulid.about}</p>

          {/* Taglar */}
          <div className="flex flex-wrap gap-2 mt-3">
            {mehsulid.tags && mehsulid.tags.length > 0 ? (
              mehsulid.tags.map((tagItem) => (
                <span
                  key={tagItem.tag.id}
                  className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded"
                >
                  {tagItem.tag.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">Tag yoxdur</span>
            )}
          </div>

          {/* Qiymət */}
          <div className="flex items-center gap-3 mt-4">
            {mehsulid.discount > 0 ? (
              <>
                <p className="text-gray-800 text-2xl font-bold">{mehsulid.finalPrice} ₼</p>
                <p className="text-gray-500 text-base line-through">{mehsulid.price} ₼</p>
                <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">-{mehsulid.discount}%</span>
              </>
            ) : (
              <p className="text-xl font-semibold text-gray-900">{mehsulid.price} ₼</p>
            )}
          </div>

          {/* Seçimlər */}
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {/* Ölçü seçimi */}
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-bold text-gray-800">Ölçü seçin:</h3>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                <option value="small">Kiçik</option>
                <option value="medium">Orta</option>
                <option value="large">Böyük</option>
              </select>
            </div>

            {/* Şəkər dərəcəsi seçimi */}
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-bold text-gray-800">Şəkər dərəcəsi:</h3>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                <option value="low">Az şəkərli</option>
                <option value="medium">Şəkərli</option>
                <option value="high">Tam şəkərli</option>
              </select>
            </div>
          </div>

          {/* Düymələr */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded">
              Sevimlilərə at
            </button>
            <button
              onClick={() => {
                bassketadd(
                  mehsulid.title,
                  mehsulid.about,
                  mehsulid.id,
                  `https://finalprojectt-001-site1.jtempurl.com${mehsulid.imgUrl}`,
                  mehsulid.description,
                  mehsulid.price,
                  mehsulid.discount,
                  mehsulid.finalPrice
                );
              }}
              className="w-full px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
            >
              Səbətə at
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="prduct">
      <Teklifler/>
    </div>
   </>
    
  );
}

export default ProductPage;
