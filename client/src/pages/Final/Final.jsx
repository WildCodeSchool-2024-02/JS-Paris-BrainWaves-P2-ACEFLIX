import "./final.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import VideoContext from "../../components/ContextVideo";
import FinalBanner from "../../components/FinalBanner/FinalBanner";
import Actors from "../../components/Actors/Actors";
import Comments from "../../components/Comments/Comments";
import Video from "../../components/Video/Video";
import Suggest from "../../components/Suggest/Suggest";

export default function Final() {
  const { type, id } = useParams();
  const { blackScreen } = useContext(VideoContext);
  const theKey = "aea07ae608264c18c1ea1431604753c3";
  const fetchUrlBanner = `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${theKey}`;
  const fetchComment = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=1&api_key=${theKey}`;

  const [bannerInfo, setBannerInfo] = useState(null);

  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetch(fetchUrlBanner)
      .then((res) => res.json())
      .then((data) => setBannerInfo(data))
      .catch((err) => console.error(err));

    fetch(fetchComment)
      .then((res) => res.json())
      .then((data) => setComments(data.results))
      .catch((err) => console.error(err));
  }, [fetchUrlBanner, fetchComment]);

  return (
    <div id="Final">
      {blackScreen && <Video />}
      {bannerInfo && <FinalBanner bannerInfo={bannerInfo} type={type} />}
      <Actors type={type} id={id} />
      {bannerInfo?.vote_average && (
        <Suggest id={id} type={type} bannerInfo={bannerInfo} />
      )}
      {comments && <Comments comments={comments} setComments={setComments} />}
    </div>
  );
}
