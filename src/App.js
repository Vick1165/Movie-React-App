import React, { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie";

// 34.51
//https://youtu.be/sZ0bZGfg_m4?t=2416

const ApiKey = "7144d7031e83d249c05dcd347f0f5021";
const DiscoverApi = `https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&language=en-US&sort_by=popularity.desc`;

const SearchApi = `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&language=en-US&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(DiscoverApi);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SearchApi + searchTerm);

      setSearchTerm("");
    }
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            type="search"
            className="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
