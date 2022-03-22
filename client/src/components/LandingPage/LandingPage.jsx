import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'
import logo from '../../images/logo.svg'


const LandingPage = () => {
  return (
      <div className={styles.container}>
        <div className={styles.landingLeft}>
        <div className={styles.landingImgContainer}>
          <img className={styles.landingLogo} src={logo} alt="" />
        </div>
        </div>

        <div className={styles.landingRight}>
          <div className={styles.landingIntroContainer}>
            <h2 className={styles.secondary}>Welcome to</h2>
            <h2 className={styles.secondary}><span className={styles.primary}>VG</span>AME<span className={styles.primary}>V</span>ERSE</h2>
            <Link to="/home"><button className={styles.btn}>go!</button></Link>
          </div>
        </div>
      </div>
  );
};

export default LandingPage;
