import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const VideoContext = createContext();

export default VideoContext;

export function VideoContextProvider({ children }) {
  const [blackScreen, setBlackScreen] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const memo = useMemo(
    () => ({ urlVideo, setUrlVideo, blackScreen, setBlackScreen }),
    [urlVideo, setUrlVideo, blackScreen, setBlackScreen]
  );

  return <VideoContext.Provider value={memo}>{children}</VideoContext.Provider>;
}

VideoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
