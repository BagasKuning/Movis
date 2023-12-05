import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Main from "./component/Main";
import MovieDesc from "./component/MovieDesc.jsx";

function App() {
  return (
    <div className="App" style={{background: "rgb(2, 2, 2)"}}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/detail/:id" element={<MovieDesc/>}></Route>
        </Routes>    
      </BrowserRouter>
    </div>
  );
}

export default App;
