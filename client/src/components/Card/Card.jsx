import React from 'react';
import styles from './Card.module.css';

const Card = ({name,img,rating,genres, platforms}) => {

  return(
      
      <div className={styles.container}>
          <div className={styles.imgContainer}>
             <img className={styles.img} src={img} alt=""/> 
          </div>
          <div className={styles.infoSplitContainer}>
            <div className={styles.infoLeft}>
                <div className={styles.titleContainer}>
                    <h3 className={styles.info}>{name}</h3>
                </div>
            </div>
            <div className={styles.infoRight}>
                <div className={styles.ratingBox}>
                    <div className={rating >= 4 ? styles.green : styles.red}>{rating}</div>
                </div>
                
            </div>
          </div>
          <div className={styles.infoContainer}>
              <div className={styles.platforms}>
                  {platforms ? platforms : platforms.name}
              </div>
              <div className={styles.genres}>
                  {genres}
              </div>
          </div>
          
      </div>
  );
};

export default Card;
