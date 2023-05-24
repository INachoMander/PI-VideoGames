import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getAllGames, getById, removeGame } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";


const Detail = () => {
  const { detailId } = useParams();

  const detail = useSelector((state) => state.gameDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(detailId));
    
  }, [dispatch, detailId]);

  

  const handleDelete = () => {
    dispatch(removeGame(detailId))
    dispatch(getAllGames())
  }

  

  return (
      
      
    <div className={style.padre}>
      
      <div className={style.card}>
      <Link to="/home">
        <a  className={style.a} href="#"><span >HOME</span><i></i></a>
      </Link>
      
        {detail.name ? (
          <>
            <img
              className={style.imagen}
              src={detail.background_image}
              alt="img"
              />
            
            <h2 className={style.name}> {detail.name}</h2>
            <p>ID:{detail.id}</p>
            <p>PLATFORMS: {detail.platforms && detail.platforms.join(",  ")}</p>
            <p>GENRES: {detail.genres.join(",  ")}</p>
            <p>RELEASE DATE: {detail.released}</p>
            <p>RATING: {detail.rating}</p>
            <p className={style.p}>DESCRIPTION: {detail.description.replace(/<[^>]+>/g, "")}</p>
            {(detail.created === true)?(<Link to="/home">
            <button className={style.buttonDelete} onClick={handleDelete}> DELETE GAME</button>
            </Link>) : (<div></div>)
            }
          </>
        ) : (
          <p className={style.carga}>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default Detail;
