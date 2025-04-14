import React, { useState, useContext } from 'react';
import { DATA } from '../Context/Datacontext';

function Qrmenu() {
  const { category, mehsul } = useContext(DATA);
  
  // Modalın açılıb-bağlanmasını idarə edən state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Seçilmiş məhsul
  
  // Modal açılması
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  // Modal bağlanması
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="qrmenu-container block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        <div className="qrhead py-5 w-full">
          <div className="menu-category scrolbar py-2 flex items-center justify-start px-2 gap-2 overflow-x-scroll max-w-[95%] overflow-hidden">
            {/* Kategoriya düymələri */}
            {category.map((item, i) => (
              <button
                key={i}
                className="w-[40%] p-2 shadow-md border rounded-xl flex items-center justify-center"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="qr-main w-full">
          <div className="qr-main-title p-2 mt-4 bg-slate-100">
            <h3 className="text-[25px] font-bold uppercase">Kateqoriya Adı</h3>
            {mehsul.map((item, i) => (
              <div
                key={i}
                className="card my-12 bg-white w-full p-4 flex items-center justify-between gap-4"
                onClick={() => openModal(item)} // Məhsula tıklananda modal açılır
              >
                <div className="text w-[60%]">
                  <p className="text-[15px] font-bold uppercase">{item.title}</p>
                  {item.discount > 0 && (
                    <p className="text-[15px] font-bold bg-blue-600 text-white rounded-md text-center w-12 my-4 uppercase">
                      {item.discount} %
                    </p>
                  )}
                  {item.discount > 0 ? (
                    <>
                      <span className="text-blue-500 text-[15px] font-poppins font-semibold">
                        {item.finalPrice}₼
                      </span>
                      <span className="line-through text-gray-400 ml-2 text-[15px]">{item.price}₼</span>
                    </>
                  ) : (
                    <span className="text-blue-500 text-[15px] font-poppins font-bold">{item.price}₼</span>
                  )}
                  <p className="about text-gray-500 break-words font-medium text-sm">
                    Kateqoriya: {item.categoryName}
                  </p>
                </div>
                <div className="img w-[40%]">
                  <img
                    src={`https://amore.cavidhuseynov.me${item.imgUrl}`}
                    alt={item.title}
                    className="w-[100%] h-[100px] object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="modal-overlay px-3 fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white px-3 p-8 rounded-xl w-[400px] relative">
            {/* X düyməsi */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-xl font-bold text-gray-500"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              X
            </button>
            <h3 className="text-[25px] font-bold uppercase">{selectedProduct.title}</h3>
            <img
              src={`https://amore.cavidhuseynov.me${selectedProduct.imgUrl}`}
              alt={selectedProduct.title}
              className="w-full h-[200px] object-cover rounded-md my-4"
            />

<p className="text-[18px] text-gray-400 mt-4"> {selectedProduct.description}</p>
            {selectedProduct.discount > 0 ? (
              <>
                <span className="text-blue-500 text-[20px] font-poppins font-semibold">
                  {selectedProduct.finalPrice}₼
                </span>
                <span className="line-through text-gray-400 ml-2 text-[20px]">{selectedProduct.price}₼</span>
              </>
            ) : (
              <span className="text-blue-500 text-[20px] font-poppins font-bold">
                {selectedProduct.price}₼
              </span>
            )}
            {selectedProduct.discount > 0 && (
              <p className="text-[18px] text-red-500 mt-4">Endirim: {selectedProduct.discount}%</p>
            )}
                       
          </div>
        </div>
      )}
    </>
  );
}

export default Qrmenu;
