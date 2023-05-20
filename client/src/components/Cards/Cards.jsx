import s from "./Cards.module.css"
import Card from "../Card/Card"
import { useDispatch } from "react-redux"
import React from "react";
import { useState } from "react";
import { getAllvideogames } from "../../redux/actions";

const Cards = ({currentGames}) => {
   const dispatch = useDispatch()
   const [carga, setCarga] = useState(true);

   React.useEffect(() => {
       dispatch(getAllvideogames()).then(() => setCarga(false)) //me traigo la action creators q me trae todos mis videojuegos de la API
   }, [dispatch])

   //const allVideogames = useSelector(state => state.allVideogames) //me traigo del reducer el estado en donde guarde todos mis videojuegos
   const errorCarga = <h4 className={s.errorCarga}>⚠No se econtró ningun juego</h4>
   if(carga){
      return(
         <img className={s.carga}src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-7.jpg" alt="CARGANDO" />
      )
   }

   return (
       <div className={s.containerCard}>
           {currentGames.length > 0 ?
           currentGames?.map(v => {
               return (<Card
                   key={v.id}
                   id={v.id}
                   image={v.image ? v.image : "IMAGEN AQUI"}
                   name={v.name}
                   genres={v.genres?.map(e => typeof (e) === 'object' ? e.name : e).join(', ')}
                   rating={v.rating}
                   />)}) : errorCarga}

       </div>
   )
}

export default Cards;