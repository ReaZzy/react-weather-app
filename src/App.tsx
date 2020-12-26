import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Search} from "./Search/Search";
import {WeatherCard} from "./WeatherCard/WeatherCard";

function App() {
  return (
      <BrowserRouter>
          <h1 className={"unselectable"} style={{textAlign:"center"}}> Weather App</h1>
          <Search/>
          <WeatherCard/>
      </BrowserRouter>
  );
}

export default App;
