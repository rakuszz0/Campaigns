import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API, getImageUrl } from '../config/api';
import { UserContext } from '../context/userContext';

const dummyCampaigns = [
  {
    id: "1",
    title: "Wakaf Inkubator untuk Bayi Kritis di NICU",
    description: "Wakaf Alat Kesehatan, Selamatkan Hidup Bayi di NICU",
    start: "2025-06-01T00:00:00Z",
    end: "2025-08-31T00:00:00Z",
    cpocket: "BCA 12345678 a.n AmalSAS",
    status: "Active",
    photo: "https://via.placeholder.com/600x400?text=Inkubator+NICU",
    total_collected: 40182010,
    user_id: 1,
    user_name: "AmalSAS Foundation",
    created_at: "2025-06-01T00:00:00Z"
  },
];

const DetailCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const isAdmin = state.isLogin && state.user?.is_admin;

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", process.env.REACT_APP_MIDTRANS_CLIENT_KEY);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await API.get(`/campaigns/${id}`);
        setCampaign(res.data.data);
      } catch (err) {
        console.warn("Data gagal diambil dari server, fallback ke dummy");
        const fallback = dummyCampaigns.find(c => c.id === id);
        setCampaign(fallback || null);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleDonate = async () => {
    if (!state.isLogin) {
      if (window.confirm("Anda belum login. Ingin menuju ke halaman login sekarang?")) {
        return navigate("/login");
      }
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Masukkan jumlah donasi yang valid.");
      return;
    }

    try {
      const res = await API.post("/donations", {
        amount: Number(amount),
        status: "pending",
        user_id: state.user.id,
        campaign_id: Number(id),
      });

      const token = res.data.data.payment_url;
      window.snap.pay(token, {
        onSuccess: () => navigate("/donation-success"),
        onPending: () => navigate("/donation-pending"),
        onError: (err) => console.error(err),
        onClose: () => alert("Transaksi dibatalkan."),
      });
    } catch (err) {
      console.error("Gagal memproses donasi:", err);
    }
  };

  if (!campaign) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Data tidak ditemukan</div>;
  }

  const targetAmount = campaign.target_total || 0;
  const collected = campaign.total_collected || 0;
  const percent = targetAmount > 0 ? (collected / targetAmount) * 100 : 0;
  const remainingDays = Math.max(
    Math.ceil((new Date(campaign.end) - new Date()) / (1000 * 60 * 60 * 24)),
    0
  );

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '40px 5%',
      gap: '40px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <div style={{ flex: '1 1 600px', maxWidth: '600px' }}>
        <img src={getImageUrl(campaign.photo)} alt={campaign.title} style={{
          width: '100%',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }} />
      </div>

      <div style={{
        flex: '1 1 400px',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        minWidth: '320px'
      }}>
        <div style={{ marginBottom: '15px', fontSize: '14px', color: '#777' }}>{campaign.category}</div>
        <h2 style={{ fontSize: '22px', marginBottom: '10px', color: '#222' }}>{campaign.title}</h2>
        <div style={{ marginBottom: '10px', color: '#888', fontSize: '14px' }}>📍 {campaign.location}</div>
        <div style={{ marginBottom: '15px', color: '#555' }}><strong>{campaign.user_name}</strong></div>
        <div style={{
          backgroundColor: '#e6f4ea',
          color: '#207a41',
          padding: '8px 12px',
          borderRadius: '5px',
          fontSize: '14px',
          marginBottom: '20px'
        }}>
          Penggalangan ini bagian dari Donasi {campaign.category}
        </div>

        <div style={{
          fontSize: '22px',
          fontWeight: '600',
          color: '#388e3c',
          marginBottom: '5px'
        }}>
          Rp {campaign.total_collected.toLocaleString('id-ID')}
        </div>
        <div style={{ fontSize: '13px', marginBottom: '15px', color: '#666' }}>
          {percent.toFixed(2)}% dari target Rp {targetAmount.toLocaleString('id-ID')}
        </div>

        <div style={{
          height: '10px',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          overflow: 'hidden',
          marginBottom: '15px'
        }}>
          <div style={{
            height: '100%',
            width: `${percent}%`,
            backgroundColor: '#4caf50'
          }} />
        </div>

        <div style={{
          fontSize: '13px',
          color: '#666',
          marginBottom: '20px'
        }}>
          ⏳ {remainingDays} hari lagi
        </div>

        {state.isLogin ? (
          <>
            <input
              type="number"
              placeholder="Masukkan nominal donasi"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />

            <button
              onClick={handleDonate}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '20px'
              }}
            >
              Donasi Sekarang
            </button>
          </>
        ) : (
          <div style={{
            color: 'red',
            fontWeight: '500',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            Anda belum login.{" "}
            <span
              onClick={() => navigate('/login')}
              style={{
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Login sekarang
            </span>{" "}
            untuk berdonasi.
          </div>
        )}

        {isAdmin && (
          <div style={{ marginTop: '30px' }}>
            <button
              onClick={() => navigate(`/admin/campaigns/edit/${id}`)}
              style={{
                padding: '10px 16px',
                marginRight: '10px',
                backgroundColor: '#1976D2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm("Yakin ingin menghapus campaign ini?"))
                  navigate('/');
              }}
              style={{
                padding: '10px 16px',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCampaign;
