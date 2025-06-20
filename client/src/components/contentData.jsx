import React from "react";
import { Link } from "react-router-dom";

export default function ContentData() {
  // Data dummy awal
  const campaigns = [
    {
      id: 1,
      title: "Jum'at Berkah",
      description: "Membantu yang membutuhkan",
      target: "Rp 10.000.000",
      collected: "Rp 8.500.000",
      image: "/images/jumat-berkah.jpg",
      link: "/jumat-berkah"
    },
    {
      id: 2,
      title: "Pembangunan Masjid",
      description: "Bantu pembangunan masjid",
      target: "Rp 50.000.000",
      collected: "Rp 32.000.000",
      image: "/images/masjid.jpg",
      link: "/masjid"
    },
    {
      id: 3,
      title: "Donasi",
      description: "Ulurkan tangan anda untuk membantu yang membutuhkan",
      image: "/images/donasi.jpg",
      link: "/donasi"
    },
    {
      id: 4,
      title: "Zakat",
      description: "Tunaikan zakat maal, fitrah, dan fidyah anda melalui kami",
      image: "/images/zakat.jpg",
      link: "/zakat"
    },
    {
      id: 5,
      title: "Wakaf",
      description: "Sedekahkan sebagian harta anda untuk kepentingan umat",
      image: "/images/wakaf.jpg",
      link: "/wakaf"
    },
    {
      id: 6,
      title: "Kurban",
      description: "Tunaikan kewajiban kurban sesuai syariat Islam bersama kami",
      image: "/images/kurban.jpg",
      link: "/kurban"
    }
  ];

  // Ambil hanya 4 pertama
  const visibleCampaigns = campaigns.slice(0, 4);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>LAYANAN KAMI</h2>
      <div style={styles.cardsContainer}>
        {visibleCampaigns.map((item) => (
          <div key={item.id} style={styles.card}>
            <img
              src={item.image}
              alt={item.title}
              style={styles.image}
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          <Link to={`/campaigns/${item.id}`} style={styles.link}>
  mulai {item.title.toLowerCase()} &gt;&gt;&gt;
</Link>

          </div>
        ))}
      </div>
    </div>
  );
}

// Inline responsive style
const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center"
  },
  heading: {
    marginBottom: "40px",
    fontSize: "28px",
    color: "#2e8b57"
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    justifyItems: "center"
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "250px"
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px"
  },
  link: {
    marginTop: "10px",
    display: "inline-block",
    color: "#2e8b57",
    fontWeight: "bold",
    textDecoration: "none"
  }
};
