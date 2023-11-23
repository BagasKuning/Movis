/* eslint-disable jsx-a11y/anchor-is-valid */
const Navbar = () => {
    return (
        <div className="flex gap-2 py-2 items-center fixed">
            <div className="font-medium mx-5 text-2xl mb-1">
                MoviS
            </div>
            <a href="#">HOME</a>
            <a href="#">MOVIES</a>
            <a href="#">TV</a>
            <a href="#">SEARCH</a>
        </div>
    )    
}

export default Navbar