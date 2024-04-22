import { useEffect, useState, useContext } from "react";
import "./bannercard.css";
import PropTypes from "prop-types";
import { FaPlay } from "react-icons/fa";
import VideoContext from "../../ContextVideo";

export default function BannerCard({ image, overview, title, id }) {
  const [content, setContent] = useState(null);
  const { setUrlVideo, setBlackScreen } = useContext(VideoContext);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=aea07ae608264c18c1ea1431604753c3`
    )
      .then((response) => response.json())
      .then((response) => setContent(response));
  }, [id]);

  let genresContent = [];
  let voteaverage = "";
  if (content) {
    genresContent = content.genres;
    voteaverage = content.vote_average;
  }

  const handleclick = () => {
    setBlackScreen(true);
    setUrlVideo(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=aea07ae608264c18c1ea1431604753c3`
    );
    document.body.classList.add("active");
  };

  return (
    <div className="card-container">
      <div className="img-container">
        <div className="bloc-black">1</div>
        <img
          className="img-cinema"
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt="bannière"
        />
      </div>
      <div className="content-container">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-overview">{overview}</p>
        <div className="movie-genres">
          {genresContent?.map((value) => (
            <p key={value.name}>{value.name}</p>
          ))}
        </div>
        <div className="reco-release">
          <p className="recommandation">
            Average rating {Math.round(voteaverage * 10)} %{" "}
          </p>
          <p className="release">{content?.release_date.slice(0, 4)}</p>
          <p className="language">{content?.original_language.toUpperCase()}</p>
          {content && (
            <p className="runtime">
              {Math.floor(content.runtime / 60)}h{content.runtime % 60}m
            </p>
          )}
        </div>
        <div className="button-container">
          <button type="button" className="play" onClick={handleclick}>
            <p>PLAY</p>
            <FaPlay className="play-icon" />
          </button>
          <button type="button" className="more">
            {" "}
            MORE{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

BannerCard.propTypes = {
  image: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
