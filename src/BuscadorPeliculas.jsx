import { useState } from "react";

export const BuscadorPeliculas = () => {
    const [busqueda, setBusqueda] = useState('');
    const [peliculas, setPeliculas] = useState([]);
    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY = '59ff2705b1c0791af0f434a881f14453';

    const handleInputChange = (e) => { 
        setBusqueda(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchPeliculas();
    };

    const fetchPeliculas = async () => {
        try { 
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`);
            const data = await response.json();
            setPeliculas(data.results)
            console.log(data)
        } catch (error) {
            console.error('Error al buscar películas:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Buscador de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Ingrese nombre de la película"
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    Buscar película
                </button>
            </form>
            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card"> 
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title}  />

                        <h1>{pelicula.title}</h1>
                        <p>{pelicula.overview}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};
