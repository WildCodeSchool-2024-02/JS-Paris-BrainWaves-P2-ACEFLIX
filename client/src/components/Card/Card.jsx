import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import "./card.css";

export default function Card({ card, setBlackScreen, setIdVideo, id }) {
  const handleVideo = () => {
    setBlackScreen(true);
    document.body.classList.add("active");
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=aea07ae608264c18c1ea1431604753c3`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.last_episode_to_air) {
          setIdVideo(
            `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=aea07ae608264c18c1ea1431604753c3`
          );
        } else {
          setIdVideo(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=aea07ae608264c18c1ea1431604753c3`
          );
        }
      });
  };
  return (
    <div id="card">
      <img src={`https://image.tmdb.org/t/p/w200/${card.poster_path}`} alt="" />

      <div className="hidden-display">
        <div className="info-moviec-card">
          <h3>{card.title ? card.title : card.name}</h3>
          <p>{card.release_date} </p>
          <p className="vote"> {parseFloat(card.vote_average.toFixed(1))}/10</p>

          <div className="btn-container">
            <button type="button" aria-label="logo" onClick={handleVideo}>
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
  }).isRequired,
  setBlackScreen: PropTypes.func.isRequired,
  setIdVideo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
