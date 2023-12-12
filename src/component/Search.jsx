/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loading from "./../images/loading.png";

export default function Search() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const query = window.location.pathname.split("/")[2];

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&language=en-US&page=1&adult=true`;
    const options = {
        method: "GET",
        headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjFhYzQ0ZTU3MjMyNjk0OGZkNzVlZWYxOGYyZTU5ZSIsInN1YiI6IjY1NWVlZDRmMmIxMTNkMDE0ZWFkMzJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t11kV5FJeA8AkviCTAb9XfT_GijZq_RlJQYtixAUa0",
        },
    };

    axios(url, options)
      .then((res) => {
        setData(res.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const timeoutId = setTimeout(() => {
      setMessage(true);
    }, 3000);

    // Membersihkan timer saat komponen unmount atau kondisi berubah
    return () => clearTimeout(timeoutId);
  }, [query]);

  if (data.length === 0) {
    return (
      <div
        className="min-h-screen flex justify-center items-center text-center"
        style={{ color: "#ffffffd8" }}
      >
        {message ? (
          <div>
            <p className="text-3xl font-semibold">
              Didn't find data from{" "}
              <span className="italic underline">
                {query && query.replace(/%20/g, " ")}
              </span>
            </p>
            <p className="text-sm">( Or Check Your Connection )</p>
          </div>
        ) : (
          <img src={loading} alt="loading..." className="w-20 animate-spin" />
        )}
      </div>
    );
  } else {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center">
        <div className="relative pt-12 pb-6 text-center w-full flex justify-center">
          <h1 className="font-semibold italic capitalize w-max text-4xl z-10">
            {query && query.replace(/%20/g, " ")}
            <div
              className="h-9 w-16 absolute z-0 -translate-y-full -translate-x-4"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(37 121 124), rgba(0, 0, 0, 0) 100%)",
              }}
            />
          </h1>
        </div>
        <div className="container px-3 flex flex-wrap justify-center gap-4">
          {data &&
            data.map((items, index) => {
              if (!items.poster_path) {
                return <div key={index} className="hidden"></div>;
              }

              return (
                <Link
                  key={index}
                  className="w-40"
                  to={`/detail/${items.id}?query=${
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
                  }&adult=${items.adult}&language=${items.original_language}`}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
                    alt="Image not available"
                    width={"auto"}
                    className="rounded"
                  />
                  <h2>{items.name ? items.name : items.title}</h2>
                </Link>
              );
            })}
        </div>
      </div>
    );
  }
}
