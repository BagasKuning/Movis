import { useEffect, useState } from "react";
import Home from "./Home.jsx";
import Movies from "./Movies.jsx";

export default function Main() {
  return (
    <div>
      <Home />
      <Movies
        id={"movie"}
        title={"TOP 10 MOVIES"}
        url={
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=cf1ac44e572326948fd75eef18f2e59e"
        }
      />
      <Movies
        id={"tv"}
        title={"TRENDING TV"}
        url={
          "https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=cf1ac44e572326948fd75eef18f2e59e"
        }
      />

      <div style={{ height: "70px" }} />
    </div>
  );
}
