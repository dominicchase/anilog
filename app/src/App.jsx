/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AnimeRow } from "./components/AnimeRow";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [animeData, setAnimeData] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?with_keywords=210024&page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setAnimeData(json));
  }, []);

  return (
    <div className="container">
      {animeData &&
        animeData.results.map((anime) => (
          <AnimeRow key={`${anime.id}`} anime={anime} />
        ))}
    </div>
  );
}

// const [search, setSearch] = useState("");

// const handleClick = () => {
//   fetch(
//     `https://api.themoviedb.org/3/search/tv?with_keywords=210024&page=1&query=${search}`,
//     {
//       headers: {
//         Authorization: `Bearer ${import.meta.env.REACT_APP_MOVIE_DB_TOKEN}`,
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((json) => setAnimeData(json));
// };

export default App;
