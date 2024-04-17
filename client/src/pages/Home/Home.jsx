import { useState } from "react";
import Top10 from "../../components/Top10/Top10";
import './home.css'

export default function Home() {
  // Initialisation des states
  const [status, setStatus] = useState(false); // State qui donne info si l'utilisateur à cliquer sur films ou séries
  const [uniqueTop, setUniqueTop] = useState([]); // State qui vient ajouter les données d'une seule catégorie

  // URL à fetch
  const moviesFetch =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const seriesFetch =
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";

  // Comportements
  const handleMovies = () => {
    setStatus(true);
    fetch(moviesFetch)
      .then((response) => response.json())
      .then((response) => setUniqueTop(response.results.splice(0, 10)))
      .catch((err) => console.error(err));
  };

  const handleSeries = () => {
    setStatus(true);
    fetch(seriesFetch)
      .then((response) => response.json())
      .then((response) => setUniqueTop(response.results.splice(0, 10)))
      .catch((err) => console.error(err));
  };

  const handleAll = () => {
    setStatus(false);
  };

  return (
    <>
      <div className="static-button">
        <button type="button" className="filter-button" onClick={handleAll}>
          All
        </button>
        <button type="button" className="filter-button" onClick={handleMovies}>
          Movies
        </button>
        <button type="button" className="filter-button" onClick={handleSeries}>
          Series
        </button>
      </div>
      <Top10 status={status} uniqueTop={uniqueTop} />
    </>
  );
}
