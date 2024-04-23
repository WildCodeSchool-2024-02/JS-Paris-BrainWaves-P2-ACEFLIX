import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import "./video.css";
import { IoMdClose } from "react-icons/io";

export default function Videos({ setBlackScreen, idVideo }) {
  const [video, setVideo] = useState(null);

  const url = idVideo;
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => setVideo(response.results));
  }, [url]);

  const urlTab = [];
  if (video) {
    video.forEach((element) => {
      if (element.type === "Trailer" || element.type === "Opening Credits") {
        urlTab.push(element.key);
      }
    });

    if (urlTab.length === 0) {
      urlTab.push(video[0].key);
    }
  }

  const handleClose = () => {
    setBlackScreen(false);
    document.body.classList.remove("active");
  };

  return (
    <div className="black-screen">
      <div className="video-container">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${urlTab[0]}`}
          controls
          playing
          width="100%"
          height="100%"
        />
      </div>
      <IoMdClose
        className="close-mark"
        onClick={handleClose}
        role="presentation"
      />
    </div>
  );
}

Videos.propTypes = {
  idVideo: PropTypes.string.isRequired,
  setBlackScreen: PropTypes.func.isRequired,
};
