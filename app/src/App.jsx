import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [animeData, setAnimeData] = useState(null);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
      .then((res) => res.json())
      .then((json) => setAnimeData(json));
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Attack On Titan"
      />
      <button onClick={handleClick}>Search!</button>

      {animeData &&
        animeData.data.map((anime) => (
          <div className="d-flex mb-3" key={`${anime.title}`}>
            <div>
              <img src={anime.images.jpg.image_url} />
            </div>
            <div>
              <p>{anime.title}</p>
              <p className="">
                <small>{anime.synopsis}</small>
              </p>
            </div>
          </div>
        ))}
    </>
  );
}
export default App;
