import {getWeatherByCityAPI} from "../api/dal";

let initialState = {
    cityInfo:{},
    icon: "",
    notFound:false,
    currentCity: "",
    isLoading:false
}

type  ActionsType = getWeatherType|getIconType|setErrorType|setCurrentCityType|setLoadingType
export const weatherReducer = (state=initialState, action:ActionsType) => {
    switch (action.type) {
        case "GET_WEATHER":
            return {...state, cityInfo: action.city}
        case "GET_ICON":
            return {...state, icon: action.icon}
        case "SET_ERROR":
            return {...state, notFound:action.notFound}
        case "SET_CURRENT_CITY":
            return {...state, currentCity: action.currentCity}
        case "SET_LOADING":
            return {...state, isLoading: action.boolean}
        default:
            return initialState
    }
}
type setLoadingType = {
    type: "SET_LOADING",
    boolean: boolean
}
type getWeatherType = {
    type: "GET_WEATHER"
    city: any
}
type getIconType = {
    type: "GET_ICON",
    icon:string
}
type setErrorType = {
    type: "SET_ERROR",
    notFound: string
}
type setCurrentCityType = {
    type: "SET_CURRENT_CITY"
    currentCity:string
}
const getWeather = (city:any) => ({type:"GET_WEATHER", city})
const getIcon = (icon:string) => ({type:"GET_ICON", icon})
const setNotFoundError = (notFound:boolean) => ({type:"SET_ERROR", notFound})
const setLoading = (boolean:boolean) => ({type: "SET_LOADING", boolean})
export const setCurrentCity = (currentCity:string) => ({type:"SET_CURRENT_CITY", currentCity})

export const getWeatherByCity = (city:any) => (dispatch:any) => {
    dispatch(setLoading(true))
    getWeatherByCityAPI(city).then(response=>{
        dispatch(getWeather(response))
        dispatch(getIcon(`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`))
        dispatch(setNotFoundError(false))
        dispatch(setLoading(false))
    }, ()=>{
        dispatch(setLoading(false))
        dispatch(setNotFoundError(true))})


}