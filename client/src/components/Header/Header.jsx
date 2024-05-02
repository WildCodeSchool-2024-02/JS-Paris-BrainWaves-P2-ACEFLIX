import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { IoSearch } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import aceflixLogo from "../../assets/images/aceflixLogo.png";
import BoxSearch from "../BoxSearch/BoxSearch";

export default function Header({
  setIsOpen,
  setHomeActive,
  setMovieActive,
  setSerieActive,
}) {
  const [display, setDisplay] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const searchResult = () => {
    setDisplay(true);
    document.body.classList.add("active");
  };

  const openNav = () => {
    setIsOpen(true);
    document.body.classList.add("active");
  };

  const navigateHome = () => {
    navigate("/");
    setHomeActive(true);
    setMovieActive(false);
    setSerieActive(false);
  };

  const handleClose = () => {
    setDisplay(false);
    document.body.classList.remove("active");
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div id="Header">
        <div className="hearder-burger">
          <button
            aria-label="menu"
            className="burger-btn"
            type="button"
            onClick={openNav}
          >
            <SlMenu />
          </button>
        </div>

        <div
          className="aceflix-logo"
          onClick={navigateHome}
          role="presentation"
        >
          <img src={aceflixLogo} alt="Aceflix-Logo" />
        </div>
        <div className="main-search-input">
          <button
            className="header-search-btn"
            type="button"
            onClick={searchResult}
          >
            {" "}
            <IoSearch />{" "}
          </button>
        </div>
      </div>
      {display && <BoxSearch setDisplay={setDisplay} />}
      {display && (
        <div
          className="screen-cover-black"
          role="presentation"
          onClick={handleClose}
        >
          NUL
        </div>
      )}
    </motion.header>
  );
}

Header.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  setHomeActive: PropTypes.func.isRequired,
  setSerieActive: PropTypes.func.isRequired,
  setMovieActive: PropTypes.func.isRequired,
};
