import React,{useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../../actions';
import { Link, useParams } from 'react-router-dom';
import styles from './CardDetail.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader';

const CardDetail = () => {
    const {id} = useParams();
    const [videogameDetail, setVideogameDetail] = useState(null)
    // const dispatch = useDispatch();
    // const videogameDetail = useSelector((state) => state.details)
    // console.log(videogameDetail)

    // useEffect(() => {
    //   dispatch(getDetail(id))

    //   return() => {
    //     getDetail(null)
    //   }

    // }, [dispatch, id]);

    useEffect(() => {
      axios.get(`http://localhost:3009/api/videogames/${id}`)
        .then((response) => {
          setVideogameDetail(response.data)
        })

      return() => {
        setVideogameDetail(null)
      }
    },[id])
    
  return (
    <div className={styles.container}>
        {
            videogameDetail ?
            <div className={styles.detailContainer}>
                <div className={styles.detailsIntro}>
                  <div className={styles.detailImgContainer}>
                    <img className={styles.detailImg} src={videogameDetail.background_image || videogameDetail.image} alt=""/>
                    
                  </div>
                  <h1 className={styles.detailTitle}>{videogameDetail.name}</h1>
                </div>
                <div>
                    <span>Rating: </span>
                    <span className={styles.detailRating}>{videogameDetail.rating}</span>
                </div>
                <div>
                    <span>Released: </span>
                    <span className={styles.detailReleased}>{videogameDetail.released || videogameDetail.release}</span>
                  </div>
                <p className={styles.detailDescription}>{videogameDetail.description_raw || videogameDetail.description}</p>
                <div className={styles.detailsDataContainer}>
                  {/* <h1>{videogameDetail.metacritic}</h1>
                  <h1>{videogameDetail.playtime}</h1> */}
                  
                  <div>
                    <span>Platforms: </span>
                    <p>
                      {/* {
                        videogameDetail.platforms?.map((p) => (p.platform.name)).join("  -  ")
                      } */}
                      {
                        videogameDetail.id?.length > 8 ? videogameDetail.platforms?.map(p => p.name).join(" - ")
                        : videogameDetail.platforms?.map((p) => p.platform.name).join(' - ')
                      }
                    </p>
                  </div>
                </div>
            </div>
            : <Loader />
        }
    </div>
  );
};

export default CardDetail;
