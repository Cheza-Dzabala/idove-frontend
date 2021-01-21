import Loader from "../shared/Loader";
import React from "react";

export const ProtectedRoutesFallback = () => {
    return <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'width': '100vw', 'height': '100vh'}}>
        <div  className="heading-title">
            <Loader />
            <h6>Preparing the application</h6>
        </div>

    </div>
}