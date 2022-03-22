import {React, useState}  from 'react';
import styles from './Topbar.module.css';
import {useDispatch} from 'react-redux'
import { searchByName } from '../../actions';
import {Link} from 'react-router-dom'
import DarkMode from '../DarkMode/DarkMode';
import { AiFillHome, AiFillHeart, AiOutlineUser } from "react-icons/ai";
import { MdSearch } from "react-icons/md";
import { useHistory } from 'react-router-dom'

const Navbar = () => {
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
      if(!name.length){
        alert('Enter a videogame name')
      }else{
        dispatch(searchByName(name))
        setName('')
      }
    }

  return (
      <div className={styles.topContainer}>
          <div className={styles.left}>
            <Link to="/home/">
              <span className={styles.logo}><span className={styles.primary}>VG</span>AME<span className={styles.primary}>V</span>ERSE</span>
            </Link>
            
          </div>
          <div className={styles.center}>
          <div className={styles.searchbar}>
            <button className={styles.searchbarBtn} type ="submit" onClick={(e) => handleSubmit(e)}><MdSearch className={styles.searchIcon} /></button> 
            <input value={name} placeholder='Search your game' className={styles.searchbarInput} onChange={(e) => handleInputChange(e)}/>
          </div>
          </div>
          <div className={styles.right}>
            <div className={styles.rightContainer}> 
              <Link to="/home"><AiFillHome  className={styles.topbarIcon}/></Link>
              <AiFillHeart className={styles.topbarIcon}/>
              <div>
                <button className={styles.login}>Log In</button>
              </div>
            </div>
          </div>
      </div>
  );
};

export default Navbar;
