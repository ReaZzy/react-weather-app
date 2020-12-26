
export const getWeatherSelector = (state:any) =>{
    return state.weather.cityInfo
}
export const getIconSelector = (state:any) =>{
    return state.weather.icon
}
export const isErrorSelector = (state:any) =>{
    return state.weather.notFound
}
export const getCurrentCity = (state:any) =>{
    return state.weather.currentCity
}
export const getLoading = (state:any) =>{
    return state.weather.isLoading
}