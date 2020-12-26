import axios from "axios";
const APIKey = "8ebcc64149468ed1c9c0aab5c148ecac"

const instance = axios.create({
    baseURL:"https://api.openweathermap.org/data/2.5/",
})

export const getWeatherByCityAPI = (city) =>{
    return instance.get(`weather?q=${city}&appid=${APIKey}&lang=ru`).then(res=>res.data)
}