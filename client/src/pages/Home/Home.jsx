import { useState } from "react";
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
import Upcoming from "../../components/Upcoming/Upcoming";

export default function Home() {
  // Initialisation des states
  const [status, setStatus] = useState(false); // State qui donne info si l'utilisateur à cliquer sur films ou séries
  const [uniqueTop, setUniqueTop] = useState([]); // State qui vient ajouter les données d'une seule catégorie
  const [uniqueTendances, setUniqueTendances] = useState([]); // State qui vient ajouter les données d'une seule catégorie
  const [blackScreen, setBlackScreen] = useState(false); // State qui permet d'afficher et cacher le popupvideo
  const [idVideo, setIdVideo] = useState(""); // State qui permet de récupérer l'url de la vidéo cliquée
  const [activeMovie, setActiveMovie] = useState(false); // State qui permet de mettre en surbrillance quand l'utilisateur est sur la catégorie movie
  const [activeSerie, setActiveSerie] = useState(false); // State qui permet de mettre en surbrillance quand l'utilisateur est sur la catégorie serie
  const [activeAll, setActiveAll] = useState(true); // State qui permet de mettre en surbrillance quand l'utilisateur est sur la catégorie all
  const [movieContent, setMovieContent] = useState(false); // State qui permet d'afficher les sections contenant uniquement des films
  const [serieContent, setSerieContent] = useState(false); // State qui permet d'afficher les sections contenant uniquement des series

  // URL à fetch
  const moviesFetch =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const seriesFetch =
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const popularSeries =
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const popularMovies =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";

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
    <section className="home">
      {blackScreen && (
        <Video idVideo={idVideo} setBlackScreen={setBlackScreen} />
      )}
      <Banner setBlackScreen={setBlackScreen} setIdVideo={setIdVideo} />
      <Top10 status={status} uniqueTop={uniqueTop} />
      {movieContent && <Upcoming />}
      <Popular
        status={status}
        uniqueTendances={uniqueTendances}
        shuffle={shuffle}
      />
      {movieContent && <Family shuffle={shuffle} />}
      {movieContent && <Horror shuffle={shuffle} />}
      {serieContent && <Reality shuffle={shuffle} />}
      {serieContent && <Drama shuffle={shuffle} />}
      <SecondHeader
        handleAll={handleAll}
        handleMovies={handleMovies}
        handleSeries={handleSeries}
        activeAll={activeAll}
        activeMovie={activeMovie}
        activeSerie={activeSerie}
      />
    </section>
  );
}
