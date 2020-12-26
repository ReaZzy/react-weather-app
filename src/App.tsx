import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Search} from "./Search/Search";
import {WeatherCard} from "./WeatherCard/WeatherCard";
import {getWeatherByCity, getWeatherByGeo, setLanguage} from "./reducers/weatherReducer";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {getCurrentCity, getCurrentLanguage} from "./reducers/weatherSelector";

function App() {
    let dispatch = useDispatch()
    let currentLanguage = useSelector(getCurrentLanguage)
    let currentCity = useSelector(getCurrentCity)
    useEffect(()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                dispatch(getWeatherByGeo(position.coords.latitude, position.coords.longitude, currentLanguage))
            });
        }
    }, [])// eslint-disable-line
    useEffect(()=>{
        dispatch(getWeatherByCity(currentCity, currentLanguage))
    },[currentLanguage])// eslint-disable-line

  return (
      <BrowserRouter>
          <h1 className={"unselectable"} style={{textAlign:"center"}}> Weather App</h1>
          <Search/>
          {currentLanguage === "en"
              ? <><h3>Current language english</h3> <Button style={{marginTop:"10px"}} className={"btn btn-success"} onClick={()=>dispatch(setLanguage("ru"))}>Change to ru</Button></>
              : <><h3>Текущий язык руский</h3> <Button style={{marginTop:"10px"}} className={"btn btn-success"} onClick={()=>dispatch(setLanguage("en"))}>Change to en</Button></>
          }
          <WeatherCard/>
      </BrowserRouter>
  );
}

export default App;
