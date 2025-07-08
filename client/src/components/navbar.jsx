import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SAS from "../assests/icons/sas.png";
import SignInModal from "./SignIn";
import SignUpModal from "./SignUp";
import { UserContext } from "../context/userContext";
import { setAuthToken } from "../config/api";
import { API } from "../config/api";

// Data untuk halaman statis
const staticPages = [
  {
    id: 'vision-mission',
    title: 'Vision & Mission',
    content: 'Our vision is to create a better world through charitable acts. Our mission is to connect donors with those in need through transparent campaigns.',
    path: '/vision-mission'
  },
  {
    id: 'about-us',
    title: 'About Us',
    content: 'AmalSAS.id is a non-profit organization dedicated to helping those in need through various charitable campaigns and programs.',
    path: '/about-us'
  }
];

export default function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const isAdmin = state.user?.isAdmin;

  // Ambil data campaign untuk pencarian
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await API.get("/campaigns");
        const data = res.data?.data;
        if (data?.campaigns?.length > 0) {
          setCampaigns(data.campaigns);
        }
      } catch (error) {
        console.error("Gagal mengambil data campaign:", error.message);
      }
    };

    fetchCampaigns();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Cari di kampanye
    const foundCampaigns = campaigns.filter(campaign => 
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Cari di halaman statis
    const foundPages = staticPages.filter(page => 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      page.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Navigasi ke halaman hasil pencarian dengan state
    navigate('/search-results', { 
      state: { 
        query: searchQuery,
        campaigns: foundCampaigns,
        pages: foundPages 
      } 
    });

    setSearchQuery('');
    setIsMenuOpen(false); // Tutup mobile menu setelah search
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    setAuthToken();
  };

  return (
    <>
      <nav className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <img src={SAS} alt="Logo" className="navbar-logo" />
          <Link to="/" className="navbar-brand-text">AmalSAS.id</Link>
        </div>

        {/* Search */}
        {!isAdmin && (
          <form className="navbar-search" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Cari program atau halaman" 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">🔍</button>
          </form>
        )}  

        {/* Desktop links */}
        <div className="navbar-links">
          <Link to="/vision-mission" className="nav-link">Vision & Mission</Link>
          <Link to="/about-us" className="nav-link">About Us</Link>

          {state.isLogin ? (
            <>
              {isAdmin ? (
                <>
                  <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/admin/campaigns/add" className="nav-link add-campaign-button">Add Campaign</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to="/history" className="nav-link">History</Link>
                </>
              )}
              <div className="profile">
                <Link to="/profile" className="username-link">
                  <span className="username">{state.user?.fullname || state.user?.name || state.user?.username}</span>
                </Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            </>
          ) : (
            <>
              <button className="auth-button masuk" onClick={() => setShowSignIn(true)}>MASUK</button>
              <button className="auth-button daftar" onClick={() => setShowSignUp(true)}>DAFTAR</button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <form className="mobile-search" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Cari program atau halaman" 
                className="mobile-search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="mobile-search-button">🔍</button>
            </form>

            <Link to="/vision-mission" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Vision & Mission</Link>
            <Link to="/about-us" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>

            {state.isLogin ? (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin/dashboard" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                    <Link to="/admin/campaigns/add" className="mobile-link add-campaign-button" onClick={() => setIsMenuOpen(false)}>Add Campaign</Link>
                  </>
                ) : (
                  <>
                    <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/history" className="mobile-link" onClick={() => setIsMenuOpen(false)}>History</Link>
                  </>
                )}
                <div className="mobile-profile">
                  <Link to="/profile" className="mobile-username-link" onClick={() => setIsMenuOpen(false)}>
                    <span>{state.user?.fullname || state.user?.username}</span>
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="mobile-logout">Logout</button>
                </div>
              </>
            ) : (
              <>
                <button className="mobile-button masuk" onClick={() => { setShowSignIn(true); setIsMenuOpen(false); }}>MASUK</button>
                <button className="mobile-button daftar" onClick={() => { setShowSignUp(true); setIsMenuOpen(false); }}>DAFTAR</button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Modals */}
      <SignInModal
        show={showSignIn}
        onHide={() => setShowSignIn(false)}
        openSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />
      <SignUpModal
        show={showSignUp}
        onHide={() => setShowSignUp(false)}
        openSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />

      {/* Styles */}
      <style jsx="true">{`
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          padding: 15px 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          flex-wrap: wrap;
        }

        .navbar-brand { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
        }
        .navbar-logo { 
          height: 40px; 
        }
        .navbar-brand-text { 
          text-decoration: none; 
          color: #2e8b57; 
          font-weight: bold; 
          font-size: 20px; 
        }

        .navbar-search, .mobile-search {
          display: flex;
          align-items: center;
          background: #f1f1f1;
          border-radius: 20px;
          overflow: hidden;
          height: 36px;
          min-width: 200px;
          max-width: 400px;
          flex: 1;
          margin: 0 20px;
        }

        .search-input, .mobile-search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0 15px;
          background: transparent;
          font-size: 14px;
        }

        .search-button, .mobile-search-button {
          background: #2e8b57;
          color: #fff;
          border: none;
          padding: 0 15px;
          height: 100%;
          cursor: pointer;
          font-size: 16px;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 16px;
          white-space: nowrap;
        }

        .nav-link:hover { 
          color: #2e8b57; 
        }

        .auth-button {
          border: 1px solid #2e8b57;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .auth-button.masuk {
          color: #2e8b57;
          background: none;
        }

        .auth-button.masuk:hover {
          background: #f0fff0;
        }

        .auth-button.daftar {
          background: #2e8b57;
          color: #fff;
          border: none;
        }

        .auth-button.daftar:hover {
          background: #267d4d;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .username {
          font-size: 15px;
          font-weight: 500;
          white-space: nowrap;
        }

        .username-link {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        .username-link:hover {
          color: #2e8b57;
        }

        .logout-button {
          background: none;
          border: none;
          color: #d33;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
        }

        .hamburger {
          display: none;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
        }

        .mobile-menu {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: #fff;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 999;
        }

        .mobile-search {
          margin-bottom: 15px;
          width: 100%;
        }

        .mobile-link {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 16px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .mobile-profile {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px 0;
          border-top: 1px solid #eee;
          margin-top: 10px;
        }

        .mobile-username-link {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          padding: 8px 0;
        }

        .mobile-logout {
          background: none;
          border: none;
          color: #d33;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          padding: 8px 0;
          text-align: left;
        }

        .mobile-button {
          padding: 12px;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
          margin: 5px 0;
          width: 100%;
        }

        .mobile-button.masuk {
          border: 1px solid #2e8b57;
          color: #2e8b57;
          background: none;
        }

        .mobile-button.daftar {
          background: #2e8b57;
          color: #fff;
          border: none;
        }

        .add-campaign-button {
          background-color: #2e8b57;
          color: white !important;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.3s;
        }

        .add-campaign-button:hover {
          background-color: #267d4d;
        }

        @media (max-width: 768px) {
          .navbar-search, .navbar-links {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
}