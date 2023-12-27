/* eslint-disable jsx-a11y/img-redundant-alt */
import getData from "../fn/getData.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loading from "./../images/loading.png";

export default function Search() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const query = window.location.pathname.split("/")[2];

  const url = `https://api.themoviedb.org/3/search/multi?query=${query}&language=en-US&page=1&adult=true`;

  useEffect(() => {
    getData(url).then(res => setData(res.results))

    const timeoutId = setTimeout(() => {
      setMessage(true);
    }, 3000);

    // Membersihkan timer saat komponen unmount atau kondisi berubah
    return () => clearTimeout(timeoutId);
  }, [url]);

  if (data.length === 0) {
    return (
      <div
        className="min-h-screen flex justify-center items-center text-center"
        style={{ color: "#ffffffd8" }}
      >
        {message ? (
          <div>
            <p className="text-3xl font-semibold">
              From
              <span className="italic underline px-2">
                {query && query.replace(/%20/g, " ")}
              </span>
              Data Not Found
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
