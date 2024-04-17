import "./card.css";
import PropTypes from "prop-types";

export default function Card({ image }) {
  const newImage = `https://image.tmdb.org/t/p/w200${image}`;
  return (
    <div id="img-test">
      <img className="img-poster" src={newImage} alt="" />
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired
};
