import "./blackscreen.css";
import PropTypes from "prop-types";

export default function BlackScreen({ setIsOpen }) {
  const blackscreen = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="blackscreen-nav"
      onClick={blackscreen}
      role="presentation"
    />
  );
}

BlackScreen.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
