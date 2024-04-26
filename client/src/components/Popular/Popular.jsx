/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./popular.css";
import useFetch from "../../useFetch";
import Card from "../Card/Card";

function Popular({ status, uniqueTendances, shuffle }) {
  // URL des Movies et Series tendances
  const theApiKey = import.meta.env.API_KEY;
  const tendancesMoviesFetchURL =
  `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${theApiKey} `;
  const tendancesSeriesFetchURL =
  `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${theApiKey}`;

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: tendancesMovies,
    loading: loadingTendancesMovies,
    error: errorTendancesMovies,
  } = useFetch(tendancesMoviesFetchURL);
  const {
    data: tendancesSeries,
    loading: loadingTendancesSeries,
    error: errorTendancesSeries,
  } = useFetch(tendancesSeriesFetchURL);

  // Fonction permettant de mélanger 2 tableaux après les avoir concaténés
  const ShuffleConcat = (arr1, arr2) => {
    const final = shuffle(arr1.concat(arr2));
    return final;
  };

  // Fusion + mélange des tendances movies + series et limité à 15
  let allTendances = [];
  if (tendancesMovies && tendancesSeries) {
    allTendances = ShuffleConcat(tendancesMovies, tendancesSeries).slice(0, 20);
  }
  if (loadingTendancesMovies || loadingTendancesSeries) {
    return <h1>LOADING ...</h1>;
  }
  if (errorTendancesMovies || errorTendancesSeries) {
    console.info("Error");
  }

  return (
    <div className="slider-popular">
      <h1 className="main-title">POPULAR</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={10}
          slidesPerView={6}
          // eslint-disable-next-line react/jsx-boolean-value
          freeMode={true}
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
              ? uniqueTendances?.map((content) => (
                  <SwiperSlide key={content.id}>
                    <Card card={content} />
                  </SwiperSlide>
                ))
              : allTendances?.map((content) => (
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

Popular.propTypes = {
  status: PropTypes.bool.isRequired,
  uniqueTendances: PropTypes.oneOfType([PropTypes.array.isRequired]).isRequired,
  shuffle: PropTypes.func.isRequired,
};

export default Popular;
