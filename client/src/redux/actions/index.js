import { GET_ALL_VIDEOGAMES, GET_NAMES, GET_VIDEOGAME, GET_BY_GENRES, CREATE_VIDEOGAME, SEARCH_BAR , ORDER_BY, ORDER_BY_RATING, FILTER_BY_SOURCE, FILTER_BY_GENRES, GET_PLATFORMS, DELETE_STATES } from '../actions/actions-types';
import axios from "axios";

export const getAllvideogames = () =>{
    return async (dispatch)=>{
        try {
            const {data}= await axios.get("/videogames");
            return dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getNames=(name)=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios.get(`/videogames?name=${name}`);
            return dispatch({
                type: GET_NAMES,
                payload: data,
            })
        } catch (error) {
            console.log(error);
           
        }
    }
}

export const getVideogame = (id) =>{
    return async (dispatch) => {
        try {
            const {data}= await axios.get(`/videogames/${id}`);
            return dispatch({
                type: GET_VIDEOGAME,
                payload: data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getByGenres=()=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios.get('/genres');
            return dispatch({
                type: GET_BY_GENRES,
                payload: data,
            })
        } catch (error) {
            console.log(error);
        }   
    }
}

export const createVideogame = (videogame)=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios.post('/videogame', videogame);
            return dispatch({
                type: CREATE_VIDEOGAME,
                payload: data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const searchBar = (name) => {
    return async function (dispatch) {
      const game = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
     
      dispatch({ type: SEARCH_BAR, payload: game.data });
    };
};

export const orderBy = (payload) =>{
    return {
        type: ORDER_BY,
        payload,
    }
}

export const orderByRating = (payload)=>{
    return{
        type: ORDER_BY_RATING,
        payload,
    }
}

export const filterBySource = (payload)=>{
    return{
        type: FILTER_BY_SOURCE,
        payload,
    }
}

export const filterByGenres=(payload)=>{
    return{
        type: FILTER_BY_GENRES,
        payload,
    }
}

export const getPlatforms =()=>{
    return async (dispatch) =>{
      try {
        const response = await axios.get('/videogames');
        const allPlatfroms = await response.data.map((e)=> e.platforms);
        const plataformas = await allPlatfroms.flat()
        const todasPlat = [...new Set(plataformas)]
        return dispatch({
            type: GET_PLATFORMS,
            payload: todasPlat,
        })
    } catch (error) {
        console.log(error);
    }}
}

export const deleteStates = () => {
    return async function (dispatch) {
        return dispatch ({
            type: DELETE_STATES
        })
    }
}