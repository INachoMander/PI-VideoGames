import style from "../About/About.module.css";
import { Link } from "react-router-dom";
import linkedin from './linkedin.png'
import instagram from './instagram3.png'
import github from './github.png'


const About = () => {
  return (
    <div>

<Link to="/home">
        <a  className={style.a} href="#"><span >HOME</span><i></i></a>
      </Link>

      <div className={style.container}>
        <div className={style.img_content}>
          <div className={style.img}>
            <div className={style.info}>
              <h1>Ignacio Mander</h1>
              <h4>Full Stack Developer</h4>
            </div>
           
          </div>
        </div>
      </div>
      <div>
      <a
              className="icon"
              href="https://www.linkedin.com/in/ignacio-mander-789b56268/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={style.iconL} src={linkedin} alt="linkedin"></img>
            </a>
            <a
              className="icon"
              href="https://github.com/INachoMander/PI-VideoGames"
              target="_blank"
              rel="noreferrer"
            >
              <img className={style.iconG} src={github} alt="GitHub"></img>
            </a>
            <a
              className="icon"
              href="https://www.instagram.com/nachito.m24/?hl=es-la"
              target="_blank"
              rel="noreferrer"
            >
              <img className={style.iconI} src={instagram} alt="Instagram"></img>
            </a>
          </div>
      
    </div>
  );
};
export default About;
