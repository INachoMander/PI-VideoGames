import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByGenres} from "../../redux/actions/index"
import s from './Filtros.module.css'


const Filtros = ({handleFilter, handleSort, handleSource}) => {

    const dispatch = useDispatch();
    const generos = useSelector(state => state.genres)// el useSelector lee un valor del estado del store(reducer) y se suscribe a las actualizaciones del mismo.
    //console.log(generos.genres)
    useEffect(() => { //
        dispatch(getByGenres())
    }, [dispatch])


    return (
            <div className={s.box}>
                    <select onChange={e => handleSort(e)}>
                        <option value="" >Ordenar por...</option>
                        <option value="A-Z" >A-Z</option>
                        <option value="Z-A" >Z-A</option>
                        <option value="Rating Asc">Rating Asc</option>
                        <option value="Rating Des">Rating Desc</option>
                    </select>

                    <select id="genre" onChange={e => handleFilter(e)}>
                         <option value=''>Generos</option>
                        {generos.genres && generos.genres.length > 0 ? generos.genres.map(g => (
                            <option key={g.id} value={g.name}>{g.name}</option> 
                        )) : <option>Error cargar géneros</option>}
                    </select>

                    <select onChange={e => handleSource(e)}>
                        <option value=''>Filtrar por Origen</option>
                        <option value="API">API</option>
                        <option value="CREADO">Creados</option>
                    </select>
                    
            </div>
    )
}

export default Filtros;