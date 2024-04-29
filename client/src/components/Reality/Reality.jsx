/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./reality.css";
import Card from "../Card/Card";
import useFetch from "../../useFetch";
import "swiper/css/free-mode";

export default function Reality({ shuffle }) {
  const theApiKey = import.meta.env.VITE_API_KEY;
  const realityFetchUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10764&api_key=${theApiKey}`;
  const realityFetchUrl2 = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=10764&api_key=${theApiKey}`;

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: realitySeries,
    loading: loadingReality,
    error: errorReality,
  } = useFetch(realityFetchUrl);
  const {
    data: realitySeries2,
    loading: loadingReality2,
    error: errorReality2,
  } = useFetch(realityFetchUrl2);

  if (loadingReality || loadingReality2) {
    return <h1>LOADING ...</h1>;
  }
  if (errorReality || errorReality2) {
    console.info("Error");
  }

  // Fonction permettant de mélanger 2 tableaux après les avoir concaténés
  const ShuffleConcat = (arr1, arr2) => {
    const final = shuffle(arr1.concat(arr2));
    return final;
  };

  // Fusion + mélange des tendances movies + series et limité à 15
  let allReality = [];
  if (realitySeries && realitySeries2) {
    allReality = ShuffleConcat(realitySeries, realitySeries2).slice(0, 20);
  }

  return (
    <div className="reality-slider">
      <h1 className="main-title">REALITY SHOW</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={10}
          slidesPerView={6}
          // eslint-disable-next-line react/jsx-boolean-value
          freeMode={true}
          centeredSlides={false}
          breakpoints={{
            1200: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            750: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            500: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            320: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            280: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
          navigation
          className="mySwiper"
        >
          {allReality?.map(
            (content) =>
              content.poster_path && (
                <SwiperSlide key={content.id}>
                  <Card card={content} />
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </div>
  );
}

Reality.propTypes = {
  shuffle: PropTypes.func.isRequired,
};
