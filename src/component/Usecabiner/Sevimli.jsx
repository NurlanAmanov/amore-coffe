import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LIKESDATA } from '../../Context/LikeContext';

function Sevimli() {
  // Context-dən likeRemove funksiyasını götürürük
  const { likeRemove } = useContext(LIKESDATA);
  const [likedItems, setLikedItems] = useState([]); // Sevimli məhsulları saxlamaq üçün state

  // API-dan istifadəçi məlumatlarını çəkmək üçün funksiya
  const fetchFavoriteItems = async () => {
    try {
      const response = await axios.get(
        'https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Tokeni localStorage-dan alırıq
          }
        }
      );
      // API-dan gələn favoriteProducts siyahısını state-ə yükləyirik
      setLikedItems(response.data.favoriteProducts || []);
    } catch (error) {
      console.error('Sevimli məhsulları yükləmək xətası:', error);
    }
  };

  // Komponent yüklənəndə sevimli məhsulları çəkirik
  useEffect(() => {
    fetchFavoriteItems();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Sevimlilər
      </h2>

      {likedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {likedItems.map((item) => (
            <div key={item.productId} className="bg-white rounded-lg w-full max-w-xs mx-auto shadow-md overflow-hidden p-4">
              <img
                src={item.imgUrl} // Məhsulun şəkil ünvanı
                alt={item.productTitle}
                className="w-full h-52 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{item.productTitle}</h2>
              <button
                // İstifadəçi düyməyə klik etdikdə, likeRemove funksiyasını çağıraraq məhsulu id-sinə əsaslanaraq silirik
                onClick={() => likeRemove(item.productId)}
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

export default Sevimli;
