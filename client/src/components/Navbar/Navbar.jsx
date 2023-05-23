import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ( { onSearch } ) => {
// () =>{onSearch(name); setName('')}
  return (
    <div className={styles.navbar}>

      <SearchBar onSearch={onSearch}/>

      <div>
        <br />
        <span>
          <Link to="/create" className={styles.Button2}>
            Crear Juego!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
