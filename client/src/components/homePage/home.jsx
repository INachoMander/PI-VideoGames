// import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";
import Filtros from "../Filtros/Filtros"
import Paginado from "../Paginado/Paginado"
import {useDispatch, useSelector} from "react-redux"
import {filterByGenres, filterBySource, orderBy, getAllvideogames, getNames } from "../../redux/actions/index"
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

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

   function handleSort(event){
      event.preventDefault()
      if(event.target.value===""){
         dispatch(getAllvideogames())
      }else {
         dispatch(orderBy(event.target.value))
         setCurrentPage(1)
      }
   }

   function handleFilter(event){
      event.preventDefault()
      if(event.target.value===""){
         dispatch(getAllvideogames())
      }else {
         dispatch(filterByGenres(event.target.value))
         setCurrentPage(1)
   }
}

   function handleSource(event){
      event.preventDefault()
      if(event.target.value===""){
         dispatch(getAllvideogames())
      }else{
         dispatch(filterBySource(event.target.value))
         setCurrentPage(1)
      }
   }

   const handleSearch = (search) => {
      // resetPagination();
      dispatch(getNames(search))
   }

   return( 
   <div>
      {/*<Navbar>
         <SearchBar onSearch={handleSearch}/>
      </Navbar>*/}
      <SearchBar/>
      <Paginado juegosPorPag={juegosPorPag} allGames={allGames.length} paginado={paginado}></Paginado>
      <Filtros handleSort={handleSort} handleFilter={handleFilter} handleSource={handleSource}></Filtros>
      <Cards currentGames={currentGames}></Cards>
   </div>

   )
}

export default HomePage;