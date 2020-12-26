import axios from "axios";
const APIKey = "8ebcc64149468ed1c9c0aab5c148ecac"

const instance = axios.create({
    baseURL:"https://api.openweathermap.org/data/2.5/",
})

export const getWeatherByCityAPI = (city, language="en") =>{
    return instance.get(`weather?q=${city}&appid=${APIKey}&lang=${language}`).then(res=>res.data)
}
export const getWeatherGeoAPI = (lat, lon, language="en") =>{
    return instance.get(`weather?lat=${lon}&lon=${lat}&appid=${APIKey}&lang=${language}`).then(res=>res.data)
}

