import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Movies({title, url}) {
    const [movieTop, setMovieTop] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
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
    console.log(movieTop)

    return (
        <div className='container mx-auto my-20'>
            <div className='mx-8'>
                <div className="text-2xl mb-6 relative mb-6">
                    <h1 className='relative z-10'>{title}</h1>
                    <div className='h-3 translate-x-[-6px] w-16 absolute bottom-0 z-0' 
                    style={{backgroundImage: "linear-gradient(to right, rgb(148 163 184), rgba(0, 0, 0, 0) 100%)"}}></div>
                </div>
                 <div className='px-4 border-y-[6.5px]' style={{borderColor: "#3b3b3b5f"}}>
                    <Swiper className='container justify-between'
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
                                    ...(windowWidth >= 1250 && { height: '300px' }),
                                    ...(windowWidth <= 868 && { height: '190px' }),
                                    ...(windowWidth <= 400 && { height: '230px' }),

                                }}
                            >
                                <Link 
                                to={`detail/${items.id}?query=${items.title ? items.title : items.name}&type=${items.media_type ? items.media_type : "movie"}&first_air_date_year=${items.release_date ? items.release_date : items.first_air_date}&year=${items.release_date ? new Date(items.release_date).getUTCFullYear() : new Date(items.first_air_date).getUTCFullYear()}&adult=${items.adult}&language=${items.original_language}`}
                                className='flex p-3 flex-col justify-end h-full w-full absolute group-hover:opacity-70 opacity-0 transition-opacity hover:bg-black'>
                                    <h2 className='z-10 text-lg leading-5'>{items.title ? items.title : items.name}</h2>
                                    <p className='text-xs mt-1'>
                                        {items.release_date ? new Date(items.release_date).getFullYear() 
                                        : items.first_air_date ? new Date(items.first_air_date).getFullYear() 
                                        : "" }
                                    </p>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                    </Swiper>
                 </div>
            </div>
        </div>
    )
}

                            {/* <img src={`https://image.tmdb.org/t/p/original${items.poster_path}`} alt=""
                            className="card w-full border-y relative"
                            style={{borderColor: "rgba(255, 255, 255, 0.1)"}}
                            /> */}