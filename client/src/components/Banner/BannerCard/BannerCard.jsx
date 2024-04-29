import { useEffect, useState, useContext } from "react";
import "./bannercard.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import VideoContext from "../../ContextVideo";

export default function BannerCard({ overview, title, id }) {
  const [content, setContent] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const { setUrlVideo, setBlackScreen } = useContext(VideoContext);
  const navigate = useNavigate();
  const theApiKey = import.meta.env.VITE_API_KEY;

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${theApiKey}`
    )
      .then((response) => response.json())
      .then((response) => setContent(response));
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?include_image_language=null&api_key=${theApiKey}`
    )
      .then((response) => response.json())
      .then((response) =>
        setBackdrop(shuffle(response.backdrops.slice(0, 10)))
      );
  }, [id, theApiKey]);

  let genresContent = [];
  let voteaverage = "";
  if (content) {
    genresContent = content.genres;
    voteaverage = content.vote_average;
  }

  const handleclick = () => {
    setBlackScreen(true);
    setUrlVideo(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${theApiKey}`
    );
    document.body.classList.add("active");
  };

  const handleNavigate = () => navigate(`/final/movie/${id}`);

  return (
    <div className="card-container">
      <div className="img-container">
        <div className="bloc-black">1</div>
        {backdrop && (
          <img
            className="img-cinema"
            src={`https://image.tmdb.org/t/p/original${backdrop[0].file_path}`}
            alt="bannière"
          />
        )}
      </div>
      <div className="content-container">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-overview">{overview}</p>
        <div className="movie-genres">
          {genresContent
            ?.map((value) => <p key={value.name}>{value.name}</p>)
            .slice(0, 3)}
        </div>
        <div className="reco-release">
          <p className="recommandation">
            Average rating {Math.round(voteaverage * 10)} %{" "}
          </p>
          <p className="release">{content?.release_date.slice(0, 4)}</p>
          <p className="language">{content?.original_language.toUpperCase()}</p>
          {content && (
            <p className="runtime">
              {Math.floor(content.runtime / 60)} h {content.runtime % 60} min
            </p>
          )}
        </div>
        <div className="button-container">
          <button type="button" className="play" onClick={handleclick}>
            <p>PLAY</p>
            <FaPlay className="play-icon" />
          </button>
          <button type="button" className="more" onClick={handleNavigate}>
            {" "}
            MORE{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

BannerCard.propTypes = {
  overview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
