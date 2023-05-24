import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteStates } from "../../redux/actions/index";
import Card from "../Card/Card";


const GamesNames = () => {
    const dispatch = useDispatch()
    const gamesByName = useSelector(state => state.getAllVideoGames)

    useEffect(() => {
        return dispatch(deleteStates())
    }, [dispatch])
    if (!gamesByName) {
        return null; // O puedes mostrar un mensaje de carga u otro contenido
    }

    return (
        <div>
            <SearchBar />
            <h1>juegos por nombres</h1>
            {
                gamesByName.map(game => {
                    return(
                        <Card 
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            image={game.background_image}
                            genres={game.genres}
                        />
                    )
                })
            }
        </div>
    )

}

export default GamesNames;