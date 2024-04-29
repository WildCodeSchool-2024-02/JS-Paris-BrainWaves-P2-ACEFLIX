/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import useFetch from "../../useFetch";
import Card from "../Card/Card";
import "./war.css";

export default function War({ status, uniqueWar, shuffle }) {
  // URL des Movies et Series Syfy

  const theApiKey = import.meta.env.VITE_API_KEY;
  const warMoviesFetchURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10752&api_key=${theApiKey}`;
  const warSeriesFetchURL = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_genres=10768&with_watch_providers=8&api_key=${theApiKey}`;

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: warMovies,
    loading: loadingWarMovies,
    error: errorWarMovies,
  } = useFetch(warMoviesFetchURL);
  const {
    data: warSeries,
    loading: loadingWarSeries,
    error: errorWarSeries,
  } = useFetch(warSeriesFetchURL);

  // Fusion + mélange des tendances movies + series et limité à 15
  let allWar = [];
  if (warMovies && warSeries) {
    allWar = shuffle(warMovies.slice(0, 10).concat(warSeries.slice(0, 10)));
  }
  if (loadingWarMovies || loadingWarSeries) {
    return <h1>LOADING ...</h1>;
  }
  if (errorWarMovies || errorWarSeries) {
    console.info("Error");
  }

  return (
    <div className="slider-popular">
      <h1 className="main-title">WAR</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={10}
          slidesPerView={6}
          freeMode
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
          <div>
            {status
              ? uniqueWar?.map((content) => (
                  <SwiperSlide key={content.id}>
                    <Card card={content} />
                  </SwiperSlide>
                ))
              : allWar?.map((content) => (
                  <SwiperSlide key={content.id}>
                    <Card card={content} />
                  </SwiperSlide>
                ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
}

War.propTypes = {
  status: PropTypes.bool.isRequired,
  uniqueWar: PropTypes.oneOfType([PropTypes.array.isRequired]).isRequired,
  shuffle: PropTypes.func.isRequired,
};
