import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Genres.module.css';

const Genres = ({handleGenreFilter}) => {
  const allGenres = useSelector(state => state.genres)

  return (
    <div>
        <h3 className={styles.filterName}><span>G</span>enres</h3>
        <select className={styles.select} onChange={e => handleGenreFilter(e)}>
            <option value="All">All</option>
            {
              allGenres?.map((genres) => {
                return(
                  <option key={genres.name} value={genres.name}>{genres.name}</option>
                )
              })
            }
        </select>
    </div>
  );
};

export default Genres;
