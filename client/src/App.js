import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home"
import About from "./views/About/About";
import Create from "./views/Create/Create";
import Detail from "./views/Detail/Detail";

function App() {
  return (  
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" render={()=> <Landing />} />
        <Route exact path="/about" render={()=> <About/>}/>
        <Route exact path="/home" render={()=> <Home/>}/>
        <Route exact path="/create" render={()=> <Create/>}/>
        <Route exact path="/detail/:detailId" render={()=> <Detail/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
