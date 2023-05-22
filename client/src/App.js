import axios from "axios"
import LandingPage from "./Components/landingPage/landing"
import Home from "./Components/homePage/home"
import Detail from "./Components/Detail/Detail"
import Create from "./Components/Create/Create"
import Error404 from "./Components/Error404/Error404"
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
axios.defaults.baseURL= 'http://localhost:3001'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path={'*'} element={<Error404/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
