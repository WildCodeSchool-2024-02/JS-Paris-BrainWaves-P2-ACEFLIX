import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { IoSearch } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import aceflixLogo from "../../assets/images/aceflixLogo.png";
import DisplaySearchResults from "../DisplaySearchResults/DisplaySearchResults";
import VideoContext from "../ContextVideo";
import Video from "../Video/Video";

export default function Header({
  setIsOpen,
  setHomeActive,
  setMovieActive,
  setSerieActive,
}) {
  const [search, setSearch] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { blackScreen } = useContext(VideoContext);

  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_API_KEY;
  const fetchResults = `https://api.themoviedb.org/3/search/multi?query=${inputValue}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const searchResult = () => {
    if (inputValue === "") return console.error(" Sorry no results ");

    fetch(fetchResults)
      .then((response) => response.json())
      .then((data) => setSearch(data.results))
      .catch((err) => console.error(err));

    setInputValue("");
    setDisplay(true);
    return true;
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      searchResult();
    }
  };

  const openNav = () => {
    setIsOpen(true);
  };

  const navigateHome = () => {
    navigate("/");
    setHomeActive(true);
    setMovieActive(false);
    setSerieActive(false);
  };

  return (
    <header>
      {blackScreen && <Video />}
      <div id="Header">
        <div className="hearder-burger">
          <button
            aria-label="menu"
            className="burger-btn"
            type="button"
            onClick={openNav}
          >
            <SlMenu />
          </button>
        </div>

        <div
          className="aceflix-logo"
          onClick={navigateHome}
          role="presentation"
        >
          <img src={aceflixLogo} alt="Aceflix-Logo" />
        </div>

        <div className="main-search-input">
          <input
            className="header-input"
            type="text"
            aria-label="search"
            value={inputValue}
            onInput={handleInput}
            onKeyDown={handleSearchKey}
            placeholder="Search for movies, series & actors ..."
          />

          <button
            className="header-search-btn"
            type="button"
            onClick={searchResult}
          >
            {" "}
            <IoSearch />{" "}
          </button>
        </div>
      </div>

      {display && (
        <DisplaySearchResults
          results={search}
          inputValue={inputValue}
          setDisplay={setDisplay}
        />
      )}
    </header>
  );
}

Header.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  setHomeActive: PropTypes.func.isRequired,
  setSerieActive: PropTypes.func.isRequired,
  setMovieActive: PropTypes.func.isRequired,
};
