import styles from "./Navbar.module.css"
import React, {useState} from "react";
import {useDispatch} from "react-redux"
import {getNames} from "../../redux/actions";
import { Link } from "react-router-dom";


const Navbar =({setCurrentPage}) =>{

  const [state, setState]=useState('');
  const dispatch= useDispatch();

  const handleChange=(e)=>{
    e.preventDefault()
    setState(e.target.value)
  }

  const handleSubmit=(e, setCurrentPage)=>{
    e.preventDefault();
      dispatch(getNames(state))
      setState('');
      setCurrentPage(1);
    
  }

  return(
    
    <div className={styles.navbar}>  
      <form>
        <input className={styles.searchbar} value={state} type="text"
        onChange={(e)=>handleChange(e)} placeholder="Buscar por nombre"/>
        <button type="submit" className={styles.Button} onClick={(e)=>handleSubmit(e, setCurrentPage)}>Buscar</button>
      </form> <div> <br />
      <span ><Link to={'/create'} className={styles.Button2}> Crear Juego!</Link></span></div>
    </div>
    
  )
}

export default Navbar;