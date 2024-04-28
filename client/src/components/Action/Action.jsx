/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./action.css";
import useFetch from "../../useFetch";
import Card from "../Card/Card";

function Action({ status, uniqueAction, shuffle }) {
  // URL des Movies et Series tendances
  const actionMoviesFetchURL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28&with_watch_providers=8&api_key=aea07ae608264c18c1ea1431604753c3";
  const actionSeriesFetchURL =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_genres=10759&with_watch_providers=8&api_key=aea07ae608264c18c1ea1431604753c3";

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: actionMovies,
    loading: loadingActionMovies,
    error: errorActionMovies,
  } = useFetch(actionMoviesFetchURL);
  const {
    data: actionSeries,
    loading: loadingActionSeries,
    error: errorActionSeries,
  } = useFetch(actionSeriesFetchURL);

  // Fonction permettant de mélanger 2 tableaux après les avoir concaténés
  const ShuffleConcat = (arr1, arr2) => {
    const final = shuffle(arr1.concat(arr2));
    return final;
  };

  // Fusion + mélange des tendances movies + series et limité à 15
  let allActions = [];
  if (actionMovies && actionSeries) {
    allActions = ShuffleConcat(actionMovies, actionSeries).slice(0, 20);
  }
  if (loadingActionMovies || loadingActionSeries) {
    return <h1>LOADING ...</h1>;
  }
  if (errorActionMovies || errorActionSeries) {
    console.info("Error");
  }

  return (
    <div className="slider-popular">
      <h1 className="main-title">ACTION</h1>
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
              ? uniqueAction?.map((content) => (
                  <SwiperSlide key={content.id}>
                    <Card card={content} />
                  </SwiperSlide>
                ))
              : allActions?.map((content) => (
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

Action.propTypes = {
  status: PropTypes.bool.isRequired,
  uniqueAction: PropTypes.oneOfType([PropTypes.array.isRequired]).isRequired,
  shuffle: PropTypes.func.isRequired,
};

export default Action;
