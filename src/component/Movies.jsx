import React, { useEffect, useState } from "react";
import getData from "../fn/getData.js";
import { Link } from "react-router-dom";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { LazyLoadComponent } from "react-lazy-load-image-component";

export default function Movies({ title, url, id }) {
  const [movieTop, setMovieTop] = useState([]);

  useEffect(() => {
    getData(url).then((res) => setMovieTop(res.results.splice(0, 10)));
  }, [url]);
  
  return (
    <div className="container mx-auto my-14 sm:my-20" id={id}>
      <div className="mx-4 sm:mx-8">
        <div className="max-[340px]:text-base text-lg sm:text-2xl relative mb-6">
          <h1 className="relative z-10">{title}</h1>
          <div
            className="h-3 translate-x-[-6px] w-16 absolute bottom-0 z-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(148 163 184), rgba(0, 0, 0, 0) 100%)",
            }}
          />
        </div>
        <div
          className="px-1 sm:px-3 border-y-[3px] sm:border-y-[5px]"
          style={{ borderColor: "#465d6eb0" }}
        >
          <Swiper
            className="container justify-between max-[270px]:h-[70px] max-[425px]:h-[130px] h-[160px] sm:h-[210px] xl:h-[240px] 2xl:h-[290px]"
            // slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              200: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              500: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 0,
              },
            }}
          >
            <LazyLoadComponent>
              {movieTop &&
                movieTop.map((items, index) => (
                  <SwiperSlide
                    key={index}
                    className="items-end bg-cover bg-center z-0 group relative"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${items.poster_path})`,
                    }}
                  >
                    <Link
                      to={`detail/${items.id}?query=${
                        items.title ? items.title : items.name
                      }&type=${
                        items.media_type ? items.media_type : "movie"
                      }&first_air_date_year=${
                        items.release_date
                          ? items.release_date
                          : items.first_air_date
                      }&year=${
                        items.release_date
                          ? new Date(items.release_date).getUTCFullYear()
                          : new Date(items.first_air_date).getUTCFullYear()
                      }&adult=${items.adult}&language=${
                        items.original_language
                      }`}
                      className="flex p-3 flex-col justify-end h-full w-full absolute group-hover:opacity-70 opacity-0 transition-opacity hover:bg-black"
                    >
                      <h2 className="z-10 text-sm sm:text-lg leading-3 sm:leading-5">
                        {items.title ? items.title : items.name}
                      </h2>
                      <p className="text-xs mt-1">
                        {items.release_date
                          ? new Date(items.release_date).getFullYear()
                          : items.first_air_date
                          ? new Date(items.first_air_date).getFullYear()
                          : ""}
                      </p>
                    </Link>
                  </SwiperSlide>
                ))}
            </LazyLoadComponent>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
