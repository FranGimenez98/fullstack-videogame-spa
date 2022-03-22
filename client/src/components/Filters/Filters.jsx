import React from 'react';
import styles from './Filters.module.css';
import Genres from './Genres/Genres';
import Order from './Order/Order';
import Stock from './Stock/Stock';
import { VscDebugRestart } from "react-icons/vsc"
import { ImPlus } from "react-icons/im";
import { Link } from 'react-router-dom';


const Filters = ({handleGenreFilter, handleSort, handleReset,handleFilterCreated }) => {
  return (
      <div className={styles.filtersContainer}>
          <div className={styles.FilterLeftContainer}>
            <Order handleSort={handleSort} />
            <Genres handleGenreFilter={handleGenreFilter} />
            <Stock handleFilterCreated={handleFilterCreated} />
          </div>
          <div className={styles.ButtonsRightContainer}>
            <button  className={styles.reset} onClick={(e) => handleReset(e)}><VscDebugRestart className={styles.resetIcon}/></button>
            <Link to="/videogame"><button className={styles.plus}><ImPlus /></button></Link>
          </div>
      </div>
  );
};

export default Filters;
