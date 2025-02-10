import React, { useContext } from 'react';
import { DATA } from '../../Context/Datacontext';
import { Link } from 'react-router-dom';

function Category() {
  const { data } = useContext(DATA);

  return (
    <>
      <div className="cat-head">
        <h1 className="text-3xl text-center font-semibold">☕ Premium Coffee Selections</h1>
      </div>

      <div className="grid pt-[50px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        {data.map((item, i) => (
          <Link
            key={i}
            to={`/Product?category=${encodeURIComponent(item.name)}`} // ✅ `name` URL-ə göndərilir
            className="relative bg-gradient-to-br from-[#FAFAFA] to-[#EDEDED] p-4 rounded-xl group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-300"
          >
            {/* 📌 Məhsul şəkli */}
            <div className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden rounded-lg">
              <img
                src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* 📌 Hover effekti üçün şüşə fon */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white">{item.name}</h3> {/* ✅ `title` istifadəçiyə göstərilir */}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Category;
