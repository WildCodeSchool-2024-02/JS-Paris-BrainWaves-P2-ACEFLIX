import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import "./card.css";

export default function Card({ card }) {
  return (
    <div id="card">
      {(card.first_air_date > "2024-04-21" ||
        card.release_date > "2024-04-21") && (
        <div className="appreciated">
          <p>Coming soon</p>
        </div>
      )}
      <img src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`} alt="" />
      <div className="hidden-display">
        <div className="info-moviec-card">
          <h3>{card.title ? card.title : card.name}</h3>
          <p>{card.release_date ? card.release_date : card.first_air_date} </p>
          <p className="vote">
            {" "}
            {Math.floor(parseFloat(card.vote_average) * 10) / 10}/10
          </p>

          <div className="btn-container">
            <button type="button" aria-label="logo">
              <FaPlay />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
Card.propTypes = {
  card: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    first_air_date: PropTypes.string,
  }).isRequired,
};
