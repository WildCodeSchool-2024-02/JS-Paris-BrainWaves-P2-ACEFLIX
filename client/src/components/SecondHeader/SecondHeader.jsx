import "./secondHeader.css";
import PropTypes from "prop-types";

export default function SecondHeader({ handleAll, handleMovies, handleSeries}) {
  
  return (
    <div id="SecondHeader">
      <div className="SecondHeader-btn">
        <button type="button" value="movie" onClick={handleMovies}>
          Movies
        </button>
        <button type="button" onClick={handleAll}>All</button>
        <button type="button" value="tv_serie"  onClick={handleSeries}> 
          Series
        </button>
      </div>
    </div>
  );
}

SecondHeader.propTypes = {
  handleMovies: PropTypes.func.isRequired,
  handleAll: PropTypes.func.isRequired,
  handleSeries: PropTypes.func.isRequired,
};

