import "./finalBanner.css";
import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import { useContext } from "react";
import VideoContext from "../ContextVideo";

export default function FinalBanner({ bannerInfo, type }) {
  const { setUrlVideo, setBlackScreen } = useContext(VideoContext);
  const backImg = `https://image.tmdb.org/t/p/original${bannerInfo.backdrop_path}`;

  const handleclick = () => {
    setBlackScreen(true);
    setUrlVideo(
      `https://api.themoviedb.org/3/${type}/${bannerInfo.id}/videos?language=en-US&api_key=aea07ae608264c18c1ea1431604753c3`
    );
    document.body.classList.add("active");
  };

  return (
    <div id="FinalBanner">
      <div className="gradient-bg">Box</div>
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
          </div>
          <div className="info-and-butons">
            <h1 className="title">{bannerInfo.title || bannerInfo.name}</h1>
            {bannerInfo.last_air_date && (
              <div className="episode">
                <h2>
                  {
                    bannerInfo?.seasons[bannerInfo.seasons.length - 1]
                      .season_number
                  }{" "}
                  Season(s)
                </h2>
              </div>
            )}
            <div className="groupement">
              <p className="the release-date">
                {bannerInfo.release_date || bannerInfo.last_air_date}{" "}
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
                {bannerInfo.genres
                  .map((genre) => genre.name)
                  .slice(0, 2)
                  .join(" , ")}{" "}
              </p>
              <p className="average-vote">
                Average rating {Math.floor(bannerInfo.vote_average * 10)} %
              </p>
            </div>
            {bannerInfo.overview && (
              <div className="synopsis">
                <h2>Synopsis</h2>
                <p>{bannerInfo.overview || bannerInfo.tagline}</p>
              </div>
            )}
            {bannerInfo.budget ? (
              <p className="budget">Budget : {bannerInfo.budget} US dollars</p>
            ) : null}
            {bannerInfo.revenue ? (
              <p className="revenue">
                Revenue : {bannerInfo.revenue} US dollars
              </p>
            ) : null}
            <div className="button-container-banner">
              <button className="watch-btn" type="button" onClick={handleclick}>
                PLAY <FaPlay className="play-icon-banner" />
              </button>
              {bannerInfo.homepage ? (
                <a
                  className="website-Url"
                  href={bannerInfo.homepage}
                  target="blank"
                >
                  <button type="button" className="more">
                    CHECK
                  </button>
                </a>
              ) : (
                <button type="button" className="more-inactive">
                  CHECK
                </button>
              )}
            </div>
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
  type: PropTypes.string.isRequired,
  bannerInfo: PropTypes.shape({
    id: PropTypes.number,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
    last_air_date: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    runtime: PropTypes.number,
    original_language: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    vote_average: PropTypes.number,
    budget: PropTypes.number,
    revenue: PropTypes.number,
    homepage: PropTypes.string,
    overview: PropTypes.string,
    tagline: PropTypes.string,
    seasons: PropTypes.arrayOf(
      PropTypes.shape({
        season_number: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};
