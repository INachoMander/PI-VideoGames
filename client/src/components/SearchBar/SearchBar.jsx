import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBar } from '../../redux/actions/index';
import style from '../SearchBar/SearchBar.module.css';

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    setName(event.target.value)
  };

  const dispatchName = (e) => {
    e.preventDefault();
    dispatch(searchBar(name))
  
  };

  return (
    <div className={style.container}>
      <form>
        <input
          type="text"
          placeholder="NAME VIDEOGAME"
          onChange={handleSearch}
          value={name}
          className={style.input}
        />
        <button className={style.button} onClick={(e) => dispatchName(e)}>SEARCH</button>
      </form>
    </div>
  );
};

export default SearchBar;
