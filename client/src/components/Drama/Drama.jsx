/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./drama.css";
import Card from "../Card/Card";
import useFetch from "../../useFetch";
import "swiper/css/free-mode";

export default function Drama({ shuffle }) {
  const dramaFetchUrl =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18&api_key=aea07ae608264c18c1ea1431604753c3";
  const dramaFetchUrl2 =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=18&api_key=aea07ae608264c18c1ea1431604753c3";

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: dramaMovies,
    loading: loadingDrama,
    error: errorDrama,
  } = useFetch(dramaFetchUrl);
  const {
    data: dramaMovies2,
    loading: loadingDrama2,
    error: errorDrama2,
  } = useFetch(dramaFetchUrl2);

  if (loadingDrama || loadingDrama2) {
    return <h1>LOADING ...</h1>;
  }
  if (errorDrama || errorDrama2) {
    console.info("Error");
  }

  // Fonction permettant de mélanger 2 tableaux après les avoir concaténés
  const ShuffleConcat = (arr1, arr2) => {
    const final = shuffle(arr1.concat(arr2));
    return final;
  };

  // Fusion + mélange des tendances movies + series et limité à 15
  let allDrama = [];
  if (dramaMovies && dramaMovies2) {
    allDrama = ShuffleConcat(dramaMovies, dramaMovies2).slice(0, 20);
  }

  return (
    <div className="drama-slider">
      <h1 className="main-title">DRAMA</h1>
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
          {allDrama?.map((content) => (
            <SwiperSlide key={content.id}>
              <Card card={content} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

Drama.propTypes = {
  shuffle: PropTypes.func.isRequired,
};
