import { useState } from "react";
import "./header.css";
import { IoSearch } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import aceflixLogo from "../../assets/images/aceflixLogo.png";
import DisplaySearchResults from "../DisplaySearchResults/DisplaySearchResults";

export default function Header() {
  const [search, setSearch] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [display, setDisplay] = useState(false);

  const apiKey = "aea07ae608264c18c1ea1431604753c3";
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

  return (
    <>
      <div id="Header">
        <div className="hearder-burger">
          <button aria-label="menu" className="burger-btn" type="button">
            <SlMenu />
          </button>
        </div>

        <div className="aceflix-logo">
          <img src={aceflixLogo} alt="Aceflix-Logo" />
        </div>

        <div className="main-search-input">
          <input
            className="header-input"
            type="text"
            aria-label="search"
            value={inputValue}
            onInput={handleInput}
            placeholder="Search for movies, series...."
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
    </>
  );
}
