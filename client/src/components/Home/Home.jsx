import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  videogamesGenreFilter,
  orderByName,
  getGenres,
  filterCreated,
} from "../../actions";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import Paginado from "../Paginado/Paginado";
import Searchbar from "../Searchbar/Searchbar";
import Navbar from "../Topbar/Topbar";
import styles from "./Home.module.css";
import Loader from '../Loader/Loader'


const Home = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  console.log(allVideogames)

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamePerPage] = useState(9);
  const indexLastVideogame = currentPage * videogamesPerPage;
  const indexFirstVideogame = indexLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexFirstVideogame,
    indexLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  const handleGenreFilter = (e) => {
    dispatch(videogamesGenreFilter(e.target.value));
  };

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order: ${e.target.value}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
  }

  if(!allVideogames.length){
    return <Loader />
  }

  return (
    <div>
      {/* <Navbar /> */}
      {/* <Searchbar /> */}
      <Filters
        handleGenreFilter={handleGenreFilter}
        handleSort={handleSort}
        handleReset={handleReset}
        handleFilterCreated={handleFilterCreated}
      />
      
      <div className={styles.grid}>
        {currentVideogames.map((vg) => {
          return (
            <div key={vg.id}>
              <Link to={`/videogames/${vg.id}`}>
                <Card
                  name={vg.name}
                  img={vg.image ? vg.image : vg.image}
                  rating={vg.rating}
                  genres={vg.genres.map((g) => g.name).join("  -  ")}
                  // platforms={vg.platforms.slice(-3).join("  -  ")}
                  platforms={vg.platforms.map((p) => p.name).slice(-3).join("   -   ")}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <Paginado
        paginado={paginado}
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
      />
    </div>
    // #981cd6
  );
};

export default Home;
