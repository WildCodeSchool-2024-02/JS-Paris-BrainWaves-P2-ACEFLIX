/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./banner.css";
import { Autoplay } from "swiper/modules";
import useFetch from "../../useFetch";
import BannerCard from "./BannerCard/BannerCard";

export default function Banner() {
  const cinemaURL =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";

  const {
    data: cinemaContent,
    loading: loadingCinema,
    error: errorCinema,
  } = useFetch(cinemaURL);

  if (loadingCinema) {
    return <h1>LOADING ...</h1>;
  }

  if (errorCinema) {
    console.info("Error");
  }

  let newCinema = [];
  if (cinemaContent) {
    newCinema = cinemaContent.slice(0, 5);
  }

  return (
    <div className="cinema-swipper">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        direction="vertical"
        centeredSlides
        loop
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          1025: {
            direction: "vertical",
          },
          200: {
            direction: "horizontal",
          },
        }}
        className="swipper-cinema-content"
      >
        {newCinema?.map((content) => (
          <SwiperSlide key={content.id}>
            <BannerCard
              overview={content.overview}
              title={content.original_title}
              id={content.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
