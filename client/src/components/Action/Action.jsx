/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import useFetch from "../../useFetch";
import Card from "../Card/Card";

export default function Action({ status, actions }) {

  const theApiKey= "aea07ae608264c18c1ea1431604753c3"
  const actionMoviesFetchURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28&api_key=${theApiKey}`
  const actionSeriesFetchURL = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759&api_key=${theApiKey} `
 
const {
  data: actionMovies,
  loading: loadingActionMovies,
  error: errorActionMovies,
} = useFetch(actionMoviesFetchURL);
const {
  data: actionSeries,
  loading: loadingActionSeries,
  error: errorActionSeries
} = useFetch(actionSeriesFetchURL);
// Fonction permettant de mélanger 2 tableaux après les avoir concaténés
const Concat = (arr1, arr2) => {
  const final = arr1.concat(arr2);
  return final;
};
// Fusion + mélange des tendances movies + series et limité à 15

let allActions = [];
if (actionMovies && actionSeries) {
  allActions = Concat(actionMovies.slice(0, 10), actionSeries.slice(0, 10))
  .sort((a,b) => a.vote_average - b.vote_average)
  .reverse()
  .slice(0,10);
  return allActions
}
if (loadingActionMovies || loadingActionSeries) {
  return <h1>LOADING ...</h1>;
}
if (errorActionMovies || errorActionSeries) {
  console.info("error");
}

  
  

  return (
    <div className="slider-popular">
      <h1 className="main-title">ACTIONS</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={5}
          slidesPerView={6}
          // eslint-disable-next-line react/jsx-boolean-value
          loop={true}
          // eslint-disable-next-line react/jsx-boolean-value
          freeMode={true}
          breakpoints={{
            1200: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
            750: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            500: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            320: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            280: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
          }}
          navigation
          className="mySwiper"
        >
          <div>
            {status
              ? actions?.map((content) => (
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
  actions: PropTypes.oneOfType([PropTypes.array.isRequired]).isRequired,
};
