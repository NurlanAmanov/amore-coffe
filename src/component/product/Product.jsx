import React, { useContext, useState } from "react";
import { DATA } from "../../Context/Datacontext";
import { BASKET } from "../../Context/BasketContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LIKESDATA } from "../../Context/LikeContext";

function Product() {
  const { mehsul } = useContext(DATA);
  const { sebet = [], bassketadd, bassketadd2 } = useContext(BASKET);
  const { toggleLike } = useContext(LIKESDATA);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const categoryName = searchParams.get("category");

  const filteredProducts = mehsul.filter((item) => {
    return (!categoryName || item.categoryName === categoryName) &&
           (!minPrice || Number(item.price) >= Number(minPrice)) &&
           (!maxPrice || Number(item.price) <= Number(maxPrice));
  });

  const handleFilter = () => {
    console.log("Filter applied:", { minPrice, maxPrice });
  };

  return (
    <>
      <div className="bg-[#F2F2F2] flex items-center justify-center h-[90px] pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-medium text-center text-black mb-10 font-playfair tracking-widest">
            {categoryName || "Bütün Kateqoriyalar"}
          </h2>
        </div>
      </div>

      <div className="container mx-auto mt-20">
        <div className="flex flex-col xl:flex-row">
          <div className="xl:w-3/12 w-full p-4">
            <div className="mb-4">
              <label className="block font-medium text-lg">Qiymət ▼</label>
              <div style={{ display: "flex", gap: "20px" }}>
                <input type="number" placeholder="Min" className="mt-2 block w-full p-2 border rounded" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <input type="number" placeholder="Max" className="mt-2 block w-full p-2 border rounded" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>
              <button className="w-full mt-3 bg-[#d9d9d9] text-black py-2 rounded hover:bg-[#DB9457] hover:text-[#f7f7f7] transition-colors duration-500" onClick={handleFilter}>Filter</button>
            </div>
          </div>

          <ProductList
            filteredProducts={filteredProducts}
            toggleLike={toggleLike}
            bassketadd={bassketadd}
            navigate={navigate}
          />
        </div>
      </div>
    </>
  );
}

function ProductList({ filteredProducts, bassketadd, toggleLike, navigate }) {
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else if (sortOrder === "high-to-low") {
      return b.price - a.price;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleProductClick = (id) => {
    navigate(`/ProductDetail/${id}`);
  };

  return (
    <div className="xl:w-9/12 w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <select
          className="text-black p-2 rounded-md border border-gray-950"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Varsayılan</option>
          <option value="low-to-high">Azdan Çoxa</option>
          <option value="high-to-low">Çoxdan Aza</option>
        </select>
      </div>
      <div className="grid grid-cols-1 mx-auto xl:grid-cols-3 gap-4">
        {paginatedProducts.map((item) => (
          <div
            className="relative bg-[#b5b5b5] rounded-lg shadow-md overflow-hidden lg:w-[280px]"
            key={item.id}
          >
            <div 
              className="relative w-full h-[330px]" 
              onClick={() => handleProductClick(item.id)} // Burada tıkladığında yönlendirecek
            >
              {/* Discount Box */}
              <div className="absolute top-0 left-0 bg-red-500 text-white text-[15px] font-[Playfair Display] px-2 py-1 rounded-br-lg">
                %10
              </div>
              <img
                src={`https://amore.cavidhuseynov.me/swagger/index.html${item.imgUrl}`}
                alt={item.title}
                className="absolute top-0 left-0 w-full lg:w-[280px] lg:h-[330px] h-full object-cover"
                // style={{ width: "280px", height: "330px" }}
              />
              {/* Heart Icon (Favorilere Ekle) */}
              <button
                onClick={() => {
                  const product = {
                    id: item.id,
                    title: item.title,
                    about: item.about,
                    imgUrl: `https://amore.cavidhuseynov.me/swagger/index.html${item.imgUrl}`,
                    description: item.description,
                    price: item.price,
                    finalPrice: item.finalPrice
                  };
                  toggleLike(product);
                }}
                className="absolute top-[10px] right-[10px] shadow-lg p-1 pr-3 pl-3 rounded-full border-2 border-white text-white bg-transparent hover:bg-[#DB9457] transition-all duration-300"
                style={{ fontSize: "20px" }}
              >
                ♥
              </button>
            </div>
            <div className="relative w-full p-2 text-center">
              <h2
                className="text-lg font-normal text-black tracking-wide"
                style={{ fontFamily: 'Playfair Display' }}
              >
                {item.title}
              </h2>
              <div className="text-[#fff] text-lg font-medium text-center">
                {item.finalPrice}₼
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#333] text-white hover:bg-[#555]"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded-md ${currentPage === page + 1 ? "bg-[#DB9457] text-white" : "bg-[#333] text-white hover:bg-[#555]"}`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          
          <button
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#333] text-white hover:bg-[#555]"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
