import React, {useState} from "react"
import {useSelector} from "react-redux";
import {getCurrentCity, getIconSelector, getLoading, getWeatherSelector, isErrorSelector} from "../reducers/weatherSelector";
import {Col, Row} from "react-bootstrap";
import {Preloader} from "../media/Preloader";
import {IoCloseCircle} from "react-icons/io5";
import { useAlert } from 'react-alert'

export const WeatherCard:React.FC<{}> = React.memo(() => {
    const alert = useAlert()
    const cityInfo = useSelector(getWeatherSelector)
    const isError = useSelector(isErrorSelector)
    const icon = useSelector(getIconSelector)
    const currentCity = useSelector(getCurrentCity)
    const isLoading = useSelector(getLoading)

    let [isC, setIsC] = useState(true)
    const changeTemp = () => {
        setIsC(!isC)
        alert.success(`Temperature scale successfully changed to ${isC ? "°F":"°C"}`)
    }
    if(isLoading){
        return <Preloader/>
    }
    return (
        <>
            {currentCity && isError ?
                <>
                <h2 >City "{currentCity}" is undefined</h2><br/>
                    <IoCloseCircle size={"80px"} color={"#ff3b3b"}/>
                </>
                :
            Object.keys(cityInfo).length === 0 && cityInfo.constructor === Object ?"" :
                <Row md={12} style = {{
                    marginTop:"10px",
                    margin:"auto",
                    width:"100%"
                }}>
                    <Col></Col>
                    <Col className={"unselectable"} md={8} xl={5} style = {{
                        borderRadius:"20px",
                        marginTop:"10px",
                        border:"2px solid black",
                        cursor:"pointer",

                    }} onClick={changeTemp}
                    >
                        <img src={icon} alt={"weather"}/>
                        <h1>{currentCity}</h1>
                        <h3>{cityInfo.weather[0].description.charAt(0).toUpperCase() + cityInfo.weather[0].description.slice(1)}</h3>
                        <h3>Temperature: {isC?(cityInfo.main.temp -273.15).toFixed(1):(((cityInfo.main.temp -273.15) * (9/5)) + 32).toFixed(1)}{isC?" °C":" °F"}</h3>
                        <h3>Feels like: {isC?(cityInfo.main.feels_like -273.15).toFixed(1) :(((cityInfo.main.feels_like -273.15) * (9/5)) + 32).toFixed(1)}{isC?" °C":" °F"}</h3>
                        <h3>Pressure: {(cityInfo.main.pressure).toFixed(0)}mb</h3>
                        <h3>Humidity: {(cityInfo.main.humidity).toFixed(0)}%</h3>
                        <h3>Clouds: {(cityInfo.clouds.all).toFixed(0)}</h3>
                        <h3>Wind speed: {(cityInfo.wind.speed).toFixed(0)}km/h</h3>

                    </Col>
                    <Col></Col>
                </Row>

            }
        </>
    )
})
