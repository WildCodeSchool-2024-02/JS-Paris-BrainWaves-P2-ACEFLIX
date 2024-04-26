/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-duplicates */
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import FilterMovies from "../../components/FilterButtons/FilterMovies";
import FilterSeries from "../../components/FilterButtons/FilterSeries";
import useFetch from "../../useFetch";
import Card from "../../components/Card/Card";
import VideoContext from "../../components/ContextVideo";
import Video from "../../components/Video/Video";
import "./filter.css";

export default function Filter() {
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const [displayGenre, setDisplayGenre] = useState({ name: "Popular", id: 0 });
  const [displayGenre2, setDisplayGenre2] = useState({
    name: "Top_rated",
    id: 0,
  });
  const [filter, setFilter] = useState(
    type === "movie" ? "popular" : "top_rated"
  );

  const [idGenre, setIdGenre] = useState(0);
  const [genreStatus, setGenreStatus] = useState(false);
  const { blackScreen } = useContext(VideoContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setDisplayGenre({ name: "Popular", id: 0 });
      setDisplayGenre2({ name: "Top_rated", id: 0 });
      setGenreStatus(false);
      if (type === "movie") {
        setFilter("popular");
      } else {
        setFilter("top_rated");
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [type]);
  const theApiKey = import.meta.env.API_KEY;
  const url = `https://api.themoviedb.org/3/${type}/${filter}?language=en-US&page=${page}&api_key=${theApiKey}`;
  const {
    data: dataFilter,
    loading: loadingFilter,
    error: errorLoading,
  } = useFetch(url);

  const urlGenres = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${idGenre}&api_key=${theApiKey}`;
  const {
    data: idFilter,
    loading: loadingId,
    error: errorId,
  } = useFetch(urlGenres);

  if (loadingFilter || loadingId) {
    return <h1>LOADING ...</h1>;
  }
  if (errorLoading || errorId) {
    console.info("error");
  }

  return (
    <section id="top-page" className="filter-global">
      {blackScreen && <Video />}
      <div className={type === "movie" ? "banner-movie" : "banner-serie"}>
        <div className="type-movie-serie">
          <h1 className="type-movie-serie-title">
            {type === "movie" ? `${type.toUpperCase()}S` : "SERIES"}
          </h1>
          {type === "movie" ? (
            <p className="type-movie-serie-desc">
              Explore an infinite universe of cinematic entertainment: dive into
              our comprehensive directory of films and series, where each title
              promises you a unique adventure on the big screen.
            </p>
          ) : (
            <p className="type-movie-serie-desc">
              Embark on an epic journey through the world of television: delve
              into our extensive catalogue of series, where every show invites
              you into its captivating universe, episode by episode.
            </p>
          )}
        </div>
      </div>
      <div className="filter-page">
        <div className="filter-container-global">
          <p className="genre-display">
            {type === "movie" ? displayGenre.name : displayGenre2.name}
          </p>
          {type === "movie" && (
            <FilterMovies
              setFilter={setFilter}
              setIdGenre={setIdGenre}
              setGenreStatus={setGenreStatus}
              setPage={setPage}
              setDisplayGenre={setDisplayGenre}
              displayGenre={displayGenre}
            />
          )}
          {type === "tv" && (
            <FilterSeries
              setFilter={setFilter}
              setIdGenre={setIdGenre}
              setGenreStatus={setGenreStatus}
              setPage={setPage}
              setDisplayGenre2={setDisplayGenre2}
              displayGenre2={displayGenre2}
            />
          )}
        </div>
        <div className="card-filter-container">
          {genreStatus &&
            idFilter?.map(
              (content) =>
                content.poster_path && (
                  <div className="card-filter" key={content.id}>
                    <Card card={content} id={content.id} />
                  </div>
                )
            )}
          {!genreStatus &&
            dataFilter?.map(
              (content) =>
                content.poster_path && (
                  <div className="card-filter" key={content.id}>
                    <Card card={content} id={content.id} />
                  </div>
                )
            )}
        </div>
        <div className="pagination-wrapper">
          <a
            href={page > 1 ? "#top-page" : null}
            onClick={() => page > 1 && setPage(page - 1)}
          >
            <button
              type="button"
              className={page === 1 ? "button-filter-stop" : "button-filter"}
            >
              {" "}
              <p className="href-disable">Pour le href</p>
              <MdOutlineArrowBackIosNew className="arrow-page" />
            </button>
          </a>
          <p className="pagination">{page}</p>
          <a href="#top-page" onClick={() => setPage(page + 1)}>
            <button type="button" className="button-filter">
              <p className="href-disable">Pour le href</p>
              <MdOutlineArrowForwardIos className="arrow-page" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
