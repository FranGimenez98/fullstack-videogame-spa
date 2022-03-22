import React from 'react';
import styles from './Stock.module.css';

const Stock = ({handleFilterCreated}) => {
  return (
      <div>
            <h3 className={styles.filterName}><span>S</span>tock</h3>
            <select className={styles.select} onChange={(e) => handleFilterCreated(e)}>
              <option value="all" name="All">All</option>
              <option value="created" name="Created">Created</option>
              <option value="api">Existents</option>
          </select>
      </div>
  );
};

export default Stock;
