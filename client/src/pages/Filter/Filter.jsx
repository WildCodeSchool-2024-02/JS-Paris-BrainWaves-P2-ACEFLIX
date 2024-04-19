/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-duplicates */
import { useParams } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import FilterMovies from "../../components/FilterButtons/FilterMovies";
import FilterSeries from "../../components/FilterButtons/FilterSeries";
import useFetch from "../../useFetch";
import Card from "../../components/Card/Card";
import "./filter.css";

export default function Filter() {
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(
    type === "movie" ? "popular" : "top_rated"
  );
  const [idGenre, setIdGenre] = useState(0);
  const [genreStatus, setGenreStatus] = useState(false);
  const url = `https://api.themoviedb.org/3/${type}/${filter}?language=en-US&page=${page}&api_key=aea07ae608264c18c1ea1431604753c3`;
  const {
    data: dataFilter,
    loading: loadingFilter,
    error: errorLoading,
  } = useFetch(url);

  const urlGenres = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${idGenre}&api_key=aea07ae608264c18c1ea1431604753c3`;
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
          {type === "movie" && (
            <FilterMovies
              setFilter={setFilter}
              setIdGenre={setIdGenre}
              setGenreStatus={setGenreStatus}
              setPage={setPage}
            />
          )}
          {type === "tv" && (
            <FilterSeries
              setFilter={setFilter}
              setIdGenre={setIdGenre}
              setGenreStatus={setGenreStatus}
              setPage={setPage}
            />
          )}
        </div>
        <div className="card-filter-container">
          {genreStatus &&
            idFilter?.map((content) => (
              <div className="card-filter" key={content.id}>
                <Card image={content.poster_path} id={content.id} />
              </div>
            ))}
          {!genreStatus &&
            dataFilter?.map((content) => (
              <div className="card-filter" key={content.id}>
                <Card image={content.poster_path} id={content.id} />
              </div>
            ))}
        </div>
        <div className="pagination-wrapper">
          <a href={page > 1 ? "#top-page" : null}>
            <button
              type="button"
              className={page === 1 ? "button-filter-stop" : "button-filter"}
              onClick={() => page > 1 && setPage(page - 1)}
            >
              {" "}
              <p className="href-disable">Pour le href</p>
              <MdOutlineArrowBackIosNew className="arrow-page" />
            </button>
          </a>
          <p className="pagination">{page}</p>
          <a href="#top-page">
            <button
              type="button"
              className="button-filter"
              onClick={() => setPage(page + 1)}
            >
              <p className="href-disable">Pour le href</p>
              <MdOutlineArrowForwardIos className="arrow-page" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
