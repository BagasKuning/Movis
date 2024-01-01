import React, { useEffect, useState } from "react";
import getData from "../fn/getData";
import placeHolderImage from "./../images/placeholder-image.png";
import { Link } from "react-router-dom";

export default function NewFilm({ title, url }) {
  const [data, setData] = useState([]);
  const [maxItemsToShow, setMaxItemsToShow] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      // Update maxItemsToShow based on window width
      setMaxItemsToShow(window.innerWidth <= 640 ? 6 : 10);
    };

    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    getData(url).then((res) => setData(res.results.splice(0, 10)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const lazyImages = document.querySelectorAll("img.lazy");

    if ("IntersectionObserver" in window) {
      const lazyImageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove("lazy");
              observer.unobserve(lazyImage);
            }
          });
        },
        {
          rootMargin: "0px 0px 100px 0px", // Sesuaikan dengan kebutuhan margin
          threshold: 0.5, // Sesuaikan threshold sesuai kebutuhan
        }
      );

      lazyImages.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      lazyImages.forEach((lazyImage) => {
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.srcset = lazyImage.dataset.srcset;
        lazyImage.classList.remove("lazy");
      });
    }
  }, [data]); // useEffect dependencies

  return (
    <div className="container mx-auto">
      <div className="mx-4 sm:mx-8">
        <div className="max-[340px]:text-base text-lg sm:text-2xl relative mb-6">
          <h1 className="relative z-10 leading-none">{title}</h1>
          <div
            className="h-3 translate-x-[-6px] w-16 absolute bottom-0 z-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(148 163 184), rgba(0, 0, 0, 0) 100%)",
            }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-3 text-xs sm:text-sm md:text-base max-[340px]:text-[8px] max-[340px]:leading-tight">
          {data &&
            data.slice(0, maxItemsToShow).map((items, index) => (
              <Link
                key={index}
                to={`detail/${items.id}?query=${
                  items.title ? items.title : items.name
                }&type=${
                  items.media_type ? items.media_type : "movie"
                }&first_air_date_year=${
                  items.release_date ? items.release_date : items.first_air_date
                }&year=${
                  items.release_date
                    ? new Date(items.release_date).getUTCFullYear()
                    : new Date(items.first_air_date).getUTCFullYear()
                }&adult=${items.adult}&language=${items.original_language}`}
              >
                <img
                  src={
                    items.poster_path
                      ? placeHolderImage // Gambar placeholder atau loading spinner
                      : {}
                  }
                  data-src={`https://image.tmdb.org/t/p/w500${items?.backdrop_path}`}
                  data-srcset={`https://image.tmdb.org/t/p/w500${items?.backdrop_path} 1000w, https://image.tmdb.org/t/p/w500${items?.backdrop_path} 500w`}
                  alt={`Poster ${items?.name}`}
                  loading="lazy"
                  className="lazy rounded-md hover:brightness-50 transition border-[1px] border-transparent hover:border-slate-300"
                />

                <h2>{items.name ? items.name : items.title}</h2>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
