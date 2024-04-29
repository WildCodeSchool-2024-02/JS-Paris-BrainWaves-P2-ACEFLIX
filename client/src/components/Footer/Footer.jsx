import "./Footer.css";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <div id="Footer">
      <p>feel free to contact us</p>
      <div id="Footer-list">
        <a href="https://github.com/WildAntho">
          <FaGithub />
          <p>Anthony</p>
        </a>

        <a href="https://github.com/Curtisdak">
          <FaGithub />
          <p>Curtis</p>
        </a>

        <a href="https://github.com/Erwan60">
          <FaGithub />
          <p>Erwan</p>
        </a>
      </div>
    </div>
  );
}
