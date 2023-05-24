// import { useState, useEffect } from "react";
// import {useDispatch, useSelector} from "react-redux"

// export default function Cards (){

//     const dispatch = useDispatch;
//     const allVideoGames = useSelector ((state) => state.videoGames) //se usa para traer la propiedad videoGames del estado inicial

//     useEffect(()=>{
//         dispatch(getAllGames());
//     }, [])
// }

import style from "./Cards.module.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

const Cards = ({ games }) => {
  return (
    <div className={style.container}>
      

{games.map(({id, background_image, name, genres,rating }) => {
  return (
    <Card
    background_image={background_image}
    name={name}
    genres={genres}
    id = {id}
    rating = {rating}
    ></Card>
    );
  })}
      
      
      
    </div>
  );
};
export default Cards;
