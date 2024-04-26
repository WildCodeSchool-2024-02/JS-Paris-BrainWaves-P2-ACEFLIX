import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./filterbuttons.css";

export default function FilterMovies({
  setFilter,
  setIdGenre,
  setGenreStatus,
  setPage,
  setDisplayGenre,
  displayGenre,
}) {
  const theApiKey = import.meta.env.API_KEY;
  const url =
  `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${theApiKey}`;

  const [genresName, setGenresName] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => setGenresName(response.genres));
  });

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
    setGenreStatus(false);
    setPage(1);
    setDisplayGenre({ name: e.target.value });
  };

  const handleGenres = (e) => {
    setIdGenre(e.target.value);
    setGenreStatus(true);
    setPage(1);
    setDisplayGenre(
      genresName.filter((genre) => genre.id === parseInt(e.target.value, 10))[0]
    );
  };

  return (
    <div className="buttons-movies-container">
      <button
        type="button"
        value="Popular"
        className={
          displayGenre.name === "Popular"
            ? "buttons-movies active-genre"
            : "buttons-movies"
        }
        onClick={handleFilter}
      >
        Popular
      </button>
      <button
        type="button"
        value="Upcoming"
        className={
          displayGenre.name === "Upcoming"
            ? "buttons-movies active-genre"
            : "buttons-movies"
        }
        onClick={handleFilter}
      >
        Upcoming
      </button>
      <button
        type="button"
        value="Top_rated"
        className={
          displayGenre.name === "Top_rated"
            ? "buttons-movies active-genre"
            : "buttons-movies"
        }
        onClick={handleFilter}
      >
        Top rated
      </button>
      <button
        type="button"
        value="Now_playing"
        className={
          displayGenre.name === "Now_playing"
            ? "buttons-movies active-genre"
            : "buttons-movies"
        }
        onClick={handleFilter}
      >
        Now playing
      </button>
      {genresName?.map((content) => (
        <button
          type="button"
          key={content.id}
          value={content.id}
          className={
            displayGenre.id === content.id
              ? "buttons-movies active-genre"
              : "buttons-movies"
          }
          onClick={handleGenres}
        >
          {content.name}
        </button>
      ))}
    </div>
  );
}

FilterMovies.propTypes = {
  setFilter: PropTypes.func.isRequired,
  setIdGenre: PropTypes.func.isRequired,
  setGenreStatus: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setDisplayGenre: PropTypes.func.isRequired,
  displayGenre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number,
  }).isRequired,
};
