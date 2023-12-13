/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import getData from "../fn/getData.js";

function MovieDesc() {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("query");
  const date = searchParams.get("first_air_date_year");
  const year = searchParams.get("year");
  const type = searchParams.get("type");
  const adult = searchParams.get("adult");
  const language = searchParams.get("language");

  const [movie, setMovie] = useState();
  const [render, setRender] = useState(false);
  const [genre, setGenre] = useState([]);

  const fetchData = async () => {
    try {
      let url = `https://api.themoviedb.org/3/search/movie?query=${query}&primary_release_year=${date}&page=1&year=${year}&include_adult=${adult}&region=${language}`
      if (type === "tv") {
        url = `https://api.themoviedb.org/3/search/tv?query=${query}&first_air_date_year=${date}&page=1&year=${year}&include_adult=${adult}`;
      }
      const response = await getData(url);
      setMovie(response.results[0]);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    fetchData(); // Panggil fungsi fetchData di dalam useEffect
  }, [render]);

  useEffect(() => {
    getData("https://api.themoviedb.org/3/genre/movie/list?api_key=cf1ac44e572326948fd75eef18f2e59e&language=en-US")
    .then((res) => setGenre(res.genres));
  }, []);

  if (!movie) {
    setMovie({})
    setRender((a) => !a);
  } else {
    return (
      <div className="flex w-screen h-screen">
        <div
          className="w-screen h-screen fixed bg-cover bg-center blur-sm brightness-50"
          style={
            movie.backdrop_path
              ? {
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
                }
              : {}
          }
        />

        <div className="container md:translate-x-[-70px] h-screen mx-auto px-4 md:px-14 flex flex-col md:flex-row text-center md:text-left items-center justify-center z-10 gap-2">
          <div className="flex justify-center items-end w-auto md:w-[600px] flex-1 relative">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie?.poster_path}`
                  : {}
              }
              alt={`Poster ${movie?.name}`}
              className="md:translate-x-[30px] xl:translate-x-[80px] md:w-6/12 h-60 md:h-auto sm:h-60 rounded-md relative"
            />
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl mb-1 font-bold">
                {movie.name ? movie.name : movie.title}
              </h1>
              <div className="flex items-center justify-center md:justify-start flex-wrap">
                {movie.genre_ids &&
                  movie.genre_ids.map((items, index) => {
                    // eslint-disable-next-line array-callback-return
                    return genre.map((element, index) => {
                      if (element.id === items) {
                        return (
                          <span
                            key={index}
                            className="font-sans font-medium py-1 px-2 mr-1 bg-gray-900 rounded text-sm xl:text-lg"
                          >
                            {element.name}
                          </span>
                        );
                      }
                    });
                  })}
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm lg:text-base xl:text-xl sm:px-10 md:px-0">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDesc;
