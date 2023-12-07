import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import search from "./../images/search.png" 

/* eslint-disable jsx-a11y/anchor-is-valid */
const Navbar = () => {
    const [navbarHeight, setNavbarHeight] = useState("")
    const [scrollY, setScrollY] = useState(window.scrollY)
    const [bgNavbar, setBgNavbar] = useState(false)
    const [query, setQuery] = useState("")

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // Mengirimkan query ke fungsi pengelolaan pencarian
        handleSearch(query);
      }
    };
    
    const handleSearch = (searchQuery) => {
      window.location.href = `/search/${query}`
      setQuery('');
    };

    useEffect(() => {
        setNavbarHeight(document.getElementById("navbar").clientHeight)
        const handleScroll = () => {
          setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
    
        // Membersihkan event listener setelah komponen di-unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []); // Dependensi kosong agar efek hanya dijalankan sekali saat komponen dimount
    
      useEffect(() => {
        if (scrollY > 0) {
          setBgNavbar(true)
        } else {
            setBgNavbar(false)
        }
      }, [scrollY]);

    return (
        <div
        className="flex justify-center w-screen fixed z-50 transition duration-500"
        style={{
            height: navbarHeight,
            background: `${bgNavbar ? "#061720" : "linear-gradient(to bottom, rgb(9, 38, 53), rgba(0, 0, 0, 0) 100%)"}`,
        }}
        >
            <div id="navbar" className="container h-12 flex w-screen items-center justify-between fixed text-white z-50 ">
                <Link to={window.location.origin} className="font-medium mx-7 text-2xl mb-1 z-50">
                    MoviS
                </Link>
                <div className="flex items-center relative">
                    <div className="hidden sm:flex gap-3 pr-3">
                        <a href="/#movie">MOVIES</a>
                        <a href="/#tv">TV</a>
                    </div>
                    <input
                        type="text"
                        id="input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Search"
                        className=" px-3 py-[3px] rounded-2xl w-36 sm:mr-0 mr-4 text-black relative z-10"
                    />
                    <img
                        src={search}
                        alt="search"
                        onClick={handleSearch}
                        width={20}
                        height={20}
                        className="z-10 mr-4 sm:mr-0 absolute right-3 top-50% transform cursor-pointer bg-white"
                    />
                </div>
            </div>
        </div>
    )    
}

export default Navbar