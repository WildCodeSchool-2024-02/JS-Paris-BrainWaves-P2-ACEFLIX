/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./horror.css";
import Card from "../Card/Card";
import useFetch from "../../useFetch";
import "swiper/css/free-mode";

export default function Horror({ shuffle }) {
  // URL des Movies et Series les mieux notés
  const theApiKey = import.meta.env.VITE_API_KEY;
  const horrorFetchUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27&api_key=${theApiKey}`;
  const horrorFetchUrl2 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=27&api_key=${theApiKey}`;

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: horrorMovies,
    loading: loadingHorror,
    error: errorHorror,
  } = useFetch(horrorFetchUrl);
  const {
    data: horrorMovies2,
    loading: loadingHorror2,
    error: errorHorror2,
  } = useFetch(horrorFetchUrl2);

  if (loadingHorror || loadingHorror2) {
    return <h1>LOADING ...</h1>;
  }
  if (errorHorror || errorHorror2) {
    console.info("Error");
  }

  // Fonction permettant de mélanger 2 tableaux après les avoir concaténés
  const ShuffleConcat = (arr1, arr2) => {
    const final = shuffle(arr1.concat(arr2));
    return final;
  };

  // Fusion + mélange des tendances movies + series et limité à 15
  let allHorror = [];
  if (horrorMovies && horrorMovies2) {
    allHorror = ShuffleConcat(horrorMovies, horrorMovies2).slice(0, 20);
  }

  return (
    <div className="horror-slider">
      <h1 className="main-title">HORROR</h1>
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
          {allHorror?.map((content) => (
            <SwiperSlide key={content.id}>
              <Card card={content} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

Horror.propTypes = {
  shuffle: PropTypes.func.isRequired,
};
