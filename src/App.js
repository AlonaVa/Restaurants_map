import React, {useState,  useEffect} from 'react';
import restaurantsInfo from "./RestaurantsList.json";
import "./App.css";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import Restaurants from "./Components/Restaurants.js";
import LocationMarker from "./Components/LocationMarker";
import {Filters} from "./Components/Filters.js";
import SearchLocation from "./Components/SearchLocation.js";
import {Icon} from "leaflet";
import {Row, Col} from "react-bootstrap";
import RestaurantInfo from './Components/RestaurantInfo';
import markerIcon from "./images/restaurant.png";

let comments = [];
let aname;
let imgRequest="";
let commentsForRestaurant;
const defaultZoom = 15;

const MapEvents = ({setBbox}) => {
    const setBounds = () => setBbox(map.getBounds());
    const map = useMapEvents({
        moveend: setBounds
    });
    return null;
};
const restaurantMarker = new Icon({
    iconUrl: markerIcon,
    iconSize: [25, 25]
});
export default function App() {
    const [map, setMap] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
    const [restaurantsAsArray, setRestaurantsAsArray] = useState(Object.keys(restaurantsInfo).map((pid) => restaurantsInfo[pid]), );
    const [chosenRestaurant, setChosenRestaurant] = useState(null);
    const [bbox, setBbox] = useState(null);
    const [minRate, setMinRate] = useState(1);
    const [maxRate, setMaxRate] = useState(5);
    const [newRestaurantLat, setNewRestaurantLat] = useState(null);
    const [newRestaurantLng, setNewRestaurantLng] = useState(null);
    const [isAddingReview, setIsAddingReview] = useState(false);
    const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);

    useEffect(() => {
        if (map && coordinates.lat && coordinates.lng) map.setView(coordinates);
      }, [map, coordinates]);

    const NewRastaurantPosition = () => {
        const map = useMapEvents({
            click(e) {
                setNewRestaurantLat(e.latlng.lat);
                setNewRestaurantLng(e.latlng.lng);
                console.log(newRestaurantLat);
            },
        })
        return (
                null
        )
    }

    return (
        <div style={{backgroundColor: "#e3ffeb"}}>
        <div  className="cont" >
        <Row>
        <Col xs={12} md={5} style={{padding:"20px"}}>        
            <MapContainer
                center={[49.1951, 16.6068]}
                zoom={defaultZoom}
                scrollWheelZoom={false}
                whenCreated={(map) => { setBbox(map.getBounds()); setMap(map) }}
            >
            <NewRastaurantPosition/>
            <MapEvents setBbox={setBbox}/>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker bbox={bbox} setBbox={setBbox} coordinates={coordinates}/>
                {restaurantsAsArray.map(restaurant => (
            <Marker
                key={restaurant.ID}
                position={[
                restaurant.lat, restaurant.long
                ]}
                icon={restaurantMarker}
                eventHandlers={{
                    click: () => {
                        setChosenRestaurant(restaurant);
                        aname = restaurant.restaurantName;
                        imgRequest="https://maps.googleapis.com/maps/api/streetview?location="+
                        restaurant.lat+","+restaurant.long+
                        "&size=120x120&key=AIzaSyCWua-R7xTJQCizx-9TXsoE8DHoY5IvcRc";
                        commentsForRestaurant = "Comments for " + aname + ":";
                        comments = [];
                        for (let i = 0; i < restaurant.ratings.length; i++) {
                            comments.push(restaurant.ratings[i].comment);
                        }                                              
                        setChosenRestaurant(null);
                        setChosenRestaurant(restaurant);                                               
                    },}
                }
            />
                ))}
                {chosenRestaurant && (
                <Popup
                    position={[
                        chosenRestaurant.lat,
                        chosenRestaurant.long
                    ]}
                    onClose={() => {
                        setChosenRestaurant(null);
                    }}
                >
                <div>
                    <h2>{chosenRestaurant.restaurantName}</h2>
                     <p>{chosenRestaurant.address}</p>
                </div>
                </Popup>
                )}
            </MapContainer>
            {/* </div> */}
            </Col>
            <Col xs={12} md={4} lg={4} style={{padding:"20px"}}>
            <center><SearchLocation coordinates={coordinates} setCoordinates={setCoordinates} 
                                    setRestaurantsAsArray={setRestaurantsAsArray}
                                    restaurantsAsArray={restaurantsAsArray}
            /></center>
            <Filters
                setMinRate={setMinRate}
                setMaxRate={setMaxRate}
            />
            <RestaurantInfo
               isAddingReview = {isAddingReview} setIsAddingReview = {setIsAddingReview}
                isAddingRestaurant = {isAddingRestaurant} setIsAddingRestaurant = {setIsAddingRestaurant}
                bbox={bbox} chosenRestaurant={chosenRestaurant} 
                setRestaurantsAsArray={setRestaurantsAsArray}
                restaurantsAsArray={restaurantsAsArray}
                newRestaurantLat={newRestaurantLat} newRestaurantLng={newRestaurantLng}  
            />
            </Col>
            <Col xs={12} md={3} lg={3} style={{backgroundColor:"#d0f5da", padding:"20px"}}>
            <Restaurants bbox={bbox} minRate={minRate}
                maxRate={maxRate} restaurantsAsArray={restaurantsAsArray}
                isAddingRestaurant = {isAddingRestaurant} setIsAddingRestaurant = {setIsAddingRestaurant}
            />
            </Col>
         </Row>
        </div>
        </div>
    );
}
export {commentsForRestaurant, comments, Marker, MapContainer, imgRequest};






