import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./card.css";

export default function Card({ card }) {
  const navigate = useNavigate();

  const handleNavigate = () =>  card.release_date ? navigate(`/final/movie/${card.id}`) : navigate(`/final/tv/${card.id}`)
  

  return (
    <div id="card">
      {(card.first_air_date > "2024-04-21" ||
        card.release_date > "2024-04-21") && (
        <div className="appreciated">
          <p>Coming soon</p>
        </div>
      )}
      <img
        onClick={handleNavigate}
        role="presentation"
        src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`}
        alt=" osterImage"
      />
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
    id: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    first_air_date: PropTypes.string.isRequired,
  }).isRequired,
};
