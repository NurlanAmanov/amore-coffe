import React, { useState, useEffect } from "react";
import axios from "axios";

function AccountInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("İstifadəçi token tapılmadı.");
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
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
          setUserInfo(response.data);
        } else {
          throw new Error("Profil məlumatları tapılmadı.");
        }
      } catch (error) {
        setError("Məlumatlar yüklənərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleProfilePhotoChange = async () => {
    if (!newProfilePhoto) {
      setError("Lütfən, bir şəkil seçin.");
      return;
    }
  
    const formData = new FormData();
    formData.append("File", newProfilePhoto); 
    formData.append("FolderName", "userphoto"); 
  
    try {
      
      const response = await axios.post(
        "https://finalprojectt-001-site1.jtempurl.com/api/UploadFile/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );
  
      const imgUrl = response.data.imgUrl; 
  
      const updateResponse = await axios.post(
        "https://finalprojectt-001-site1.jtempurl.com/api/Auth/Update-Own-Photo-In-Cabinet",
        {
          id: userInfo.id, 
          imgUrl: imgUrl, 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUserInfo((prevState) => ({
        ...prevState,
        imgUrl: imgUrl,
      }));
  
      alert("Profil şəkiliniz uğurla yeniləndi!");
    } catch (error) {
      setError("Şəkil yüklənərkən xəta baş verdi.");
      console.error("Error uploading profile photo:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">İstifadəçi Məlumatları</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Məlumatlar yüklənir...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : userInfo ? (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-center w-full p-4">
            <img
              src={`https://finalprojectt-001-site1.jtempurl.com${userInfo.imgUrl}`}
              alt="Profile"
              className="w-[120px] object-contain mx-auto rounded-full"
            />
          </div>

          <div className="flex flex-col justify-center mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProfilePhoto(e.target.files[0])}
              className="border p-2 rounded-lg"
            />
            <button
              onClick={handleProfilePhotoChange}
              className="bg-blue-500 w-[40%]  my-3 text-white p-2 rounded-lg mx-auto"
            >
              Profil Şəkilini Yenilə
            </button>
          </div>

          <table className="w-full text-left border-collapse mt-4">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold">Ad:</td>
                <td className="p-2">{userInfo.name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Soyad:</td>
                <td className="p-2">{userInfo.surName}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Email:</td>
                <td className="p-2">{userInfo.email}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">İstifadəçi Adı:</td>
                <td className="p-2">{userInfo.userName}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">İstifadəçi ID:</td>
                <td className="p-2">{userInfo.id}</td>
              </tr>
            </tbody>
          </table>
          
          {userInfo.userPromocodes && userInfo.userPromocodes.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Promokodlar</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Kod</th>
                    <th className="p-2">Endirim Faizi</th>
                    <th className="p-2">Bitmə Tarixi</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.userPromocodes.map((promo) => (
                    <tr key={promo.id}>
                      <td className="p-2">{promo.promocode.code}</td>
                      <td className="p-2">{promo.promocode.discountPercentage}%</td>
                      <td className="p-2">{new Date(promo.promocode.expirationDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      ) : (
        <p className="text-center text-gray-500">İstifadəçi məlumatları mövcud deyil.</p>
      )}
    </div>
  );
}

export default AccountInfo;
