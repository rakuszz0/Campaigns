// EditCampaign.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WhyUs from '../components/Foot';

const EditCampaign = ({ campaigns, setCampaigns }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detail: ''
  });

  useEffect(() => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      setFormData({
        title: campaign.title,
        description: campaign.description,
        detail: campaign.detail
      });
    }
  }, [id, campaigns]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCampaigns = campaigns.map(c => 
      c.id === id ? { ...c, ...formData } : c
    );
    setCampaigns(updatedCampaigns);
    navigate(`/campaign/${id}`);
  };

  return (
    <>


      <main style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Edit Campaign</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Judul Campaign:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Deskripsi Singkat:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Detail Campaign:</label>
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              required
              rows="5"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={() => navigate(`/campaign/${id}`)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Batal
            </button>
          </div>
        </form>
      </main>

      <WhyUs />
    </>
  );
};

export default EditCampaign;