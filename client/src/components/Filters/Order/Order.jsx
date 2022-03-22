import React from 'react';
import styles from './Order.module.css';

const Order = ({handleSort}) => {
  return (
      <div>
          <h3 className={styles.filterName}><span>O</span>rder</h3>
          <select className={styles.select} onChange={e => handleSort(e)}>
            <option value="asc">Upward</option>
            <option value="desc">Downward</option>
          </select>
      </div>
  );
};

export default Order;
