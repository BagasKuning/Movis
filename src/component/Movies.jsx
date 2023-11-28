import axios from 'axios';
import React, { useEffect, useState } from 'react'

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Movies() {
    const [movieTop, setMovieTop] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=cf1ac44e572326948fd75eef18f2e59e';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjFhYzQ0ZTU3MjMyNjk0OGZkNzVlZWYxOGYyZTU5ZSIsInN1YiI6IjY1NWVlZDRmMmIxMTNkMDE0ZWFkMzJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t11kV5FJeA8AkviCTAb9XfT_GijZq_RlJQYtixAUa0'
        }
        };
        axios(url,options)
        .then(res => {
            setMovieTop(res.data.results)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [])

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth)
    })

    return (
        <div className='container mx-auto my-10'>
            <div className='mx-8'>
                <div className="text-2xl mb-4 relative mb-6">
                    <h1 className='relative z-10'>TOP 20 RATED</h1>
                    <div className='h-3 translate-x-[-6px] w-16 absolute bottom-0 z-0' 
                    style={{backgroundImage: "linear-gradient(to right, rgb(148 163 184), rgba(0, 0, 0, 0) 100%)"}}></div>
                </div>
                <Swiper className='container justify-between border-x-[3.5px] py-2 border-slate-600'
                    // slidesPerView={1}
                    spaceBetween={0}
                    breakpoints={{
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    400: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 0,
                    },
                    }}
                >
                {
                    movieTop && movieTop.map((items, index) => (
                        <SwiperSlide
                            key={index}
                            className='flex items-end bg-cover bg-center z-0 group relative'
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${items.poster_path})`,
                                height: '240px',
                                ...(windowWidth <= 768 && { height: '200px' }),
                                ...(windowWidth <= 400 && { height: '230px' }),

                            }}
                        >
                            <a href='#' className='flex p-3 flex-col justify-end h-full w-full absolute group-hover:opacity-70 opacity-0 transition-opacity hover:bg-black'>
                                <h2 className='z-10 text-lg leading-5'>{items.title}</h2>
                                <p className='text-xs mt-1'>{items.release_date}</p>
                            </a>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>
        </div>
    )
}

                            {/* <img src={`https://image.tmdb.org/t/p/original${items.poster_path}`} alt=""
                            className="card w-full border-y relative"
                            style={{borderColor: "rgba(255, 255, 255, 0.1)"}}
                            /> */}