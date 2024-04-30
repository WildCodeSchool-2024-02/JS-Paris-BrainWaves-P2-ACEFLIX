/* eslint-disable import/no-duplicates */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import aceflixLogo from "../../assets/images/aceflixLogo.png";
import "./nav.css";

export default function Nav({
  setIsOpen,
  isOpen,
  setHomeActive,
  homeActive,
  setSerieActive,
  serieActive,
  setMovieActive,
  movieActive,
}) {
  const navigate = useNavigate();

  const navigateHome = () => {
    setIsOpen(false);
    setMovieActive(false);
    setSerieActive(false);
    setHomeActive(true);
    navigate("/");
    document.body.classList.remove("active");
  };

  const navigateMovie = () => {
    setIsOpen(false);
    setMovieActive(true);
    setSerieActive(false);
    setHomeActive(false);
    navigate("/filter/movie");
    document.body.classList.remove("active");
  };

  const navigateSerie = () => {
    setIsOpen(false);
    setMovieActive(false);
    setSerieActive(true);
    setHomeActive(false);
    navigate("/filter/tv");
    document.body.classList.remove("active");
  };

  const closeNav = () => {
    setIsOpen(false);
    document.body.classList.remove("active");
  };

  return (
    <nav className={isOpen ? "open" : ""}>
      <div className="icon">
        <RxCross2 className="close-nav" onClick={closeNav} />
      </div>
      <ul>
        <li
          className={
            !homeActive ? "list-nav-elements" : "list-nav-elements active-link"
          }
          onClick={navigateHome}
          role="presentation"
        >
          <IoHomeOutline
            className={!homeActive ? "icon-nav" : "icon-nav active-link"}
          />
          <p>Home</p>
        </li>
        <li
          className={
            !movieActive ? "list-nav-elements" : "list-nav-elements active-link"
          }
          onClick={navigateMovie}
          role="presentation"
        >
          <BiMoviePlay
            className={!movieActive ? "icon-nav" : "icon-nav active-link"}
          />
          <p>Movies</p>
        </li>
        <li
          className={
            !serieActive ? "list-nav-elements" : "list-nav-elements active-link"
          }
          onClick={navigateSerie}
          role="presentation"
        >
          <BiCameraMovie
            className={!serieActive ? "icon-nav" : "icon-nav active-link"}
          />
          <p>Series</p>
        </li>
        <li className="list-nav-elements">
          <MdOutlineAccountCircle className="icon-nav" />
          <p>Account</p>
        </li>
      </ul>
      <div className="logo" onClick={navigateHome} role="presentation">
        <img id="logo" src={aceflixLogo} alt="Logo" />
      </div>
    </nav>
  );
}

Nav.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setHomeActive: PropTypes.func.isRequired,
  homeActive: PropTypes.bool.isRequired,
  setSerieActive: PropTypes.func.isRequired,
  serieActive: PropTypes.bool.isRequired,
  setMovieActive: PropTypes.func.isRequired,
  movieActive: PropTypes.bool.isRequired,
};
