import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./filterbuttons.css";

export default function FilterSeries({
  setFilter,
  setIdGenre,
  setGenreStatus,
  setPage,
  setDisplayGenre2,
  displayGenre2,
}) {
  const url =
    "https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=aea07ae608264c18c1ea1431604753c3";

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
    setDisplayGenre2({ name: e.target.value });
  };

  const handleGenres = (e) => {
    setIdGenre(e.target.value);
    setGenreStatus(true);
    setPage(1);
    setDisplayGenre2(
      genresName.filter((genre) => genre.id === parseInt(e.target.value, 10))[0]
    );
  };

  return (
    <div className="buttons-movies-container">
      <button
        type="button"
        value="Top_rated"
        className={
          displayGenre2.name === "Top_rated"
            ? "buttons-movies active-genre"
            : "buttons-movies"
        }
        onClick={handleFilter}
      >
        Top rated
      </button>
      <button
        type="button"
        value="Popular"
        className={
          displayGenre2.name === "Popular"
            ? "buttons-movies active-genre"
            : "buttons-movies"
        }
        onClick={handleFilter}
      >
        Popular
      </button>
      {genresName?.map((content) => (
        <button
          type="button"
          key={content.id}
          value={content.id}
          className={
            displayGenre2.id === content.id
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

FilterSeries.propTypes = {
  setFilter: PropTypes.func.isRequired,
  setIdGenre: PropTypes.func.isRequired,
  setGenreStatus: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setDisplayGenre2: PropTypes.func.isRequired,
  displayGenre2: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number,
  }).isRequired,
};
