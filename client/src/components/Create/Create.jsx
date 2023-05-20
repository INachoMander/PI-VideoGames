import s from "./Create.module.css"
import React,{ useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {createVideogame, getByGenres, getPlatforms} from "../../redux/actions/index"
import {NavLink, useNavigate} from "react-router-dom";

function validaciones(input) {
   let errors={}
   
   if(!input.name){
      errors.name= "Nombre obligatorio";
   }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
      errors.name="Solo letras, numeros, - y ( )"
   }

   if (!input.image && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
      errors.image="URL invalida"
   }

   if(!input.description){
      errors.description="Descripcion obligataria"
   }else if(input.description.length > 256){
      errors.description= "Descripcion muy larga. Maximo 256 caracteres"
   }

   if(!input.released){
      errors.released = "Fecha de lanzamiento obligatoria"
   }

   if(!input.rating){
      errors.rating="Rating obligatorio"
   }else if(input.rating>5 || input.rating<0){errors.rating="El rating debe estar entre  0 y 5"}

   return errors;
}

const Create =() =>{
   const [input, setInput] = useState({
      name: "",
      image: "",
      description: "",
      genres: [],
      platforms:[]
   });

const [errors, setErrors]= useState({});

const dispatch= useDispatch();
const navigate= useNavigate();

const generos = useSelector((state)=>state.genres);
//console.log(generos)
const allNames = useSelector((state)=> state.allVideogames);
const allPlatforms = useSelector((state) => state.platforms);


useEffect(()=>{
   dispatch(getByGenres());
   dispatch(getPlatforms());
}, [dispatch])

function handleSubmit(e) {
   e.preventDefault();
   let noRepetir = allNames.filter(n=> n.name === input.name);
   if(noRepetir.length!==0){
      alert("Ya existe un juego con ese nombre! Elije otro")
   } else{
      let error= Object.keys(validaciones(input))
      if(error.length!==0 || !input.genres.length){
         alert("Complete los campos correctamente")
      }else{
         dispatch(createVideogame(input));
         setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
         });
         alert("Juego creado correctamente");
      }
      navigate('/home')
   }
}

function handleChange(e){
   e.preventDefault();
   setInput((prev)=>({...prev, [e.target.name]: e.target.value}));
   setErrors(validaciones({
      ...input,
      [e.target.name]: [e.target.value]
   }))
}

function handleGenres(e){
   if(!input.genres.includes(e.target.value)){
      setInput({
         ...input,
         genres: [...input.genres, e.target.value]
      })
   }
}


function handleDeleteG(e){
   setInput({
      ...input,
      platforms: input.platforms.filter((plat)=>plat !==e)
   })

}
const handlePlatform = (event) => {
     
    if(event.target.value === "all"){
     return 
    }
     setInput({
       ...input,
       platforms: [...new Set([...input.platforms, event.target.value ])],
     });
   
   
 };

 const handleDeletePlatform = (event) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((p) => p !== event),
    });
  };

return(
   <div>
      <form onSubmit={(e) => handleSubmit(e)} className={s.box_form}>
        <div className={s.form}>
          <h2 className={s.titulo}>CREA TU PROPIO VIDEOJUEGO</h2>

          <div className={s.grupo}>
            <input
              className={s.create_input}
              type="text"
              required
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              /> <span className={s.barra}></span>
            <label className={s.label}>Nombre: </label>
            {errors.name && (
              <p className={s.danger}>{errors.name}</p>
            )}
          </div>


          <div className={s.grupo}>
            <input
            className={s.create_input}
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
              /> <span className={s.barra}></span>
            <label className={s.label}>Imagen URL: </label>
            {errors.image && (
              <p className={s.danger}>{errors.image}</p>
            )}
          </div>


          <div className={s.grupo}>
            <input
            className={s.create_input}
              required
              type='date'
              name="released"
              value={input.released}
              placeholder='yyyy-mm-dd'
              onChange={(e) => handleChange(e)}
              /> <span className={s.barra}></span>
            <label className={s.label}>Fecha de lanzamiento: </label>
            {errors.released && (
              <p className={s.danger}>{errors.released}</p>
            )}

          </div>

          <div className={s.grupo}>
            <input
            className={s.create_input}
              required
              type="number"
              name="rating"
              value={input.rating}
              onChange={(e) => handleChange(e)}
              /> <span className={s.barra}></span>
            <label className={s.label}>Rating: </label>
            {errors.rating && (
              <p className={s.danger}>{errors.rating}</p>
            )}
          </div>


          <div className={s.grupo}>
            <select className={s.select_create} id="genres" defaultValue="" onChange={(e) => handleGenres(e)}>
              <option className={s.option_create} value='' disabled hidden>Elija los géneros...</option>
              {generos.genres && generos.genres.length > 0 ? generos.genres.map(g => {
                return (
                  <option className={s.option_create} key={g.id} value={g.name}>{g.name}</option>
                  );
                }): <option key="Error-option">Error cargar géneros</option>}
            </select> <span className={s.barra}></span>
            <label className={s.label}>Generos: </label>
            {input.genres.map((g) => (
              <div className={s.box_opcion}>
                <div className={s.opcion_title}>{g}</div>
                <button className={s.btn_remove} onClick={() => handleDeleteG(g)} key={g} value={g}><span className={s.x}>X</span></button>
              </div>
        ))}
          </div>


          <div className={s.grupo}>
          <label className={s.label}>Plataformas: </label>
          <select className={s.select_create} onChange={(event) => handlePlatform(event)}>
            <option value="all">Elija las plataformas...</option>
            {allPlatforms?.map((p) => {
              return (
                <option key={p} value={p}>
                  {p}
                </option>
              );
            })}
          </select>
          </div>
          <div>
          
          {input.platforms.map((p) => (
            <div key={p} className={s.box_opcion}>
              <p>{p}</p>
              <button className={s.btn_remove}
                onClick={() => handleDeletePlatform(p)}
                key={p.id}
                id={p.id}
                value={p.name}
              >
                <span className={s.x}>X</span>
              </button>
            </div>
          ))}
          </div>

          <div className={s.grupo}>
            <textarea
              required
              type="text"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
              > </textarea>
            <label className={s.description}>Descripcion: </label>
            {errors.description && (
              <p className={s.danger}>{errors.description}</p>
            )}
          </div>
      </div>
      <div>
          <button type="submit" className={s.btn_submit}>CREAR VIDEOJUEGO</button>
      </div>
      <div className={s.box_home}>
          <NavLink to={'/home'} className={s.back_home}>Cancelar</NavLink>
      </div>
      </form>

    </div>
  );
}

export default Create;