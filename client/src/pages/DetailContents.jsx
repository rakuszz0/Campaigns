import React from 'react';
import { useParams } from 'react-router-dom';

// Import Navbar & Footer
import Navbar from '../components/Navbar';
import WhyUs from '../components/Foot'; // Jika Foot adalah komponen footer

const DetailCampaign = () => {
  const { id } = useParams();

  // Data dummy detail (sementara)
  const campaigns = [
    {
      id: "1",
      title: "Jum'at Berkah",
      description: "Membantu yang membutuhkan",
      detail: "Ini halaman detail Jum'at Berkah. Anda dapat membaca info lengkap di sini."
    },
    {
      id: "2",
      title: "Pembangunan Masjid",
      description: "Bantu pembangunan masjid",
      detail: "Ini halaman detail Pembangunan Masjid."
    },
    {
      id: "3",
      title: "Donasi",
      description: "Ulurkan tangan anda untuk membantu yang membutuhkan",
      detail: "Halaman detail Donasi. Info lebih lanjut di sini."
    },
    {
      id: "4",
      title: "Zakat",
      description: "Tunaikan zakat maal, fitrah, dan fidyah anda melalui kami",
      detail: "Halaman detail Zakat. Informasi zakat lengkap."
    },
    // Tambah data sesuai kebutuhan
  ];

  // Temukan data sesuai id URL
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) return <div>Data tidak ditemukan</div>;

  return (
    <>
      <Navbar />

      <main style={{ maxWidth: '800px', margin: '50px auto', textAlign: 'center', padding: '20px' }}>
        <h1>{campaign.title}</h1>
        <img
          src={`https://via.placeholder.com/600x300?text=${campaign.title}`}
          alt={campaign.title}
          style={{ width: '100%', height: 'auto', marginBottom: '20px' }}/>
        <p>{campaign.description}</p>
        <p>{campaign.detail}</p>
      </main>

      <WhyUs /> {/* Atau ganti dengan Footer kalau sudah ada */}
    </>
  );
};

export default DetailCampaign;
