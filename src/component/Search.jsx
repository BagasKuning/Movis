/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Search() {
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
    console.log(data)

    if(data.length === 0){
        return (
            <div className='min-h-screen text-2xl italic font-semibold flex justify-center items-center' style={{color: '#ffffffd8'}}>
                DATA NOT FOUND
            </div>
        )
    } else {
        return (
          <div className='min-h-screen text-white'>
              <div className='relative pt-16 pb-6 text-center w-screen flex justify-center'>
                  <h1 className='font-semibold italic capitalize w-max text-4xl z-10'>
                      {query && query.replace(/%20/g, ' ')}
                      <div 
                          className='h-9 w-16 absolute z-0 -translate-y-full -translate-x-4' 
                          style={{backgroundImage: "linear-gradient(to right, rgb(37 121 124), rgba(0, 0, 0, 0) 100%)"}}
                      />
                  </h1>
              </div>
              <div className='container mx-auto flex flex-wrap justify-center gap-4'>
                  {data && data.map((items, index) => (
                      <Link 
                          key={index} 
                          className='w-40' 
                          to={`/detail/${items.id}?query=${items.title ? items.title : items.name}&type=${items.media_type ? items.media_type : "movie"}&first_air_date_year=${items.release_date ? items.release_date : items.first_air_date}&year=${items.release_date ? new Date(items.release_date).getUTCFullYear() : new Date(items.first_air_date).getUTCFullYear()}&adult=${items.adult}&language=${items.original_language}`}
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
}
