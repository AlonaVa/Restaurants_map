import React,{useState, useEffect} from "react";
import PlacesAutocomplete,  {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

let service;
let latLng =null;

export default function SearchLocation({setCoordinates, restaurantsAsArray, setRestaurantsAsArray,}) {
  const [address, setAddress] = useState("");
  const google = window.google;
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(latLng);
  }

  useEffect(() => {
    if (latLng!=null) {
      var request = {
        location: latLng,
        radius: '1000',
        type: ['restaurant']
      };
      service = new google.maps.places.PlacesService(document.createElement('div'));
      service.nearbySearch(request, callback);
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              let newRestaurant = {
                "restaurantName": results[i].name,
                "ID": results[i].place_id,
                "address": results[i].vicinity,
                "lat": results[i].geometry.location.lat(),
                "long": results[i].geometry.location.lng(),
                "ratings": [
                    {
                        "stars": results[i].rating,
                        "comment": "No comments yet"
                    }
                ]
            };
            let newArray = restaurantsAsArray;
            newArray.push(newRestaurant);
            setRestaurantsAsArray(newArray);           
            }
            }}}
    // console.log(restaurantsAsArray);
  }, [latLng]);

  return (
    <div className="searchLocation" style={{margin: "300 px"}}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#8fffaf" : "#fff"
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
