import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Search} from "./Search/Search";
import {WeatherCard} from "./WeatherCard/WeatherCard";
import {getWeatherByGeo} from "./reducers/weatherReducer";
import {useDispatch} from "react-redux";

function App() {
    let dispatch = useDispatch()
    useEffect(()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                dispatch(getWeatherByGeo(position.coords.latitude, position.coords.longitude))
            });
        } else {
            console.log("Not Available");
        }
    }, [])

  return (
      <BrowserRouter>
          <h1 className={"unselectable"} style={{textAlign:"center"}}> Weather App</h1>
          <Search/>
          <WeatherCard/>
      </BrowserRouter>
  );
}

export default App;
