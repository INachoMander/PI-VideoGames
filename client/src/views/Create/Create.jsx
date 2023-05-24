import style from "../Create/Create.module.css";
import { Link } from "react-router-dom";
import { getGenres, getAllGames } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const Create = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);




  let platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "SNES",
    "NES",
    "Commodore",
    "Atari",
    "Genesis",
    "SEGA",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    "PS5",
    "PS4",
    "PS3",
    "PS2",
    "PS1",
  ];

  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state)=>state.videoGames)

  const [valor, setvalor] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    background_image: "",
    platforms: [],
    genre: [],
  });

  //estado local de los selects
  const [valueSelect, setValueSelect] = useState("0");

  //estado local validador
  const [validador, setValidador] = useState("");

  //HANDLES

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valor.name.trim() === "" || valor.name.length <= 2) {
      setValidador("Minimum 2 characters are required in NAME field");
    } else if (valor.released === "") {
      setValidador("Release date required");
    } else if (valor.description.trim() === "") {
      setValidador("Required description");
    } else if (valor.rating === 0) {
      setValidador("the rating must be greater than 0");
    } else if (valor.background_image === "") {
      setValidador("Required image");
    } else if (valor.platforms.length === 0) {
      setValidador("One or more platforms required");
    } else if (valor.genre.length === 0) {
      setValidador("One or more genres required");
    } else {
      
      const postGame = await axios.post("http://localhost:3001/videogames", valor)
      
      setValidador("");
      setvalor({
        name: "",
        description: "",
        released: "",
        rating: 0,
        background_image: "",
        platforms: [],
        genre: [],
      });
      dispatch(getAllGames());
      alert(postGame.data.message)
      // if(videogames.find((f)=> valor.name === f.name)){
      //   alert ("VIDEOGAME ALREADY EXISTS")
      // }else {
        
      //   dispatch(createVideoGame(valor));
      // alert("VIDEOGAME CREATED SUCCESSFULLY");
      // dispatch(getAllGames());

      
      //}
      
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setvalor({
      ...valor,
      [e.target.name]: e.target.value,
    });
  };

  const hadleRating = (e) => {
    setvalor({
      ...valor,
      rating: parseFloat(e.target.value),
    });
  };

  const handleCheckGenres = (e) => {
    e.preventDefault();

    if (e.target.value) {
      setvalor({ ...valor, genre: [...valor.genre, e.target.value] });
    }
  };

  const handleClickGenres = (e) => {
    e.preventDefault();
    setvalor({
      ...valor,
      genre: valor.genre.filter((plant) => plant !== e.target.value),
    });
  };

  const handleClickPlatforms = (e) => {
    e.preventDefault();
    setvalor({
      ...valor,
      platforms: valor.platforms.filter((plat) => e.target.value !== plat),
    });
  };

  const handleCheckPlatforms = (e) => {
    e.preventDefault();
    if (e.target.value) {
      setvalor({ ...valor, platforms: [...valor.platforms, e.target.value] });
    }
    setValueSelect("0");
  };

  //HANDLES


  return (
    <div className={style.container}>
      <Link to="/home">
        <a className={style.a} href="#">
          <span>HOME</span>
          <i></i>
        </a>
      </Link>

      {validador && <div className={style.alerta}>{validador}</div>}
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputBox}>
          <input
            className={style.input}
            type="text"
            placeholder="VIDEOGAME NAME"
            name="name"
            value={valor.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={style.inputBox}>
          <label>RELEASED DATE:</label>
          <input
            className={style.date}
            type="date"
            onChange={(e) => handleChange(e)}
            name="released"
            value={valor.released}
          />
        </div>

        <div className={style.inputBox}>
          <textarea
            value={valor.description}
            className={style.input}
            type="text"
            name="description"
            id=""
            cols="30"
            rows="5"
            placeholder="VIDEOGAME DESCRIPTION"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>

        <div className={style.inputBox}>
          <select
            onChange={handleCheckPlatforms}
            className={style.option}
            value={valueSelect}
            id="1"
          >
            <option disabled value="0">
              PLATFOMRS
            </option>
            {platforms.map((e, index) => {
              return (
                <option key={index} value={e}>
                  {e}
                </option>
              );
            })}
          </select>

          <div className={style.div}>
            {valor.platforms.map((e, index) => {
              return (
                <button
                  className={style.buttonSelect}
                  onClick={handleClickPlatforms}
                  key={index}
                  value={e}
                >
                  {e}
                </button>
              );
            })}
          </div>
        </div>

        <div className={style.rangeBox}>
          <label>RATING:</label>
          <input
            className={style.range}
            type="range"
            max="5"
            min="0"
            name="rating"
            value={Number(valor.rating)}
            onChange={hadleRating}
            step="0.1"
          />
          <output className={style.number} id="rangevalue">
            {valor.rating}
          </output>
        </div>

        <div className={style.inputBox}>
          <input
            className={style.input}
            value={valor.background_image}
            type="text"
            placeholder="VIDEOGAME IMAGE"
            name="background_image"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={style.inputBox}>
          <select
            name="genre"
            className={style.option}
            value={valueSelect}
            id="2"
            onChange={handleCheckGenres}
          >
            <option disabled value="0">
              GENRES
            </option>
            {genres.map((e, index) => {
              return (
                <option key={index} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
          <div className={style.div}>
            {valor.genre.map((e, index) => {
              return (
                <button
                  className={style.buttonSelect}
                  onClick={handleClickGenres}
                  key={index}
                  value={e}
                >
                  {e}
                </button>
              );
            })}
          </div>
        </div>
        <div className={style.boxButton}>
          <button className={style.button} type="submit">
            CREATE
          </button> 
        </div>
      </form>
    </div>
  );
};

export default Create;





