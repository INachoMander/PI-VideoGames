import styles from "./landing.module.css";
import {Link} from "react-router-dom"
import React from "react";

const LandingPage = () => {
   return (
      <div className={styles.containerCentral}>
              
         <h3 className={styles.titulo}>¡Bienvenido a mi proyecto!</h3>
              
         <Link to="/home"><button className={styles.boton} >INGRESAR</button></Link>
         <p className={styles.text}>Proyecto Individual Realizado por Ignacio Mander</p>
      </div>
   )
}

export default LandingPage;