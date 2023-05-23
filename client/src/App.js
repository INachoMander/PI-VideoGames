import LandingPage from "./Components/landingPage/landing"
import Home from "./Components/homePage/home"
import Detail from "./Components/Detail/Detail"
import Create from "./Components/Create/Create"
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import axios from "axios"
axios.defaults.baseURL= 'http://localhost:3001'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" render={()=> <LandingPage />} />
        <Route exact path="/home" render={()=> <Home/>}/>
        <Route exact path="/detail/:id" render={()=> <Detail/>}/>
        <Route exact path="/create" render={()=> <Create/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
