import React, {useState, useEffect} from 'react';
import "../App.css";
import {Marker, Popup, useMap} from "react-leaflet";
import {Icon} from "leaflet";
import markerIcon from "../images/myLocation.webp";

export default function LocationMarker({bbox, setBbox}) {
    const [position, setPosition] = useState(null);
    const map = useMap();
    const myLocation = new Icon({
        iconUrl: markerIcon,
        iconSize: [25, 25]
    });
    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            setBbox(e.bounds);
        });
    }, [map, setBbox]);
    if (!position || !bbox) return null;
    return (
            <Marker position={position} icon={myLocation}>
                <Popup>
                    You are here. <br/>
                </Popup>
            </Marker>
    );
}
