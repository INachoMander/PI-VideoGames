import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNames } from '../../redux/actions/index';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(event) {
    setName(event.target.value);
  }
  function handleSubmit() {
    dispatch(getNames(name));
  }

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="search"
        placeholder="Buscar.."
        value={name}
        onChange={handleInputChange}
        className={styles.searchInput}
      />

      <Link to="/name">
        <button onClick={handleSubmit} className={styles.searchButton}>
          Buscar
        </button>
      </Link>
    </div>
  );
}