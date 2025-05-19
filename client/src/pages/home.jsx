import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-5">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md mb-10">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="AmalSAS.id" className="w-10 h-10" />
          <span className="text-green-600 font-bold text-xl">AmalSAS.id</span>
        </div>
        <div className="flex items-center gap-4">
          <input type="text" placeholder="cari program" className="border border-gray-300 rounded-lg py-1 px-2" />
          <button className="bg-green-600 text-white py-1 px-3 rounded-lg">🔍</button>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-green-600 text-white py-1 px-4 rounded-lg">MASUK</button>
          <button className="bg-green-600 text-white py-1 px-4 rounded-lg">DAFTAR</button>
        </div>
      </div>

      {/* Layanan Kami Section */}
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-10">LAYANAN KAMI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {['jumat berkah', 'donasi', 'zakat', 'wakaf', 'kurban'].map((service, index) => (
            <div key={index} className="flex flex-col items-center p-5 bg-gray-100 rounded-lg">
              <div className="w-16 h-16 bg-green-200 mb-4 rounded-full"></div>
              <h3 className="text-lg font-bold text-green-600 mb-2">{service}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">Deskripsi layanan {service}</p>
              <a href="#" className="text-green-500 text-sm">mulai {service} &gt;&gt;&gt;</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;