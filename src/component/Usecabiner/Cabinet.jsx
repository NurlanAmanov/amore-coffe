import React, { useContext, useState } from 'react';
import { CABINETDATA } from '../../Context/CabinetContext';
import Sifaris from './Sifaris';
import Acountinfo from './Acountinfo';

function Cabinet() {
  const [activeTab, setActiveTab] = useState('orders');



  return (
    <div className="p-6 py-[100px] w-full mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800">İstifadəçi Kabineti</h2>
      
      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mt-6 border-b pb-3">
        <button className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`} onClick={() => setActiveTab('orders')}>📦 Sifarişlərim</button>
        <button className={`px-4 py-2 ${activeTab === 'promo' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-600'}`} onClick={() => setActiveTab('promo')}>🎟️ Promokod</button>
        <button className={`px-4 py-2 ${activeTab === 'account' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-600'}`} onClick={() => setActiveTab('account')}>🛠 Hesab</button>
        <button className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-gray-500 text-gray-500' : 'text-gray-600'}`} onClick={() => setActiveTab('settings')}>⚙️ Ayarlar</button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'orders' && (
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📦 Sifarişlərim</h3>
          <Sifaris/>
          </div>
        )}

        {activeTab === 'promo' && (
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🎟️ Promokod</h3>
            <p className="mt-2 text-white/80">Endirimlər və xüsusi təkliflər üçün promokodları tətbiq edin.</p>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🛠 Hesab Məlumatlarını Düzənlə</h3>
            <p className="mt-2 text-white/80">Şəxsi məlumatlarınızı dəyişdirin və yeniləyin.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-gray-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">⚙️ Ayarlar</h3>
            <Acountinfo/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cabinet;