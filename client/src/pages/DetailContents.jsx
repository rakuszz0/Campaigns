// DetailCampaign.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WhyUs from '../components/Foot';

const DetailCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdmin] = useState(true); // In a real app, this would come from auth context

  // State for campaigns (in a real app, this would come from an API)
  const [campaigns, setCampaigns] = useState([
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
  ]);

  const campaign = campaigns.find((c) => c.id === id);

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus campaign ini?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
      navigate('/');
    }
  };

  if (!campaign) return <div>Data tidak ditemukan</div>;

  return (
    <>


      <main style={{ maxWidth: '800px', margin: '50px auto', textAlign: 'center', padding: '20px' }}>
        <h1>{campaign.title}</h1>
        <img
          src={`https://via.placeholder.com/600x300?text=${campaign.title}`}
          alt={campaign.title}
          style={{ width: '100%', height: 'auto', marginBottom: '20px' }}/>
        <p>{campaign.description}</p>
        <p>{campaign.detail}</p>

        {isAdmin && (
          <div style={{ marginTop: '30px' }}>
            <button 
              onClick={() => navigate(`/edit-campaign/${id}`)}
              style={{
                padding: '8px 16px',
                marginRight: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit Campaign
            </button>
            <button 
              onClick={handleDelete}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Hapus Campaign
            </button>
          </div>
        )}
      </main>

      <WhyUs />
    </>
  );
};

export default DetailCampaign;