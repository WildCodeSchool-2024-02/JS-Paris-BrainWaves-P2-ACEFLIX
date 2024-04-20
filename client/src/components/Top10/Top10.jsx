/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./top10.css";
import Card from "../Card/Card";
import useFetch from "../../useFetch";
import "swiper/css/free-mode";

export default function Top10({ status, uniqueTop, setBlackScreen, setIdVideo }) {
  // URL des Movies et Series les mieux notés
  const moviesFetchURL =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const seriesFetchURL =
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: TopMovies,
    loading: loadingMovies,
    error: errorMovies,
  } = useFetch(moviesFetchURL);
  const {
    data: TopSeries,
    loading: loadingSeries,
    error: errorSeries,
  } = useFetch(seriesFetchURL);

  // Fonction permettant de concaténer 2 tableaux
  const concat = (arr1, arr2) => {
    const newArray = arr1.concat(arr2);
    return newArray;
  };

  // Concaténation des tableaux contenant les movies et series classés par note (ordre decroissant)
  let TopContent = [];
  if (TopMovies && TopSeries) {
    TopContent = concat(TopMovies.slice(0, 10), TopSeries.slice(0, 10))
      .sort((a, b) => a.vote_average - b.vote_average)
      .reverse()
      .slice(0, 10);
  }
  if (loadingMovies || loadingSeries) {
    return <h1>LOADING ...</h1>;
  }
  if (errorMovies || errorSeries) {
    console.info("Error");
  }

  return (
    <section className="slider-top10">
      <h1 className="main-title">TOP 10</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={5}
          slidesPerView={6}
          loop={false}
          // eslint-disable-next-line react/jsx-boolean-value
          freeMode={true}
          centeredSlides={false}
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
          {status
            ? uniqueTop?.map((content) => (
                <SwiperSlide key={content.id}>
                  <Card card={content} id={content.id} setBlackScreen={setBlackScreen} setIdVideo={setIdVideo}/>
                </SwiperSlide>
              ))
            : TopContent?.map((content) => (
                <SwiperSlide key={content.id}>
                  <Card card={content} id={content.id} setBlackScreen={setBlackScreen} setIdVideo={setIdVideo}/>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}

Top10.propTypes = {
  status: PropTypes.bool.isRequired,
  uniqueTop: PropTypes.oneOfType([PropTypes.array.isRequired]).isRequired,
  setBlackScreen: PropTypes.func.isRequired,
  setIdVideo: PropTypes.func.isRequired
};
