/* eslint-disable import/no-unresolved */
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./trending.css";
import Card from "../Card/Card";
import useFetch from "../../useFetch";
import "swiper/css/free-mode";

export default function Trending() {
  const trendingFetchUrl =
    "https://api.themoviedb.org/3/trending/tv/week?language=en-US8&api_key=aea07ae608264c18c1ea1431604753c3";

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: trendingSeries,
    loading: loadingTrending,
    error: errorTrending,
  } = useFetch(trendingFetchUrl);

  if (loadingTrending) {
    return <h1>LOADING ...</h1>;
  }
  if (errorTrending) {
    console.info("Error");
  }

  return (
    <div className="drama-slider">
      <h1 className="main-title">TRENDING THIS WEEK</h1>
      <div className="slider-container">
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
          {trendingSeries?.map((content) => (
            <SwiperSlide key={content.id}>
              <Card card={content} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
