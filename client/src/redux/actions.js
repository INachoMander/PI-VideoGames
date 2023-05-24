
import axios from "axios";

export const GET_VIDEO_GAMES = "GET_VIDEO_GAMES";
export const GET_GENRES = "GET_GENRES";
export const RESET_SELECT = "RESET_SELECT";
export const SEARCH_BAR = "SEARCH_BAR";
export const GET_ID = "GET_ID";
export const BACK_HOME = "BACK_HOME";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const FILTER_GENRES = "FILTER_GENRES";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_RATING = "ORDER_RATING";
export const CREATE_VIDEO_GAME = "CREATE_VIDEO_GAME"
export const DELETE_GAME ="DELETE_GAME"


export const getAllGames = () => {
  return async function (dispatch) {
    const URL_BASE = "http://localhost:3001/videogames";
    const peticion = await axios.get(URL_BASE);

    return dispatch({ type: GET_VIDEO_GAMES, payload: peticion.data });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    const URL_BASE = "http://localhost:3001/genres";
    const peticionGenres = await axios.get(URL_BASE);

    const genres = peticionGenres.data.map((e) => e.name);

    return dispatch({ type: GET_GENRES, payload: genres });
  };
};



export const removeGame = (detailId) => {
  return async function (dispatch){
  await axios.delete(`http://localhost:3001/videogames/${detailId}`)
 
  return dispatch({type:DELETE_GAME , payload: detailId})
}
}

export const resetSelect = () => {
  return {
    type: RESET_SELECT,
  };
};

export const searchBar = (name) => {
  return async function (dispatch) {
    const game = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
   
    dispatch({ type: SEARCH_BAR, payload: game.data });
  };
};

//para el detail
export const getById = (id) => {
  return async function (dispatch) {
    const getId = await axios.get(`http://localhost:3001/videogames/${id}`);

    dispatch({ type: GET_ID, payload: getId.data });
  };
};

export const setDetail = () => {
  return {
    type: BACK_HOME,
    payload: {},
  };
};



//FILTROS

export const filterOrigin = (payload) => {
  return {
    type: FILTER_ORIGIN,
    payload,
  };
};
export const filterGenres = (payload) => {
  return {
    type: FILTER_GENRES,
    payload,
  };
};
export const orderByName = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};
export const orderByRating = (payload) => {
  return {
    type: ORDER_RATING,
    payload,
  };
};

