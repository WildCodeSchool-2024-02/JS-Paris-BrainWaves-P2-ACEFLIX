/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import useFetch from "../../useFetch";
import Card from "../Card/Card";
import "./syfy.css";

export default function Syfy({ status, uniqueSyfy, shuffle }) {
  // URL des Movies et Series Syfy
  const syfyMoviesFetchURL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878&api_key=aea07ae608264c18c1ea1431604753c3";
  const syfySeriesFetchURL =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765&api_key=aea07ae608264c18c1ea1431604753c3";

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: syfyMovies,
    loading: loadingSyfyMovies,
    error: errorSyfyMovies,
  } = useFetch(syfyMoviesFetchURL);
  const {
    data: syfySeries,
    loading: loadingSyfySeries,
    error: errorSyfySeries,
  } = useFetch(syfySeriesFetchURL);

  // Fusion + mélange des tendances movies + series et limité à 15
  let allSyfy = [];
  if (syfyMovies && syfySeries) {
    allSyfy = shuffle(syfyMovies.slice(0, 10).concat(syfySeries.slice(0, 10)));
  }
  if (loadingSyfyMovies || loadingSyfySeries) {
    return <h1>LOADING ...</h1>;
  }
  if (errorSyfyMovies || errorSyfySeries) {
    console.info("Error");
  }

  return (
    <div className="slider-popular">
      <h1 className="main-title">SCIENCE FICTION</h1>
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
              ? uniqueSyfy?.map((content) => (
                  <SwiperSlide key={content.id}>
                    <Card card={content} />
                  </SwiperSlide>
                ))
              : allSyfy?.map((content) => (
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

Syfy.propTypes = {
  status: PropTypes.bool.isRequired,
  uniqueSyfy: PropTypes.oneOfType([PropTypes.array.isRequired]).isRequired,
  shuffle: PropTypes.func.isRequired,
};
