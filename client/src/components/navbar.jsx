import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SAS from "../assests/icons/sas.png";
import SignInModal from "./SignIn";
import SignUpModal from "./SignUp";
import { UserContext } from "../context/userContext";

export default function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [state, dispatch] = useContext(UserContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };

  return (
    <>
      <nav style={styles.navbar}>
        {/* Brand */}
        <div style={styles.brand}>
          <img src={SAS} alt="Logo" style={styles.logo} />
          <Link to="/" style={styles.brandText}>AmalSAS.id</Link>
        </div>

        {/* Search */}
        <div style={styles.searchContainer}>
          <input type="text" placeholder="Cari program" style={styles.searchInput} />
          <button style={styles.searchButton}>🔍</button>
        </div>

        {/* Nav links & Auth */}
        <div
          style={{
            ...styles.navLinks,
            ...(isMenuOpen ? styles.navLinksOpen : {}),
          }}
        >
          {state.isLogin ? (
            <>
              <Link to="/" style={styles.navItem}>Home</Link>
              <Link to="/history" style={styles.navItem}>History</Link>
              <div style={styles.profileContainer}>
                <span>{state.user.fullname}</span>
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <button
                style={{ ...styles.authButton, ...styles.masukButton }}
                onClick={() => setShowSignIn(true)}
              >
                MASUK
              </button>
              <button
                style={{ ...styles.authButton, ...styles.daftarButton }}
                onClick={() => setShowSignUp(true)}
              >
                DAFTAR
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <div style={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </div>
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
    </>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    padding: "10px 20px",
    position: "relative",
    flexWrap: "wrap",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    height: "40px",
  },
  brandText: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    fontSize: "18px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    background: "#f1f1f1",
    borderRadius: "20px",
    overflow: "hidden",
    height: "36px",
    margin: "0 20px",
    minWidth: "200px",
    maxWidth: "300px",
    flex: 1,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "0 10px",
    background: "transparent",
    fontSize: "14px",
  },
  searchButton: {
    background: "#2e8b57",
    color: "#fff",
    border: "none",
    padding: "0 15px",
    height: "100%",
    cursor: "pointer",
    fontSize: "16px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexDirection: "row",
  },
  navLinksOpen: {
    position: "absolute",
    top: "60px",
    right: "20px",
    flexDirection: "column",
    background: "#fff",
    border: "1px solid #ddd",
    padding: "10px",
  },
  navItem: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  authButton: {
    border: "1px solid #2e8b57",
    padding: "5px 12px",
    cursor: "pointer",
    background: "none",
    borderRadius: "4px",
    fontSize: "14px",
  },
  masukButton: {
    color: "#2e8b57",
  },
  daftarButton: {
    background: "#2e8b57",
    color: "#fff",
    border: "none",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoutButton: {
    background: "none",
    border: "none",
    color: "#d33",
    cursor: "pointer",
    fontSize: "14px",
  },
  hamburger: {
    display: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
};
