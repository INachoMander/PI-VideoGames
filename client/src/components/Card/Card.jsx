import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, background_image, name, genres, rating }) => {
  return (
    <Link to={`/detail/${id}`} className={style.link}>
      <div className={style.card}>
        <div className={style.poster}>
          <img className={style.imagen} src={background_image} alt={name} />
        </div>
            <div className={style.details}>
            <div className={style.box}>
            <h2 className={style.name}> {name}</h2>
            </div>
            
            <h2>GENRES: {genres.join(", ")}</h2>
            <h2>RATING: {rating}</h2>
          </div>
      </div>
    </Link>
  );
};
export default Card;
