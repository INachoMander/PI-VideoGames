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
    <div>
      <input
        type="search"
        placeholder="Buscar.."
        value={name}
        onChange={handleInputChange}
      />

      <Link to="/name">
        <button onClick={handleSubmit}>
          Buscar
        </button>
      </Link>
    </div>
  );
}
