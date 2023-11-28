import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import Movies from "./component/Movies.jsx";

function App() {
  return (
    <div className="App" style={{background: "rgb(2, 2, 2)"}}>
        <Navbar/>
        <Home/>
        <Movies/>
        <div style={{height: "1000px"}}>

        </div>
    </div>
  );
}

export default App;
