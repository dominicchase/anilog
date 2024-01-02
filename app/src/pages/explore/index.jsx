import { useEffect, useState } from "react";
import { AnimeRow } from "../../components/AnimeRow";

export const Explore = () => {
  const [anime, setAnime] = useState(null);

  // TODO: pagination / inifinite scrolling

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
      .then((json) => setAnime(json.results));
  }, []);

  return anime && anime.map((a) => <AnimeRow key={`${a.id}`} anime={a} />);
};
