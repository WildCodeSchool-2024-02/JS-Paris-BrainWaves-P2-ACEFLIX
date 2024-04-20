import PropTypes from "prop-types";
import "./secondHeader.css";

export default function SecondHeader({
  handleAll,
  handleMovies,
  handleSeries,
  activeAll,
  activeMovie,
  activeSerie,
}) {
  return (
    <div id="SecondHeader">
      <div className="SecondHeader-btn">
        <button
          className={
            activeAll
              ? "button-filter-content isActive"
              : "button-filter-content"
          }
          type="button"
          onClick={handleAll}
        >
          All
        </button>
        <button
          className={
            activeMovie
              ? "button-filter-content isActive"
              : "button-filter-content"
          }
          type="button"
          value="movie"
          onClick={handleMovies}
        >
          Movies
        </button>
        <button
          className={
            activeSerie
              ? "button-filter-content isActive"
              : "button-filter-content"
          }
          type="button"
          value="tv_serie"
          onClick={handleSeries}
        >
          Series
        </button>
      </div>
    </div>
  );
}

SecondHeader.propTypes = {
  handleAll: PropTypes.func.isRequired,
  handleMovies: PropTypes.func.isRequired,
  handleSeries: PropTypes.func.isRequired,
  activeAll: PropTypes.bool.isRequired,
  activeMovie: PropTypes.bool.isRequired,
  activeSerie: PropTypes.bool.isRequired,
};
