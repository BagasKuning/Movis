import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import getData from "../fn/getData.js";

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
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`;

    getData(url).then((res) => setMovieData(res.results.splice(0, 10)));
  }, []);

  return (
    <Swiper
      id="home"
      className="mySwiper max-w-[1700px] flex relative rounded-xl rounded-tl-none rounded-tr-none h-[280px] xl:rounded-3xl xl:rounded-tl-none xl:rounded-tr-none md:h-[500px] xl:h-[525px] 2xl:h-[680px]"
      rewind={true}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Navigation, Autoplay]}
    >
      {movieData &&
        movieData.map((items, index) => (
          <SwiperSlide
            key={index}
            className="items-end bg-cover bg-center"
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
