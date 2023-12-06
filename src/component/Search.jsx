/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const query = window.location.pathname.split("/")[2]
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&language=en-US&page=1&adult=true`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjFhYzQ0ZTU3MjMyNjk0OGZkNzVlZWYxOGYyZTU5ZSIsInN1YiI6IjY1NWVlZDRmMmIxMTNkMDE0ZWFkMzJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t11kV5FJeA8AkviCTAb9XfT_GijZq_RlJQYtixAUa0'
        }
    };

    useEffect(() => {
        axios(url, options)
        .then(res => {
            setData(res.data.results)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [])

  return (
    <div className='min-h-screen text-white'>
        <h1 style={{paddingTop: `75px`}} className='pb-6 font-semibold text-center capitalize text-4xl'>{query}</h1>
        <div className='container mx-auto flex flex-wrap justify-center gap-4'>
            {data && data.map((items, index) => (
                <Link 
                    key={index} className='w-40' 
                    onClick={() => {
                        navigate(`detail/${items.id}?query=${items.title ? items.title : items.name}&type=${items.media_type ? items.media_type : "movie"}&first_air_date_year=${items.release_date ? items.release_date : items.first_air_date}&year=${items.release_date ? new Date(items.release_date).getUTCFullYear() : new Date(items.first_air_date).getUTCFullYear()}&adult=${items.adult}&language=${items.original_language}`);
                    }}
                >
                    <img 
                        src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
                        alt="Image not available" 
                        width={"auto"}
                        className='rounded'
                    />
                    <h2>{items.name ? items.name : items.title}</h2>
                </Link>
            ))}
        </div>
    </div>
  )
}
