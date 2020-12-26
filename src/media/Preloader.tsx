import React from "react";
import PreloaderGif from "./preloader.gif"
export const Preloader = () => {
    return(
        <div style={
            {
                marginLeft:"50%",
                marginTop:"4%"
            }
        }>
        <img src={PreloaderGif} alt={"Loading"}/>
        </div>
    )
}