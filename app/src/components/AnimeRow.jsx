import { Rating } from "./Rating";

/* eslint-disable react/prop-types */
export const AnimeRow = ({ anime }) => {
  const handleClick = (id) => {
    console.log(`added anime ${id} to backlog`);
  };

  return (
    <div className="mb-3 d-flex gap-3">
      <div className="col-5">
        <img
          className="d-block d-sm-none w-100"
          src={`${import.meta.env.VITE_IMG_BASE}${anime.poster_path}`}
          alt={`${anime.name}-poster`}
        />

        <img
          className="d-none d-sm-block w-100"
          src={`${import.meta.env.VITE_IMG_BASE}${anime.backdrop_path}`}
          alt={`${anime.name}-backdrop`}
        />
      </div>

      <div className="d-flex flex-column gap-1 text-start">
        <h6 className="m-0">{anime.name}</h6>

        <Rating voteAverage={anime.vote_average} voteCount={anime.vote_count} />

        <p className="m-0 d-none d-sm-block">
          <small>{anime.overview}</small>
        </p>

        <button
          className="p-0 bg-transparent border-0 text-start"
          onClick={() => handleClick(anime.id)}
        >
          <img src="/public/plus.svg" alt="Plus Icon" />
        </button>
      </div>
    </div>
  );
};
