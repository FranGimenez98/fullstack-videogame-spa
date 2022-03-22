import React from 'react';
import styles from './Paginado.module.css';

const Paginado = ({paginado, videogamesPerPage, allVideogames}) => {
  const pageNumbers = [];

  for(let i = 0; i<=Math.ceil(allVideogames/videogamesPerPage); i++){
    pageNumbers.push(i+1);
  }

  return (
      <div>
          <nav>
            <ul className={styles.paginado}>
              {
                pageNumbers && pageNumbers.map((number) => {
                  return(
                    <li key={number}>
                      <button className={styles.paginadoBtn} onClick={() => paginado(number)}>{number}</button>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
      </div>
  );
};

export default Paginado;
