import style from "./Cards.module.css";
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
