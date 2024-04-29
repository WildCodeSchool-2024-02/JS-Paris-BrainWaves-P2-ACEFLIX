import { useContext, useState } from "react";
import VideoContext from "../../components/ContextVideo";
import Top10 from "../../components/Top10/Top10";
import "./home.css";
import Popular from "../../components/Popular/Popular";
import Banner from "../../components/Banner/Banner";
import Video from "../../components/Video/Video";
import SecondHeader from "../../components/SecondHeader/SecondHeader";
import Horror from "../../components/Horror/Horror";
import Drama from "../../components/Drama/Drama";
import Family from "../../components/Family/Family";
import Reality from "../../components/Reality/Reality";
import Syfy from "../../components/Syfy/Syfy";
import Upcoming from "../../components/Upcoming/Upcoming";
import War from "../../components/War/War";

export default function Home() {
  // Initialisation des states
  const [status, setStatus] = useState(false); // State qui donne info si l'utilisateur à cliquer sur films ou séries
  const [uniqueTop, setUniqueTop] = useState([]); // State qui vient ajouter les données d'une seule catégorie
  const [uniqueTendances, setUniqueTendances] = useState([]); // State qui vient ajouter les données d'une seule catégorie
  const [uniqueSyfy, setUniqueSyfy] = useState([]); // State qui vient ajouter les données d'une seule catégorie
  const [uniqueWar, setUniqueWar] = useState([]); // State qui vient ajouter les données d'une seule catégorie
  const [activeMovie, setActiveMovie] = useState(false); // State qui permet de mettre en surbrillance quand l'utilisateur est sur la catégorie movie
  const [activeSerie, setActiveSerie] = useState(false); // State qui permet de mettre en surbrillance quand l'utilisateur est sur la catégorie serie
  const [activeAll, setActiveAll] = useState(true); // State qui permet de mettre en surbrillance quand l'utilisateur est sur la catégorie all
  const [movieContent, setMovieContent] = useState(false); // State qui permet d'afficher les sections contenant uniquement des films
  const [serieContent, setSerieContent] = useState(false); // State qui permet d'afficher les sections contenant uniquement des series
  const { blackScreen } = useContext(VideoContext);
  const theApiKey = import.meta.env.VITE_API_KEY;
  // URL à fetch
  const moviesFetch = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${theApiKey}`;
  const seriesFetch = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${theApiKey}`;
  const popularSeries = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${theApiKey}`;
  const popularMovies = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${theApiKey}`;
  const syfyMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878&api_key=${theApiKey}`;
  const syfySeries = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765&api_key=${theApiKey}`;
  const warMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10752&api_key=${theApiKey}`;
  const warSeries = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10768&api_key=${theApiKey}`;

  // Comportements
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleMovies = () => {
    setStatus(true);
    setActiveAll(false);
    setActiveSerie(false);
    setActiveMovie(true);
    setMovieContent(true);
    setSerieContent(false);
    fetch(moviesFetch)
      .then((response) => response.json())
      .then((response) => setUniqueTop(response.results.slice(0, 10)))
      .catch((err) => console.error(err));
    fetch(popularMovies)
      .then((response) => response.json())
      .then((response) => setUniqueTendances(shuffle(response.results)))
      .catch((err) => console.error(err));
    fetch(syfyMovies)
      .then((response) => response.json())
      .then((response) => setUniqueSyfy(response.results))
      .catch((err) => console.error(err));
    fetch(warMovies)
      .then((response) => response.json())
      .then((response) => setUniqueWar(response.results))
      .catch((err) => console.error(err));
  };

  const handleSeries = () => {
    setStatus(true);
    setActiveAll(false);
    setActiveMovie(false);
    setActiveSerie(true);
    setMovieContent(false);
    setSerieContent(true);
    fetch(seriesFetch)
      .then((response) => response.json())
      .then((response) => setUniqueTop(response.results.slice(0, 10)))
      .catch((err) => console.error(err));
    fetch(popularSeries)
      .then((response) => response.json())
      .then((response) => setUniqueTendances(shuffle(response.results)))
      .catch((err) => console.error(err));
    fetch(syfySeries)
      .then((response) => response.json())
      .then((response) => setUniqueSyfy(response.results))
      .catch((err) => console.error(err));
    fetch(warSeries)
      .then((response) => response.json())
      .then((response) => setUniqueWar(response.results))
      .catch((err) => console.error(err));
  };

  const handleAll = () => {
    setStatus(false);
    setActiveMovie(false);
    setActiveSerie(false);
    setActiveAll(true);
    setMovieContent(false);
    setSerieContent(false);
  };

  return (
    <section className="home" id="haut-page">
      {blackScreen && <Video />}
      <Banner />
      <Top10 status={status} uniqueTop={uniqueTop} />
      {movieContent && <Upcoming />}
      {movieContent && <Family shuffle={shuffle} />}
      <Popular
        status={status}
        uniqueTendances={uniqueTendances}
        shuffle={shuffle}
      />
      {movieContent && <Horror shuffle={shuffle} />}
      <Syfy status={status} uniqueSyfy={uniqueSyfy} shuffle={shuffle} />
      {serieContent && <Reality shuffle={shuffle} />}
      <War status={status} uniqueWar={uniqueWar} shuffle={shuffle} />
      {serieContent && <Drama shuffle={shuffle} />}
      <a href="#haut-page" aria-label="anker">
        <SecondHeader
          handleAll={handleAll}
          handleMovies={handleMovies}
          handleSeries={handleSeries}
          activeAll={activeAll}
          activeMovie={activeMovie}
          activeSerie={activeSerie}
        />
      </a>
    </section>
  );
}
