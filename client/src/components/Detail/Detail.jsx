import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getVideogame } from "../../redux/actions/index";
import s from './Detail.module.css'


function Detail() {

    const [carga, setCarga] = useState(true);
    const {id} = useParams() //rutas dinamicas, Podemos acceder a cualquier parámetro de ruta de una ruta declarada con su componente asociado usando el hook useParams.
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getVideogame(id)).then(() => setCarga(false))
    }, [dispatch, id])

    const details = useSelector(state => state.videogame)
    console.log(details)

    if (carga) {
        return "cargando paaa";
      }

    var regex = /(<([^>]+)>)/gi;

    const { name, image, rating, genres, released, description, platforms } = details[0];

    return (
        <div className={s.card}>
            <h4>ID del juego: {id}</h4><h1>{name}</h1> 
            <img className={s.image}src={image} alt={`${name}'s`}/>
            <br /><div className={s.plat}>Plataformas: {platforms?.join(', ')}</div>
            <div className={s.texto}>
                 <div >📌Descripcion:{description?.replace(regex, '').replace('&#39', '')}</div>
            </div>
            <p > 📅Lanzamiento: {released}</p>
            <p >🌟Rating: {rating}</p>
            <p >🎮Generos: {genres?.map(g => (g.name ? g.name : g)).join('| ')}</p>
                
            <div >
                <div>
                    <NavLink to={'/home'} className={s.myButton}>
                       Regresar
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Detail