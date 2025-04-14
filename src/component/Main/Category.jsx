import React, { useContext } from 'react';
import { DATA } from '../../Context/Datacontext';
import { Link } from 'react-router-dom';

function Category() {
  const { category } = useContext(DATA);

  return (
<>

<div className="grid px-2 pt-[50px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
      {category.slice(0, 4).map((item, i) => (
        <Link
          key={i}
          to={`/Product?category=${encodeURIComponent(item.name)}`}
          className="relative bg-gray-100 p-4 rounded-xl group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-300"
        >
          {/* 📌 Məhsul şəkli */}
          <div className="w-full h-[250px] overflow-hidden rounded-lg">
            <img
              src={`https://amore.cavidhuseynov.me${item.imgUrl}`}
              alt={item.name}
              className="w-full h-[220px] object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* 📌 Məhsulun adı (Şəkilin altına əlavə olunub) */}
          <div className="bg-gray-700 text-white text-center py-2 ">
            <h3 className="text-md font-semibold">{item.name}</h3>
          </div>
        </Link>
      ))}

    
    </div>
      <Link to={'Allcategory'}  className='border flex rounded-sm items-center hover:bg-[#de9f69] hover:text-white duration-300 justify-center w-[65%] xl:w-[20%] border-[#de9f69] text-center py-4 px-4 mt-12 mx-auto'>Bütün kateqoriyalara göz atın</Link>
</>
  );
}

export default Category;
