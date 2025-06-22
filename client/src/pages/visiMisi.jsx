import React from 'react';
import { Link } from 'react-router-dom';

const VisionMissionPage = () => {
  return (
    <div style={styles.container}>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.mainTitle}>Vision & Mission</h1>
        <p style={styles.intro}>
          We are committed to building a sustainable and impactful future through clear vision and strong mission.
        </p>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Vision</h2>
          <p style={styles.paragraph}>
            To become a leading organization that drives positive change, promotes environmental sustainability,
            and empowers communities for a better tomorrow.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <ul style={styles.list}>
            <li>Promote awareness about environmental issues and sustainable practices.</li>
            <li>Empower communities through education, campaigns, and green initiatives.</li>
            <li>Collaborate with partners to develop impactful projects for society and nature.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
    color: '#333',
  },
  nav: {
    marginBottom: '40px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    gap: '30px',
  },
  navItem: {},
  navLink: {
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'color 0.3s',
  },
  main: {
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: '40px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  intro: {
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#555',
    marginBottom: '40px',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  section: {
    marginBottom: '40px',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#27ae60',
  },
  paragraph: {
    fontSize: '17px',
    lineHeight: '1.7',
    color: '#555',
  },
  list: {
    paddingLeft: '20px',
    fontSize: '17px',
    lineHeight: '1.7',
    color: '#555',
  },
};

export default VisionMissionPage;
