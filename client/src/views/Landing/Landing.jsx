import style from "../Landing/Landing.module.css"
import { Link } from "react-router-dom";

const Landing = () => {

return(<div className={`${style.landing} ${style["full-screen-bg"]}`}>

      <div className={style.container_button}>
             
      <Link to="/home"><a className={style.a} href="#"><span>START GAME</span><i></i></a></Link>
      
      </div>
      
      </div>)

}
export default Landing;