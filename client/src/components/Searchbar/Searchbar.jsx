import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { searchByName } from '../../actions';
import styles from './Searchbar.module.css'
import { MdSearch } from "react-icons/md"
import { useHistory } from 'react-router-dom'



const Searchbar = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) =>{
      e.preventDefault();
      setName(e.target.value);
    }
    console.log(name)
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(searchByName(name))
      history.push('/home')
    }
    

  return (
      <div className={styles.searchbarContainer}>
          <div className={styles.searchbar}>
            <MdSearch className={styles.searchIcon} onClick={(e) => handleSubmit(e)}/>
            <input placeholder='Search your game' className={styles.searchbarInput} onChange={(e) => handleInputChange(e)}/>
          </div>
      </div>
    
  )
}

export default Searchbar