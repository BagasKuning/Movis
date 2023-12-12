import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Home() {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?api_key=cf1ac44e572326948fd75eef18f2e59e";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjFhYzQ0ZTU3MjMyNjk0OGZkNzVlZWYxOGYyZTU5ZSIsInN1YiI6IjY1NWVlZDRmMmIxMTNkMDE0ZWFkMzJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t11kV5FJeA8AkviCTAb9XfT_GijZq_RlJQYtixAUa0",
      },
    };
    axios(url, options)
      .then((response) => {
        setMovieData(response.data.results.splice(0, 10));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Swiper
      id="home"
      className="mySwiper flex relative rounded-xl h-[280px] xl:rounded-3xl md:h-[500px] xl:h-[525px] 2xl:h-[680px] min-[2000px]:h-[780px]"
      rewind={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Navigation, Autoplay]}
    >
      {movieData &&
        movieData.map((items, index) => (
          <SwiperSlide
            key={index}
            className="flex w-full h-full items-end bg-cover bg-center flex-shrink-0 z-0"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${items.backdrop_path})`,
              display: "flex",
            }}
          >
            <Link
              to={`detail/${items.id}?query=${
                items.title ? items.title : items.name
              }&type=${
                items.media_type ? items.media_type : "movie"
              }&first_air_date_year=${
                items.release_date ? items.release_date : items.first_air_date
              }&year=${
                items.release_date
                  ? new Date(items.release_date).getUTCFullYear()
                  : new Date(items.first_air_date).getUTCFullYear()
              }&adult=${items.adult}&language=${items.original_language}`}
              className="w-full absolute h-[280px] md:h-[500px] 2xl:h-[680px] min-[2000px]:h-[780px]"
              style={{
                backgroundImage: `linear-gradient(to top, rgb(0, 0, 0, 0.68), rgba(0, 0, 0, 0) 30%)`,
              }}
            />
            <h2 className="font-medium text-white md:px-10 px-3 pb-4 z-50 md:text-3xl sm:text-2xl text-lg">
              {items.original_title}
            </h2>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
