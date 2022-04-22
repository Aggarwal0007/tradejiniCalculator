import React from "react";
import { useLoader } from "state/AppConfigReducer";
import { useSelector } from "react-redux";

export const LoaderComponent = () => {
    return (
        <div className="loading-div">
            <div className="stage">
                <div className="dot-pulse"></div>
            </div>
        </div> 
    ); 
}; 

const LoaderBackdrop = () => {

    const loaderState = useSelector(useLoader);
    console.log("loaderState :", loaderState);
    return (
        <div className={`loader-container ${ loaderState ? "show" : "hide"}`}>
            <LoaderComponent />
        </div>
    );
};


export default LoaderBackdrop;
