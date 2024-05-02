import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import "./boxsearch.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import VideoContext from "../ContextVideo";
import Card from "../Card/Card";

export default function BoxSearch({ setDisplay }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { setUrlVideo, setBlackScreen } = useContext(VideoContext);
  const navigate = useNavigate();
  const [suggestSearch, setSuggestSearch] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState("");

  const urlSearch = `https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=${apiKey}`;
  const urlInputSearch = `https://api.themoviedb.org/3/search/multi?query=${input}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

  useEffect(() => {
    fetch(urlSearch)
      .then((response) => response.json())
      .then((response) => setSuggestSearch(response.results));
    fetch(urlInputSearch)
      .then((response) => response.json())
      .then((response) => setSearchResults(response.results));
  }, [urlInputSearch, urlSearch]);

  // Fonction de navigation vers la page finale
  const handleNavigate = (content) => {
    if (content.release_date) {
      navigate(`/final/movie/${content.id}`);
      setDisplay(false);
    } else {
      navigate(`/final/tv/${content.id}`);
      setDisplay(false);
    }
  };
  // Fonction pour fermer la popup de recherche
  const handleClose = () => {
    setDisplay(false);
    document.body.classList.remove("active");
  };
  const handleVideo = (id, releaseDate) => {
    setBlackScreen(true);
    if (releaseDate) {
      setUrlVideo(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${apiKey}`
      );
    } else {
      setUrlVideo(
        `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${apiKey}`
      );
    }
  };

  // Fonction pour modifier le state de l'input
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  // Fonction permettant de vider l'input
  const handleClearInput = () => {
    setInput("");
  };

  return (
    <motion.section
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="box-container"
    >
      <div className="box-pop">
        <IoIosArrowBack className="arrow-close-search" onClick={handleClose} />
        <input
          className="input-search"
          type="text"
          value={input}
          placeholder="Search by movies, series or actors"
          onInput={handleInput}
        />
        {input.length > 0 && (
          <IoClose
            className="close-mark-input"
            onClick={handleClearInput}
            role="presentation"
          />
        )}
      </div>
      {input.length === 0 && (
        <div className="content-search">
          <h1 className="search-title">Suggested Movies & Series</h1>
          <div className="contents-card-search">
            {suggestSearch?.map((content) => (
              <div key={content.id} className="content-card-search">
                <img
                  className="img-search"
                  src={`https://image.tmdb.org/t/p/w500/${content.backdrop_path}`}
                  alt="img-poster"
                  onClick={() => {
                    handleNavigate(content);
                  }}
                  role="presentation"
                />
                <div className="elements-container">
                  <p
                    className="content-title-search"
                    onClick={() => {
                      handleNavigate(content);
                    }}
                    role="presentation"
                  >
                    {content?.title || content?.name}
                  </p>
                  <p className="recommandation-suggest">
                    Average rating {Math.floor(content.vote_average * 10)} %
                  </p>
                  <p className="release-suggest">
                    {content.release_date || content.first_air_date}
                  </p>
                </div>
                <button
                  type="button"
                  className="play-video-search"
                  aria-label="text"
                  onClick={() => {
                    handleVideo(content.id, content.release_date);
                  }}
                >
                  <FaPlay />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {input.length > 0 && (
        <div className="content-search">
          <h1 className="search-title">
            {searchResults.length > 0
              ? "Best results"
              : "No result for your research..."}
          </h1>
          <div className="search-card-display">
            {searchResults?.map(
              (content) =>
                content.poster_path && (
                  <div
                    key={content.id}
                    className="card-search-container"
                    onClick={handleClose}
                    role="presentation"
                  >
                    <Card card={content} />
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
}

BoxSearch.propTypes = {
  setDisplay: PropTypes.func.isRequired,
};
