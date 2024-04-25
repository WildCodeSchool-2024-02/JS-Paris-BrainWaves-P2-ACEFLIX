import "./finalBanner.css";
import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";

export default function FinalBanner({ bannerInfo }) {
  const backImg = `https://image.tmdb.org/t/p/original${bannerInfo.backdrop_path}`;
  return (
    <div id="FinalBanner">
      <div className="bannerContainer">
        <img className="image-backdrop" src={backImg} alt="" />
      </div>

      <div className="banner-info-container">
        <div className="first-container">
          <div className="image-box">
            <img
              src={`https://image.tmdb.org/t/p/w300/${bannerInfo.poster_path}`}
              alt="poster"
            />
            {bannerInfo.first_air_date && (
              <div className="episode">
                <h2>season</h2>
              </div>
            )}
          </div>
          <div className="info-and-butons">
            <h1 className="title">
              {bannerInfo.original_title || bannerInfo.original_name}
            </h1>
            <p className="the release-date">
              {bannerInfo.release_date || bannerInfo.first_air_date}{" "}
            </p>
            {bannerInfo.runtime && (
              <p className="theTime">
                {Math.floor(bannerInfo.runtime / 60)} h{" "}
                {bannerInfo.runtime % 60} min{" "}
                <span>{bannerInfo.original_language.toUpperCase()}</span>
              </p>
            )}
            <p className="genres">
              {" "}
              Genres :{" "}
              {bannerInfo.genres.map((genre) => genre.name).join(" , ")}{" "}
            </p>
            <p className="average-vote">
              {bannerInfo.vote_average.toFixed(1)} / 10
            </p>
            {bannerInfo.budget && (
              <p className="budget">Budget : {bannerInfo.budget} US dollars</p>
            )}
            {bannerInfo.revenue && (
              <p className="revenue">
                Revenue : {bannerInfo.revenue} US dollars
              </p>
            )}
            <button className="watch-btn" type="button" onClick={" "}>
              {" "}
              Watch <FaPlay />{" "}
            </button>
            {bannerInfo.homepage && (
              <a
                className="website-Url"
                href={bannerInfo.homepage}
                target="blank"
              >
                check
              </a>
            )}
          </div>
        </div>

        {bannerInfo.overview && (
          <div className="second-container">
            <h2>Synopsis</h2>
            <p>{bannerInfo.overview || bannerInfo.tagline}</p>
          </div>
        )}
      </div>
    </div>
  );
}

FinalBanner.propTypes = {
  bannerInfo: PropTypes.shape({
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string.isRequired,
    first_air_date: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    original_name: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    runtime: PropTypes.number.isRequired,
    original_language: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    vote_average: PropTypes.number.isRequired,
    budget: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    homepage: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
  }),
};

FinalBanner.defaultProps = {
  bannerInfo: null,
};
