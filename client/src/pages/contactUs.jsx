import React from 'react';

const ContactUsPage = () => {
  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><a href="#" style={styles.navLink}>Home</a></li>
          <li style={styles.navItem}><a href="#" style={styles.navLink}>Service</a></li>
          <li style={styles.navItem}><a href="#" style={styles.navLink}>About</a></li>
        </ul>
      </nav>
      
      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.mainTitle}>Contact Us</h1>
        <p style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ipsum vitae lacus lobortis lacinia. Donec tristique arcu massa, at.
        </p>
        
        <div style={styles.contactInfo}>
          <div style={styles.contactItem}>
            <span style={styles.contactLabel}>Email</span>
            <span style={styles.contactValue}>hello@reallygreatsite.com</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactLabel}>Website</span>
            <span style={styles.contactValue}>www.reallygreatsite.com</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactLabel}>Social Media</span>
            <span style={styles.contactValue}>@reallygreatsite</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactLabel}>Phone Number</span>
            <span style={styles.contactValue}>+123-456-7890</span>
          </div>
        </div>
      </main>
    </div>
  );
};

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
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#3498db',
    },
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  mainTitle: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '30px',
    textAlign: 'center',
  },
  contactInfo: {
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  contactItem: {
    display: 'flex',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
    ':last-child': {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottom: 'none',
    },
  },
  contactLabel: {
    fontWeight: '600',
    width: '120px',
    color: '#3498db',
  },
  contactValue: {
    flex: 1,
  },
};

export default ContactUsPage;