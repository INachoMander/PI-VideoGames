// import { useParams} from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGames, setDetail, getGenres } from "../../redux/actions";
import style from "./Home.module.css";
// import { getById } from "../../redux/actions";

const pageSize = 15;

const Home = () => {
  // const { detailId } = useParams();
  const games = useSelector((state) => state.videoGames);
  const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageCount = Math.ceil(games.length / pageSize);
  const indexOfLastGames = currentPage * pageSize;
  const indexOfFirstGames = indexOfLastGames - pageSize;
  const currentGames = games.slice(indexOfFirstGames, indexOfLastGames);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(setDetail());
    dispatch(getAllGames()).then((res)=>setLoading(false));
  }, [dispatch]);

 


 

  const next = () => {
    if (indexOfLastGames > games.length) return;
    setCurrentPage(currentPage + 1);
  };
  const prev = () => {
    if (indexOfFirstGames < 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Nav ></Nav>
      
      
      {loading? (
        <div>
        <p className={style.carga}>LOADING...</p>
      </div>
      ):( games.length === 0 ? (
        
        <div><h1 className={style.mensaje}>NO VIDEO GAME FOUND</h1>
        
        </div>
      ):(
        <>
      <div className={style.paginado}>
        <button className={style.buttonPaginado} onClick={() => prev()}>PREV</button>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button className={
            currentPage === index + 1?
            style.unButton:style.buttonPaginado
        } key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button className={style.buttonPaginado} onClick={() => next()}>NEXT</button>
      </div>
        
        <Cards games={currentGames}></Cards>


      <div className={style.paginado}>
        <button className={style.buttonPaginado} onClick={() => prev()}>PREV</button>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button className={
            currentPage === index + 1?
            style.unButton:style.buttonPaginado
        } key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button className={style.buttonPaginado} onClick={() => next()}>NEXT</button>
      </div>
        </>
      )
      )
      
      }

    </div>
  );
};

export default Home;
