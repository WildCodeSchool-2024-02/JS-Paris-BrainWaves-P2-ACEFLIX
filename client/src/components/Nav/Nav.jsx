import "./nav.css";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li onClick={() => navigate("/")} role="presentation">
          Home
        </li>
        <li onClick={() => navigate("/filter/movie")} role="presentation">
          Movies
        </li>
        <li onClick={() => navigate("/filter/tv")} role="presentation">
          Series
        </li>
        <li>Account</li>
      </ul>
      <div className="logo">
        <img id="Logo" src="./src/assets/images/Logo.png" alt="Logo" />
      </div>
    </nav>
  );
}
