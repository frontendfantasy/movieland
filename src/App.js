import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

// const Person = ({ name, gender, age }) => {
//   return (
//     <>
//       <h1>Hello {name}</h1>
//       <h2>Gender: {gender}</h2>
//       <h2>Age: {age}</h2>
//     </>
//   );
// };

// const App = () => {
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     console.log(`you changed the count to ${counter}`);
//   }, [counter]);

//   return (
//     <>
//       {/* <Person name="Sami" gender="male" age="21" /> */}
//       {/* <button onClick={() => setCounter((prevCount) => prevCount - 1)}>
//         -
//       </button>
//       <h1>{counter} </h1>
//       <button onClick={() => setCounter((prevCount) => prevCount + 1)}>
//         +
//       </button> */}
//     </>
//   );
// };

// const apiKey = process.env.API_URL;
const apiKey = "http://www.omdbapi.com?apikey=3643fc22";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    searchMovies("");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${apiKey}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, imbID) => (
            <MovieCard movie={movie} key={imbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found </h2>
        </div>
      )}
    </div>
  );
};

export default App;
