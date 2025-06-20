import React from 'react';
import { Link } from 'react-router-dom';

const ContactUsPage = () => {
  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
          <li style={styles.navItem}><Link to="/services" style={styles.navLink}>Services</Link></li>
          <li style={styles.navItem}><Link to="/about" style={styles.navLink}>About</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.mainTitle}>Contact Us</h1>
        <p style={styles.paragraph}>
          Feel free to reach out to us through any of the following ways:
        </p>

        <div style={styles.contactInfo}>
          <ContactItem label="Email" value="hello@reallygreatsite.com" />
          <ContactItem label="Website" value="www.reallygreatsite.com" />
          <ContactItem label="Social Media" value="@reallygreatsite" />
          <ContactItem label="Phone Number" value="+123-456-7890" />
        </div>
      </main>
    </div>
  );
};

// Reusable Contact Item
const ContactItem = ({ label, value }) => (
  <div style={styles.contactItem}>
    <span style={styles.contactLabel}>{label}</span>
    <span style={styles.contactValue}>{value}</span>
  </div>
);

// Styles
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    color: '#333',
  },
  nav: {
    marginBottom: '40px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    padding: '5px 0',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    fontWeight: '500',
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '30px',
  },
  contactInfo: {
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'left',
  },
  contactItem: {
    display: 'flex',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
  },
  contactLabel: {
    fontWeight: '600',
    width: '150px',
    color: '#3498db',
  },
  contactValue: {
    flex: 1,
    wordBreak: 'break-word',
  },
};

export default ContactUsPage;
