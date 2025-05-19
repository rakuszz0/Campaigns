import React from 'react';

const VisionMissionPage = () => {
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
        <h1 style={styles.mainTitle}>Vision & Mission</h1>
        <p style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ipsum vitae lacus lobortis lacinia. Donec tristique arcu massa, at pharetra tortor feugiat non.
        </p>
        
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Vision</h2>
          <p style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ipsum vitae lacus lobortis lacinia. Donec tristique arcu massa, at.
          </p>
        </div>
        
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Mission</h2>
          <p style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ipsum vitae lacus lobortis lacinia. Donec tristique arcu massa, at.
          </p>
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
  section: {
    margin: '40px 0',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#3498db',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '15px',
  },
};

export default VisionMissionPage;