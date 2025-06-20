import React from "react";
import IconRespon from "../assests/icons/tangan.png";
import IconCredibility from "../assests/icons/masjid.png";
import IconPhone from "../assests/icons/masjid.png";

export default function WhyUs() {
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
    width: "30px",
    height: "30px",
    marginBottom: "9px",
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
  };

  const contactIcon = {
    width: "14px",
    height: "14px",
  };

  return (
    <div style={sectionStyle}>
      <h2 style={titleStyle}>mengapa berbagi bersama AmalSAS?</h2>

      <div style={featuresWrapper}>
        <div style={featureStyle}>
          <img src={IconRespon} alt="Responsif" style={iconStyle} />
          <h3 style={featureTitle}>Responsif</h3>
          <p style={featureText}>Merespon kebutuhan dengan cepat dan tepat</p>
        </div>

        <div style={featureStyle}>
          <img src={IconCredibility} alt="Credibility" style={iconStyle} />
          <h3 style={featureTitle}>Credibility</h3>
          <p style={featureText}>Bertanggung jawab penuh menjalankan amanah program</p>
        </div>
      </div>

      <div style={contactWrapper}>
        <img src={IconPhone} alt="Contact" style={contactIcon} />
        hubungi kami
      </div>
    </div>
  );
}
