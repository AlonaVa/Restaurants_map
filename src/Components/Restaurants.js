import { Button} from "reactstrap";
import {v4 as uuidv4} from 'uuid';

let starsSum = 0;

export default function Restaurants({
    bbox, minRate, maxRate, restaurantsAsArray,
     isAddingRestaurant, setIsAddingRestaurant,
    }) {

    restaurantsAsArray.map((restaurant) => {
              
        for (let i = 0; i < restaurant.ratings.length; i++) {
            restaurant.aname = restaurant.restaurantName;
            starsSum += restaurant.ratings[i].stars;
        }
        restaurant.arating = starsSum / restaurant.ratings.length;
        starsSum = 0;
    })
    return (
        <div>
            <h1>Restaurants:</h1>
            <ul>{
                bbox &&
                restaurantsAsArray.map((restaurant) => {
                if (bbox.contains([restaurant.lat, restaurant.long])
                && (maxRate >= restaurant.arating) && (restaurant.arating >= minRate)
                ) {
                return (
                    <li key={uuidv4()}><span style={{fontWeight: "bold"}}>
                    {restaurant.aname}
                    </span>,
                    rating: {restaurant.arating}
                    </li>);
                    } else return (null);
                })}
            </ul>
                <div>
                    {isAddingRestaurant
                    ? // when true
                    null
                    : // when false
                    <Button
                        onClick={() => setIsAddingRestaurant(true)}
                    >
                    Add restaurant
                    </Button>
                    }
                </div>
        </div>
    )
}
  

