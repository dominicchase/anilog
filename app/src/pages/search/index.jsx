import { useState } from "react";
import { AnimeRow } from "../../components/AnimeRow";

export const Search = () => {
  const [anime, setAnime] = useState(null);
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;

    setSearch(value);

    fetch(`https://api.themoviedb.org/3/search/tv?query=${value}&page=1`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setAnime(json.results.filter((elem) => elem.genre_ids.includes(16)));
      });
  };

  return (
    <>
      <input
        className="mb-3"
        type="search"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Cool anime title"
      />

      {anime &&
        anime.map((anime) => <AnimeRow key={`${anime.id}`} anime={anime} />)}
    </>
  );
};
