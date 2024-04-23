/* eslint-disable import/no-unresolved */
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./upcoming.css";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "swiper/css/free-mode";

export default function Upcoming() {
  // URL des Movies et Series les mieux notés
  const upcomingFetchURL =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    fetch(upcomingFetchURL)
      .then((response) => response.json())
      .then((response) => setUpcoming(response.results));
  }, []);

  return (
    <div className="slider-popular">
      <h1 className="main-title">UPCOMING</h1>
      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={10}
        slidesPerView={6}

        freeMode
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
        {upcoming?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Card card={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

