import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.js";
import MapContainer from "../components/Map.js";

export default function MapPage() {    
    return (
        <div>
            <Navbar page="Map"/>
            <div id="map_canvas">
                <MapContainer />
            </div>
        </div>
    );
}
