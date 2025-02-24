import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoStar, IoStarOutline } from "react-icons/io5"; // Ulduz ikonları

function Coment({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);  // 🔥 Kullanıcı bilgilerini saklayacağız
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // 🔹 İstifadəçi məlumatlarını `Auth/profile` API-dən çəkmək
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://finalprojectt-001-site1.jtempurl.com/api/Auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          setUserName(response.data.userName);
          setUserInfo(response.data);  // 🔥 Şəkil (imgUrl) daxil olmaqla məlumatları alırıq
        }
      } catch (error) {
        console.error("İstifadəçi məlumatları yüklənmədi:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // 🔹 Məhsulun `ID`-sinə görə `Review` API-dən şərhləri çəkmək
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://finalprojectt-001-site1.jtempurl.com/api/Review/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setReviews(response.data);
      } catch (error) {
        setError("Şərhləri yükləmək mümkün olmadı.");
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // 🔹 Yeni şərh əlavə etmək
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !token) {
      setError("Şərh yazmaq üçün daxil olun.");
      return;
    }

    const newComment = {
      productId: productId,
      userName: userName, // 🔥 Profil API-dən gələn istifadəçi adı
      rating: rating,
      comment: comment,
    };

    try {
      const response = await axios.post(
        "https://finalprojectt-001-site1.jtempurl.com/api/Review",
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReviews([...reviews, response.data]);
      setComment("");
      setRating(5);
    } catch (error) {
      setError("Şərh əlavə edilərkən xəta baş verdi.");
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
    <h2 className="text-xl font-semibold">Rəylər</h2>
  
    {error && <p className="text-red-500">{error}</p>}
  
    {reviews.length > 0 ? (
      reviews.map((review, index) => (
        <div key={index} className="border-b pb-2 mt-2 flex items-start justify-start flex-col">
          <div className="flex items-center justify-between w-full">
            <p className="font-semibold">{review.userName}</p>
            
            {/* 🔥 Şəkili yuxarı sağ küncə yerləşdiririk */}
            {review.imgUrl ? (
              <img
                src={`https://finalprojectt-001-site1.jtempurl.com${review.imgUrl}`}  // Şərh verən şəxsin şəkili
                alt="Profile"
                className="w-[50px] object-contain rounded-full"
              />
            ) : userInfo && userInfo.imgUrl ? (
              <img
                src={`https://finalprojectt-001-site1.jtempurl.com${userInfo.imgUrl}`}  // İstifadəçinin öz şəkili
                alt="Profile"
                className="w-[50px] object-contain rounded-full"
              />
            ) : (
              <img
                src="/default-profile.png"
                alt="Default Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
          </div>
  
          {/* ⭐⭐⭐⭐⭐ Ulduzlar */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              i < review.rating ? (
                <IoStar key={i} className="text-yellow-500" />
              ) : (
                <IoStarOutline key={i} className="text-gray-400" />
              )
            ))}
          </div>
  
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">Bu məhsula hələ şərh yazılmayıb.</p>
    )}
  
    {userName && (
      <form className="mt-4" onSubmit={handleCommentSubmit}>
        <h3 className="text-lg font-semibold">Şərh əlavə et</h3>
        <div>
          <label className="block text-gray-700 font-medium">Reytinq:</label>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                className="focus:outline-none"
              >
                {i < rating ? (
                  <IoStar className="text-yellow-500 text-2xl" />
                ) : (
                  <IoStarOutline className="text-gray-400 text-2xl" />
                )}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="w-full border p-2 mt-2 rounded-lg"
          placeholder="Rəy əlavə et"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 bg-black text-white px-5 py-2 rounded-lg"
        >
          Göndər
        </button>
      </form>
    )}
  </div>
  
  );
}

export default Coment;
