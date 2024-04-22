import { useState } from "react";
import Top10 from "../../components/Top10/Top10";
import "./home.css";
import Popular from "../../components/Popular/Popular";
import Banner from "../../components/Banner/Banner";
import Video from "../../components/Video/Video";
import SecondHeader from "../../components/SecondHeader/SecondHeader";
import Action from "../../components/Action/Action";

export default function Home() {
  // Initialisation des states
  const [status, setStatus] = useState(false); // State qui donne info si l'utilisateur à cliquer sur films ou séries
  const [uniqueTop, setUniqueTop] = useState([]); // State qui vient ajouter les données d'une seule catégorie
  const [uniqueTendances, setUniqueTendances] = useState([]); // State qui vient ajouter les données d'une seule catégorie
  const [action, setAction] = useState(null);
  const [blackScreen, setBlackScreen] = useState(false); // State qui permet d'afficher et cacher le popupvideo
  const [idVideo, setIdVideo] = useState(0); // State qui permet de récupérer l'id de la vidéo cliquée

  // URL à fetch
  const moviesFetch =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const seriesFetch =
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const popularSeries =
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const popularMovies =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";

  // Actions fetch url

  const theApiKey = "aea07ae608264c18c1ea1431604753c3";
  const actionMoviesFetchURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28&api_key=${theApiKey}`;
  const actionSeriesFetchURL = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759&api_key=${theApiKey} `;

  // Comportements

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleMovies = () => {
    setStatus(true);
    fetch(moviesFetch)
      .then((response) => response.json())
      .then((response) => setUniqueTop(response.results.splice(0, 10)))
      .catch((err) => console.error(err));

      fetch(actionMoviesFetchURL)
      .then((response) => response.json())
      .then((data) => setAction(data.results.splice(0, 10)))
      .catch((err) => console.error(err));

    fetch(popularMovies)
      .then((response) => response.json())
      .then((response) =>
        setUniqueTendances(shuffle(response.results).splice(0, 15))
      )
      .catch((err) => console.error(err));

   
   
   
   
  };

  const handleSeries = () => {
    setStatus(true);
    fetch(seriesFetch)
      .then((response) => response.json())
      .then((response) => setUniqueTop(response.results.splice(0, 10)))
      .catch((err) => console.error(err));

      fetch(actionSeriesFetchURL)
      .then((response) => response.json())
      .then((data) => setAction(data.results.splice(0, 10)))
      .catch((err) => console.error(err));

    fetch(popularSeries)
      .then((response) => response.json())
      .then((response) =>
        setUniqueTendances(shuffle(response.results).splice(0, 15))
      )
      .catch((err) => console.error(err));
   
  };

  const handleAll = () => {
    setStatus(false);
  };

  return (
    <section className="home">
      {blackScreen && (
        <Video idVideo={idVideo} setBlackScreen={setBlackScreen} />
      )}
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
      <SecondHeader
        handleAll={handleAll}
        handleMovies={handleMovies}
        handleSeries={handleSeries}
      />
      <Banner setBlackScreen={setBlackScreen} setIdVideo={setIdVideo} />
      <Top10 status={status} uniqueTop={uniqueTop} />
    <Popular
        status={status}
        uniqueTendances={uniqueTendances}
        shuffle={shuffle}
      /> 

     {action && <Action status={status} actions={action} />}
    </section>
  );
}
