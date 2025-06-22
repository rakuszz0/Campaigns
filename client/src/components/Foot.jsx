import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function WhyUs() {
  const navigate = useNavigate();

  const sectionStyle = {
    backgroundColor: "#2e8b57",
    color: "#fff",
    padding: "50px 10px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    textTransform: "capitalize",
  };

  const featuresWrapper = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
    marginBottom: "20px",
  };

  const featureStyle = {
    width: "150px",
    textAlign: "center",
  };

  const iconStyle = {
    fontSize: "30px",
    marginBottom: "9px",
    color: "#fff",
  };

  const featureTitle = {
    fontSize: "14px",
    margin: "5px 0",
    fontWeight: "bold",
  };

  const featureText = {
    fontSize: "10px",
    lineHeight: "1.3",
  };

  const contactWrapper = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#fff",
    color: "#2e8b57",
    padding: "5px 15px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const handleContactClick = () => {
    navigate("/contact-us");
  };

  return (
    <div style={sectionStyle}>
      <h2 style={titleStyle}>mengapa berbagi bersama AmalSAS?</h2>

      <div style={featuresWrapper}>
        <div style={featureStyle}>
          <i className="bi bi-lightning" style={iconStyle}></i>
          <h3 style={featureTitle}>Responsif</h3>
          <p style={featureText}>Merespon kebutuhan dengan cepat dan tepat</p>
        </div>

        <div style={featureStyle}>
          <i className="bi bi-shield-check" style={iconStyle}></i>
          <h3 style={featureTitle}>Credibility</h3>
          <p style={featureText}>Bertanggung jawab penuh menjalankan amanah program</p>
        </div>
      </div>

      <div 
        style={contactWrapper} 
        onClick={handleContactClick}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
      >
        <i className="bi bi-telephone" style={{ fontSize: "14px" }}></i>
        hubungi kami
      </div>
    </div>
  );
}