import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import VideoContext from "../ContextVideo";
import "./card.css";

export default function Card({ card }) {
  const navigate = useNavigate();

  const handleNavigate = () =>
    card.release_date
      ? navigate(`/final/movie/${card.id}`)
      : navigate(`/final/tv/${card.id}`);

  const theApiKey = import.meta.env.VITE_API_KEY;

  const { setUrlVideo, setBlackScreen } = useContext(VideoContext);

  const handleUrlVideo = () => {
    setBlackScreen(true);
    document.body.classList.add("active");
    if (card.release_date) {
      setUrlVideo(
        `https://api.themoviedb.org/3/movie/${card.id}/videos?language=en-US&api_key=${theApiKey}`
      );
    } else {
      setUrlVideo(
        `https://api.themoviedb.org/3/tv/${card.id}/videos?language=en-US&api_key=${theApiKey}`
      );
    }
  };
  const pointer = "...";
  let nameDisplay = "";
  if (card.title) {
    if (card.title.length > 40) {
      nameDisplay = card.title.slice(0, 48) + pointer;
    } else {
      nameDisplay = card.title;
    }
  } else {
    nameDisplay = card.name;
    if (nameDisplay.length > 40) {
      nameDisplay = nameDisplay.slice(0, 48) + pointer;
    }
  }

  const dateGenerate = (str) => {
    let newDateMovie = "";
    let strMut = str;
    strMut = card.release_date.split("-");
    newDateMovie = new Date(strMut[0], strMut[1] - 1, strMut[2]);
    return newDateMovie;
  };

  let newDateMovie = "";
  if (card.release_date) {
    newDateMovie = dateGenerate(card.release_date);
  }

  return (
    <div id="card">
      {newDateMovie > new Date() && (
        <div className="appreciated">
          <p>Coming soon</p>
        </div>
      )}
      <img
        onClick={handleNavigate}
        role="presentation"
        src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`}
        alt="posterImage"
      />
      <div className="hidden-display">
        <div className="content-container-card">
          <h3 className="title-card">{nameDisplay}</h3>
          <p className="release-card">
            {card.release_date ? card.release_date : card.first_air_date}{" "}
          </p>
          {card.vote_average !== 0 ? (
            <p className="recommandation-card">
              Average rating {Math.floor(card.vote_average * 10)} %
            </p>
          ) : (
            <p className="recommandation-card">No rating for the moment</p>
          )}
        </div>
        <button type="button" className="play-card" onClick={handleUrlVideo}>
          <p>PLAY</p>
          <FaPlay className="play-icon-card" />
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
    first_air_date: PropTypes.string,
  }).isRequired,
};
