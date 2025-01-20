import React, { useState } from "react";

const CoffeeSuggestion = () => {
  const [zodiac, setZodiac] = useState("");
  const [gender, setGender] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const coffeeSuggestions = {
    aries: {
      text: "Qoç üçün Espresso - enerjili başlanğıc!",
      image: "https://via.placeholder.com/150?text=Espresso",
    },
    taurus: {
      text: "Buğa üçün Mocha - zərif və şirin.",
      image: "https://via.placeholder.com/150?text=Mocha",
    },
    gemini: {
      text: "Əkizlər üçün Americano - sadə və zövqlü.",
      image: "https://via.placeholder.com/150?text=Americano",
    },
    cancer: {
      text: "Xərçəng üçün Latte - isti və yumşaq.",
      image: "https://via.placeholder.com/150?text=Latte",
    },
    leo: {
      text: "Şir üçün Cappuccino - güclü və təsirli.",
      image: "https://via.placeholder.com/150?text=Cappuccino",
    },
    virgo: {
      text: "Qız üçün Flat White - dəqiq və balanslı.",
      image: "https://via.placeholder.com/150?text=Flat+White",
    },
    libra: {
      text: "Tərəzi üçün Macchiato - mükəmməl harmoniya.",
      image: "https://via.placeholder.com/150?text=Macchiato",
    },
    scorpio: {
      text: "Əqrəb üçün Turkish Coffee - dərin və sirli.",
      image: "https://via.placeholder.com/150?text=Turkish+Coffee",
    },
    sagittarius: {
      text: "Oxatan üçün Cold Brew - sərbəst və sərin.",
      image: "https://via.placeholder.com/150?text=Cold+Brew",
    },
    capricorn: {
      text: "Oğlaq üçün Black Coffee - ciddi və güclü.",
      image: "https://via.placeholder.com/150?text=Black+Coffee",
    },
    aquarius: {
      text: "Dolça üçün Iced Latte - fərqli və modern.",
      image: "https://via.placeholder.com/150?text=Iced+Latte",
    },
    pisces: {
      text: "Balıqlar üçün Caramel Latte - şirin və xəyalpərəst.",
      image: "https://via.placeholder.com/150?text=Caramel+Latte",
    },
  };

  const handleSuggestion = () => {
    if (!zodiac || !gender) {
      setSuggestion("Zəhmət olmasa, burcunuzu və cinsinizi seçin.");
      return;
    }

    const selectedCoffee = coffeeSuggestions[zodiac];
    setSuggestion(selectedCoffee);
  };

  return (
    <section className="py-10 px-4 bg-gradient-to-br from-gray-100 to-indigo-100 text-center rounded-lg shadow-lg">
  <h2 className="font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-6">
    Burcunu Seç və Kofeni Tap!
  </h2>
  <p className="text-gray-800 text-lg sm:text-xl mb-8">
    Burcuna və zövqünə uyğun kofe təklifini kəşf et!
  </p>

  <div className="mb-6">
    <label
      htmlFor="zodiac"
      className="block text-lg font-medium text-gray-700 mb-2"
    >
      Burcunuzu seçin:
    </label>
    <select
      id="zodiac"
      className="w-full max-w-xs mx-auto border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      value={zodiac}
      onChange={(e) => setZodiac(e.target.value)}
    >
      <option value="">Burcunuzu seçin</option>
      {Object.keys(coffeeSuggestions).map((key) => (
        <option value={key} key={key}>
          {key[0].toUpperCase() + key.slice(1)}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-8">
    <label
      htmlFor="gender"
      className="block text-lg font-medium text-gray-700 mb-2"
    >
      Cinsinizi seçin:
    </label>
    <select
      id="gender"
      className="w-full max-w-xs mx-auto border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
    >
      <option value="">Cinsinizi seçin</option>
      <option value="female">Qadın</option>
      <option value="male">Kişi</option>
    </select>
  </div>

  <button
    onClick={handleSuggestion}
    className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
  >
    Kofeni Tap
  </button>

  {suggestion && suggestion.text && (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-indigo-600 mb-4">
        {suggestion.text}
      </h3>
      <img
        src={suggestion.image}
        alt={suggestion.text}
        className="rounded-lg shadow-lg w-full"
      />
    </div>
  )}
</section>

  );
};

export default CoffeeSuggestion;
