import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNames } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getNames(state));
    setState("");
    setCurrentPage(1); // Aquí puedes llamar directamente a la función setCurrentPage
  };

  const setCurrentPage = (page) => {
    // Implementa la lógica que corresponda para actualizar la página actual
    console.log("setCurrentPage", page);
    // ...
    console.log("Valor de búsqueda:", state);

    // Verificar si el nombre es correcto y mostrar el videojuego correspondiente
    if (state === "nombre_correcto") {
      console.log("Nombre correcto. Mostrar el videojuego");
      // Aquí puedes realizar acciones adicionales, como mostrar el videojuego en la pantalla
    } else {
      console.log("Nombre incorrecto. No se muestra el videojuego");
    }
  };

  return (
    <div className={styles.navbar}>
      <form>
        <input
          className={styles.searchbar}
          value={state}
          type="search"
          onChange={handleChange}
          placeholder="Buscar por nombre"
        />
        <button
          type="submit"
          className={styles.Button}
          onClick={handleSubmit}
        >
          Buscar
        </button>
      </form>
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
