import PropTypes from "prop-types";
import "./blackscreen.css";

export default function BlackScreen({ setIsOpen }) {
  const handleClose = () => {
    setIsOpen(false);
    document.body.classList.remove("active");
  };
  return (
    <div className="nav-blackscreen" onClick={handleClose} role="presentation">
      <p>Blackscreen</p>
    </div>
  );
}

BlackScreen.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
