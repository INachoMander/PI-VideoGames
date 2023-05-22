import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_NAMES= "GET_NAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const GET_BY_GENRES = "GET_BY_GENRES";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const ORDER_BY = "ORDER_BY";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const GET_PLATFORMS = 'GET_PLATFORMS'


export const getAllvideogames = () =>{
    return async (dispatch)=>{
        try {
            const {data}= await axios.get("/videogames");
            return dispatch({
                type: "GET_ALL_VIDEOGAMES",
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
                type: "GET_NAMES",
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
                type: "GET_VIDEOGAME",
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
                type: "GET_BY_GENRES",
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
                type: "CREATE_VIDEOGAME",
                payload: data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const orderBy = (payload) =>{
    return {
        type: "ORDER_BY",
        payload,
    }
}

export const orderByRating = (payload)=>{
    return{
        type: "ORDER_BY_RATING",
        payload,
    }
}

export const filterBySource = (payload)=>{
    return{
        type: "FILETR_BY_SOURCE",
        payload,
    }
}

export const filterByGenres=(payload)=>{
    return{
        type: "FILTER_BY_GENRES",
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