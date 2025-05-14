import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <div className="logo">AmaiSAS.id</div>
        <div className="search">
          <input type="text" placeholder="cari program" />
        </div>
        <div className="auth-buttons">
          <button className="login">MASUK</button>
          <button className="register">DAFTAR</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">LAYANAN KAMI</h1>
        
        {/* Services Grid */}
        <div className="services-grid">
          <div className="service-card">
            <h3>jum'at berkah</h3>
            <p>ulurkan tangan anda untuk membantu yang membutuhkan</p>
            <button className="action-button">mulai sedekah&gt;&gt;&gt;</button>
          </div>
          
          <div className="service-card">
            <h3>danasi</h3>
            <p>tunjukkan kepedulian melalui pembangunan</p>
            <button className="action-button">mulai danasi&gt;&gt;&gt;</button>
          </div>
          
          <div className="service-card">
            <h3>zakat</h3>
            <p>tunaikan zakat maal, zakat fitrah, zakat harta benda anda</p>
            <button className="action-button">mulai zakat&gt;&gt;&gt;</button>
          </div>
          
          <div className="service-card">
            <h3>wakaf</h3>
            <p>sedekahkan sebagian untuk keperluan umat islam bersama kami</p>
            <button className="action-button">mulai wakaf&gt;&gt;&gt;</button>
          </div>
          
          <div className="service-card">
            <h3>kurban</h3>
            <p>tunaikan kewajiban kurban sebagai syafaat keluarga anda</p>
            <button className="action-button">mulai kurban&gt;&gt;&gt;</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>G96 SAS ICS</p>
      </footer>
    </div>
  );
}

export default App;