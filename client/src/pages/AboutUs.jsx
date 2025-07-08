import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 flex-grow">
        {/* Text Section */}
        <div className="flex-1 min-w-[300px] p-5 md:pr-10">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6 text-center md:text-left">
            About Us
          </h1>
          <p className="text-lg text-gray-700 mb-4 text-center md:text-left">
            Sulit Air Sepakat (SAS) adalah organisasi sosial kemasyarakatan yang menghimpun masyarakat asal Nagari Sulit Air, baik yang berada di kampung maupun di perantauan.
            Salah satu bentuk komitmen kami terhadap kepedulian sosial dan pembangunan umat adalah melalui program Jumat Berkah.


          </p>
          <p className="text-lg text-gray-700 mb-6 text-center md:text-left">
            Melalui program ini, kami membuka kesempatan seluas-luasnya kepada para donatur untuk berkontribusi dalam bentuk donasi uang guna pembangunan gedung sosial/keagamaan, 
            serta mendukung kegiatan lainnya seperti Zakat, Qurban, Infaq, dan Sedekah.

          </p>
          <p className="text-lg text-gray-700 mb-6 text-center md:text-left">
            Kini, kami menghadirkan platform donasi online berbasis website agar semua proses dapat dilakukan lebih mudah, transparan, dan efisien. Website ini memungkinkan siapa saja, 
            dari mana saja, untuk berdonasi dan ikut serta dalam membangun kebaikan bersama.
          </p>

        </div>

        {/* Image Section */}
        <div className="flex-1 min-w-[300px] flex justify-center items-center p-5">
          <div className="w-full max-w-[400px] h-[400px] bg-green-200 rounded-xl flex justify-center items-center shadow-lg overflow-hidden">
            {/* Replace with an actual image */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Our Team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;