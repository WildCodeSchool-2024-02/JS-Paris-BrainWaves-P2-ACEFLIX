import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./filterbuttons.css";

export default function FilterMovies({
  setFilter,
  setIdGenre,
  setGenreStatus,
  setPage,
}) {
  const url =
    "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=aea07ae608264c18c1ea1431604753c3";

  const [genresName, setGenresName] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => setGenresName(response.genres));
  });

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setGenreStatus(false);
    setPage(1);
  };

  const handleGenres = (e) => {
    setIdGenre(e.target.value);
    setGenreStatus(true);
    setPage(1);
  };

  return (
    <div className="buttons-movies-container">
      <button
        type="button"
        value="popular"
        className="buttons-movies"
        onClick={handleFilter}
      >
        Popular
      </button>
      <button
        type="button"
        value="upcoming"
        className="buttons-movies"
        onClick={handleFilter}
      >
        Upcoming
      </button>
      <button
        type="button"
        value="top_rated"
        className="buttons-movies"
        onClick={handleFilter}
      >
        Top rated
      </button>
      <button
        type="button"
        value="now_playing"
        className="buttons-movies"
        onClick={handleFilter}
      >
        Now playing
      </button>
      {genresName?.map((content) => (
        <button
          type="button"
          key={content.id}
          value={content.id}
          className="buttons-movies"
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
};
