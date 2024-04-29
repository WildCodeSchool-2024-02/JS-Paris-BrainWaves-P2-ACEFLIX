import PropTypes from "prop-types";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import "./secondHeader.css";
import { useState } from "react";

export default function SecondHeader({
  handleAll,
  handleMovies,
  handleSeries,
  activeAll,
  activeMovie,
  activeSerie,
}) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-400%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      id="SecondHeader"
    >
      <div className="SecondHeader-btn">
        <button
          className={
            activeAll
              ? "button-filter-content isActive"
              : "button-filter-content"
          }
          type="button"
          onClick={handleAll}
        >
          All
        </button>
        <button
          className={
            activeMovie
              ? "button-filter-content isActive"
              : "button-filter-content"
          }
          type="button"
          value="movie"
          onClick={handleMovies}
        >
          Movies
        </button>
        <button
          className={
            activeSerie
              ? "button-filter-content isActive"
              : "button-filter-content"
          }
          type="button"
          value="tv_serie"
          onClick={handleSeries}
        >
          Series
        </button>
      </div>
    </motion.div>
  );
}

SecondHeader.propTypes = {
  handleAll: PropTypes.func.isRequired,
  handleMovies: PropTypes.func.isRequired,
  handleSeries: PropTypes.func.isRequired,
  activeAll: PropTypes.bool.isRequired,
  activeMovie: PropTypes.bool.isRequired,
  activeSerie: PropTypes.bool.isRequired,
};
