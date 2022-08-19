import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import Gallery from './Components/Gallery';
import Navbar from './Components/Navbar';



function App() {
  return (
    <>
    
    <Router>
    <Navbar/>
    <Switch>
          <Route exact path="/">
          <Home />
          </Route>
          <Route exact path="/gallery">
           <Gallery />
          </Route>
    </Switch>
    </Router>
    
    </>
  );
}

export default App;
