import "./final.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import VideoContext from "../../components/ContextVideo";
import FinalBanner from "../../components/FinalBanner/FinalBanner";
import Suggest from "../../components/Suggest/Suggest";
import Videos from "../../components/Video/Video";
import Comments from "../../components/Comments/Comments";

export default function Final() {
  const { type, id } = useParams();
  const { blackScreen } = useContext(VideoContext);
  const theKey = "aea07ae608264c18c1ea1431604753c3";
  const fetchUrl = `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${theKey}`;

  const [bannerInfo, setBannerInfo] = useState(null);

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setBannerInfo(data))
      .catch((err) => console.error(err));
  }, [fetchUrl]);

  return (
    <div id="Final">
      {blackScreen && <Videos />}
      {bannerInfo && <FinalBanner bannerInfo={bannerInfo} type={type} />}
      <Suggest id={id} type={type} bannerInfo={bannerInfo} />
      <Comments />
    </div>
  );
}
