import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";
import Filtros from "../Filtros/Filtros"
import Paginado from "../Paginado/Paginado"
import {useDispatch, useSelector} from "react-redux"
import {filterByGenres, filterBySource, orderBy, getAllvideogames } from "../../redux/actions/index"
import React, { useState } from "react";

const HomePage =() =>{
   const dispatch = useDispatch();
   const allGames = useSelector(state=>state.allVideogames)

   const[currentPage, setCurrentPage]= useState(1)
   const juegosPorPag=15;
   const indexUltiJuego= currentPage * juegosPorPag;
   const indexPrimJuego= indexUltiJuego - juegosPorPag;
   const currentGames= allGames.slice(indexPrimJuego, indexUltiJuego)

   const paginado= (pageNumber)=>{
      setCurrentPage(pageNumber)
   }

   React.useEffect(()=>{
      window.scrollTo(0, 0);
   }, [currentPage])

   function handleSort(e){
      e.preventDefault()
      if(e.target.value===""){
         dispatch(getAllvideogames())
      }else {
         dispatch(orderBy(e.target.value))
         setCurrentPage(1)
      }
   }

   function handleFilter(e){
      e.preventDefault()
      if(e.target.value===""){
         dispatch(getAllvideogames())
      }else {
         dispatch(filterByGenres(e.target.value))
         setCurrentPage(1)
   }
}

   function handleSource(e){
      e.preventDefault()
      if(e.target.value===""){
         dispatch(getAllvideogames())
      }else{
         dispatch(filterBySource(e.target.value))
         setCurrentPage(1)
      }
   }

   return( 
   <div>
      <Navbar></Navbar>
      <Paginado juegosPorPag={juegosPorPag} allGames={allGames.length} paginado={paginado}></Paginado>
      <Filtros handleSort={handleSort} handleFilter={handleFilter} handleSource={handleSource}></Filtros>
      <Cards currentGames={currentGames}></Cards>
   </div>

   )
}

export default HomePage;