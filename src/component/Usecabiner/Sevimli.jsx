import React, { useContext } from 'react'
import { LIKESDATA } from '../../Context/LikeContext';

function Sevimli() {
    const { likedItems, toggleLike } = useContext(LIKESDATA); // ✅ Sevimlilər siyahısını götür
  
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Sevimlilər
        </h2>
  
        {likedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {likedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                {/* Məhsul şəkli */}
                <img
                  src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                  alt={item.name}
                  className="w-full h-52 object-cover rounded-lg"
                />
  
                {/* Məhsul məlumatları */}
                <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                <p className="text-gray-600">Qiymət: {item.price.toFixed(2)} ₼</p>
  
                {/* Sil düyməsi */}
                <button
                  onClick={() => toggleLike(item.name, item.id, item.imgUrl, item.price, item.discount, item.oldPrice)}
                  className="bg-red-500 text-white py-2 mt-2 w-full rounded-lg hover:bg-red-600 transition duration-200"
                >
                  ❌ Sevimlilərdən sil
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg font-semibold text-center">
            Sevimlilərdə məhsul yoxdur.
          </p>
        )}
      </div>
    );
}

export default Sevimli