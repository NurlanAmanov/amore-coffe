import React from "react";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Irish Cream Dream",
    brand: "Amore Coffee",
    image: "https://readymadeui.com/images/coffee2.webp",
  },
  {
    name: "Espresso Delight",
    brand: "Amore Coffee",
    image: "https://readymadeui.com/images/coffee2.webp",
  },
  {
    name: "Caramel Latte Bliss",
    brand: "Amore Coffee",
    image: "https://readymadeui.com/images/coffee2.webp",
  },
  {
    name: "Mocha Magic",
    brand: "Amore Coffee",
    image: "https://readymadeui.com/images/coffee2.webp",
  },
];

const CategoryCard = ({ category }) => {
  return (
    <Link to={'/Product'} className="relative bg-gradient-to-br from-[#FAFAFA] to-[#EDEDED] p-4 rounded-xl group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-300">
      {/* 📌 Məhsul şəkli */}
      <div className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden rounded-lg">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 📌 Hover effekti üçün şüşə fon */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-white">{category.name}</h3>
        <h4 className="text-sm text-gray-300">{category.brand}</h4>
      </div>
    </Link>
  );
};

const Category = () => {
  return (
    <div className="font-sans py-10 mx-auto max-w-[95%]">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
        ☕ Premium Coffee Selections
      </h2>

      {/* 📌 Kategoriya Grid (Mobil və Desktop uyğun) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>

      {/* 📌 Bütün Kateqoriyalar Linki */}
      <Link
        to={"/allcategory"}
        className="flex items-center justify-center gap-4 mt-10 cursor-pointer hover:text-gray-700 transition-all duration-300"
      >
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
          Bütün Məhsullara Bax
        </h2>
        <MdArrowForward className="text-2xl sm:text-3xl" />
      </Link>
    </div>
  );
};

export default Category;
