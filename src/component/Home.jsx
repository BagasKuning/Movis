import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

export default function Home() {

    const [movieData, setMovieData] = useState([]);
    const homeSize = "550px";

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=cf1ac44e572326948fd75eef18f2e59e';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjFhYzQ0ZTU3MjMyNjk0OGZkNzVlZWYxOGYyZTU5ZSIsInN1YiI6IjY1NWVlZDRmMmIxMTNkMDE0ZWFkMzJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t11kV5FJeA8AkviCTAb9XfT_GijZq_RlJQYtixAUa0'
          }
        };
        axios(url, options)
          .then(response => {
            setMovieData(response.data.results)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);

    return (
      <Swiper 
      className='mySwiper flex' 
      style={{ height: homeSize }}
      rewind={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Navigation, Autoplay]}
    >
      <div style={{ height: homeSize }} className='opacity-20 bg-black' ></div>
      {movieData && movieData.map((items, index) => (
        <SwiperSlide
          key={index}
          className='flex w-full h-full items-end bg-cover bg-center flex-shrink-0 z-0' 
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${items.backdrop_path})`,
            display: 'flex',
            backgroundAttachment: 'fixed', // Add this line
          }}
        >
          <div
            className='h-full w-full absolute '
            style={{
              height: homeSize,
              backgroundImage: `linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0) 30%)`
            }}
          ></div>
          <h2 className='font-medium text-white px-14 pb-8 z-50' style={{ fontSize: "2rem" }}>
            {items.original_title}
          </h2>
        </SwiperSlide>
      ))}
    </Swiper>
    )
}
