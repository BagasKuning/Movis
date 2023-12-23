import Home from "./Home.jsx";
import Movies from "./Movies.jsx";
import NewFilm from "./NewFilm.jsx";

export default function Main() {
  return (
    <div>
      <Home />
      <Movies
        id={"movie"}
        title={"Top 10 Movies"}
        url={
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${process.env.REACT_APP_API_KEY}`
        }
      />
      <NewFilm
        title={`New Movies Release In ${new Date().getFullYear()}`}
        url={
          `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=us&with_original_language=en&first_air_date_year=${new Date().getFullYear()}&without_genres=no&api_key=${process.env.REACT_APP_API_KEY}`
        }
      />
      <Movies
        id={"tv"}
        title={"Trending TV"}
        url={
          `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`
        }
      />
    </div>
  );
}
