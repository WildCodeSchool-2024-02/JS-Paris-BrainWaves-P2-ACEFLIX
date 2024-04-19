/* eslint-disable import/no-duplicates */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import "./nav.css";

export default function Nav({ setIsOpen, isOpen }) {
  const navigate = useNavigate();

  const closeNav = () => {
    setIsOpen(false);
  };

  const openNav = () => {
    setIsOpen(true);
  };

  return (
    <nav className={isOpen ? "open" : ""}>
      <div className="icon">
        <RxCross2 className="close-nav" onClick={closeNav} />
        <CiMenuBurger onClick={openNav} />
      </div>
      <ul>
        <li
          className="list-nav-elements"
          onClick={() => navigate("/")}
          role="presentation"
        >
          <IoHomeOutline className="icon-nav" />
          <p>Home</p>
        </li>
        <li
          className="list-nav-elements"
          onClick={() => navigate("/filter/movie")}
          role="presentation"
        >
          <BiMoviePlay className="icon-nav" />
          <p>Movies</p>
        </li>
        <li
          className="list-nav-elements"
          onClick={() => navigate("/filter/tv")}
          role="presentation"
        >
          <BiCameraMovie className="icon-nav" />
          <p>Series</p>
        </li>
        <li className="list-nav-elements">
          <MdOutlineAccountCircle className="icon-nav" />
          <p>Account</p>
        </li>
      </ul>
      <div className="logo">
        <img id="logo" src="./src/assets/images/Logo.png" alt="Logo" />
      </div>
    </nav>
  );
}

Nav.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
