import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SAS from "../assests/icons/sas.png";
import SignInModal from "./SignIn";
import SignUpModal from "./SignUp";
import { UserContext } from "../context/userContext";
import { setAuthToken } from "../config/api";

export default function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [state, dispatch] = useContext(UserContext);

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
        <div className="navbar-search">
          <input type="text" placeholder="Cari program" className="search-input" />
          <button className="search-button">🔍</button>
        </div>

        {/* Desktop links */}
        <div className="navbar-links">
          {/* Common links for all users */}
          <Link to="/vision-mission" className="nav-link">Vision&Mission</Link>
          <Link to="/about-us" className="nav-link">About Us</Link>
          
          {state.isLogin ? (
            <>
              {state.user.isAdmin ? (
                <>
                  <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                  <Link to="/admin/campaigns/add" className="nav-link">Add Campaign</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to="/history" className="nav-link">History</Link>
                </>
              )}
              <div className="profile">
                <Link to="/profile" className="username-link">
                  <span className="username">{state.user.name || state.user.username}</span>
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
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            {/* Common links for all users */}
            <Link to="/vision-mission" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Vision&Mission</Link>
            <Link to="/about-us" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            
            {state.isLogin ? (
              <>
                {state.user.isAdmin ? (
                  <>
                    <Link to="/admin/dashboard" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                    <Link to="/admin/campaigns/add" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Add Campaign</Link>
                  </>
                ) : (
                  <>
                    <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/history" className="mobile-link" onClick={() => setIsMenuOpen(false)}>History</Link>
                  </>
                )}
                <div className="mobile-profile">
                  <Link to="/profile" className="mobile-username-link" onClick={() => setIsMenuOpen(false)}>
                    <span>{state.user.fullname}</span>
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
        .navbar-brand { display: flex; align-items: center; gap: 10px; }
        .navbar-logo { height: 40px; }
        .navbar-brand-text { text-decoration: none; color: #2e8b57; font-weight: bold; font-size: 20px; }

        .navbar-search { display: flex; align-items: center; background: #f1f1f1; border-radius: 20px; overflow: hidden; height: 36px; min-width: 200px; max-width: 400px; flex: 1; margin: 0 20px; }
        .search-input { flex: 1; border: none; outline: none; padding: 0 15px; background: transparent; font-size: 14px; }
        .search-button { background: #2e8b57; color: #fff; border: none; padding: 0 15px; height: 100%; cursor: pointer; font-size: 16px; }

        .navbar-links { display: flex; align-items: center; gap: 20px; }
        .nav-link { text-decoration: none; color: #333; font-weight: 500; font-size: 16px; }
        .nav-link:hover { color: #2e8b57; }
        .auth-button { border: 1px solid #2e8b57; padding: 8px 16px; cursor: pointer; border-radius: 4px; font-size: 14px; font-weight: 600; transition: all 0.3s; }
        .auth-button.masuk { color: #2e8b57; background: none; }
        .auth-button.masuk:hover { background: #f0fff0; }
        .auth-button.daftar { background: #2e8b57; color: #fff; border: none; }
        .auth-button.daftar:hover { background: #267d4d; }

        .profile { display: flex; align-items: center; gap: 15px; }
        .username { font-size: 15px; font-weight: 500; }
        .username-link {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .username-link:hover {
          color: #2e8b57;
        }
        .logout-button { background: none; border: none; color: #d33; cursor: pointer; font-size: 14px; font-weight: 500; }

        .hamburger { display: none; font-size: 24px; cursor: pointer; padding: 5px; }

        .mobile-menu { position: fixed; top: 70px; left: 0; right: 0; background: #fff; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 15px; z-index: 999; }
        .mobile-link { text-decoration: none; color: #333; font-weight: 500; font-size: 16px; padding: 10px 0; border-bottom: 1px solid #eee; }
        .mobile-profile { display: flex; flex-direction: column; gap: 10px; padding: 10px 0; border-top: 1px solid #eee; margin-top: 10px; }
        .mobile-username-link {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          padding: 8px 0;
        }
        .mobile-username-link:hover {
          color: #2e8b57;
        }
        .mobile-logout { background: none; border: none; color: #d33; cursor: pointer; font-size: 15px; font-weight: 500; padding: 8px 0; text-align: left; }
        .mobile-button { padding: 12px; border-radius: 4px; font-size: 15px; font-weight: 600; text-align: center; margin: 5px 0; }
        .mobile-button.masuk { border: 1px solid #2e8b57; color: #2e8b57; background: none; }
        .mobile-button.daftar { background: #2e8b57; color: #fff; border: none; }

        @media (max-width: 768px) {
          .navbar-search, .navbar-links { display: none; }
          .hamburger { display: block; }
        }
      `}</style>
    </>
  );
}