import { useEffect, useState } from "react"

/* eslint-disable jsx-a11y/anchor-is-valid */
const Navbar = () => {
    const [navbarHeight, setNavbarHeight] = useState("")

    useEffect(() => {
        setNavbarHeight(document.getElementById("navbar").clientHeight)
    }, [])

    return (
        <div 
        className="flex justify-center w-screen fixed z-50"
        style={{
            height: navbarHeight,
            backgroundImage: "linear-gradient(to bottom, rgb(27, 27, 27), rgba(0, 0, 0, 0) 100%)",
        }}
        >
            <div id="navbar" className="container flex text-blue-200 w-screen pt-2 pb-4 pr-12 pl-3 items-center justify-between fixed text-white z-50 ">
                <div className="font-medium mx-5 text-2xl mb-1">
                    MoviS
                </div>
                <div className="flex gap-4">
                    <a href="#">HOME</a>
                    <a href="#">MOVIES</a>
                    <a href="#">TV</a>
                    <a href="#">SEARCH</a>
                </div>
            </div>
        </div>
    )    
}

export default Navbar