import React, { useEffect, useState } from 'react'
import axios from 'axios';

function MovieDesc(props) {
  const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('query');
    const date = searchParams.get('first_air_date_year');
    const year = searchParams.get('year');
    const type = searchParams.get('type')
    const adult = searchParams.get('adult')
    const language = searchParams.get('language')

    const [url, setUrl] = useState(`https://api.themoviedb.org/3/search/movie?query=${query}&primary_release_year=${date}&page=1&year=${year}&include_adult=${adult}&region=${language}`)
    const [movie, setMovie] = useState({})
    const [genre, setGenre] = useState([])

    useEffect(() => {
      if(type == "tv") setUrl(`https://api.themoviedb.org/3/search/tv?query=${query}&first_air_date_year=${date}&page=1&year=${year}&include_adult=${adult}`)
      const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjFhYzQ0ZTU3MjMyNjk0OGZkNzVlZWYxOGYyZTU5ZSIsInN1YiI6IjY1NWVlZDRmMmIxMTNkMDE0ZWFkMzJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t11kV5FJeA8AkviCTAb9XfT_GijZq_RlJQYtixAUa0'
      }
      };
      axios(url,options)
      .then(res => {
          setMovie(res.data.results[0])
      })
      .catch(error => {
          console.error('Error:', error);
      });

      axios("https://api.themoviedb.org/3/genre/movie/list?api_key=cf1ac44e572326948fd75eef18f2e59e&language=en-US", options)
      .then(res => {
        setGenre(res.data.genres)
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }, [url])
  console.log(movie)
    
  return (
    <div 
    className='flex w-full h-full' >
      <div 
      className='w-screen h-screen absolute bg-cover bg-center blur-sm'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}
      />
      <div className='opacity-50 bg-black h-full w-full absolute z-0'></div>
      
      <div className='container md:translate-x-[-70px] h-screen mx-auto px-4 md:px-14 flex flex-col md:flex-row text-center md:text-left items-center justify-center z-10 gap-2'>
        <div className='flex justify-center items-end w-auto md:w-[600px] flex-1'>
          <img 
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
            alt={`Poster ${movie.name}`}
            className='md:translate-x-[70px] w-full md:w-6/12 h-60 md:h-auto sm:h-60 rounded-md'
          />
        </div>
        <div  className='flex-1'>
          <div className='mb-2'>
            <h1 className='text-3xl lg:text-4xl xl:text-5xl mb-1 font-bold'>{movie.name ? movie.name : movie.title}</h1>
            <div>
              {movie.genre_ids && movie.genre_ids.map((items, index) => {
                return(
                  genre.map((element, index) => {
                    if(element.id === items){
                      return (
                        <span key={index} className='py-1 px-2 mr-1 bg-gray-900 rounded text-sm xl:text-lg'>
                          {element.name}
                        </span>
                      )
                    }
                  })
                )
              })}
            </div>
          </div>
          <p className='text-xs md:text-sm lg:text-base xl:text-xl sm:px-10 md:px-0'>{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDesc