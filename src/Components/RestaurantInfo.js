import {commentsForRestaurant, comments, imgRequest} from "../App.js";
import AddReview from "./AddReview.js";
import AddRestaurant from "./AddRestaurant";
import { Col, Row} from "react-bootstrap";
import {Button} from "reactstrap";
import {v4 as uuidv4} from 'uuid';
import {Card} from 'reactstrap';

export default function RestaurantInfo({
    bbox, chosenRestaurant, restaurantsAsArray, setRestaurantsAsArray,
    newRestaurantLat, newRestaurantLng,
    isAddingRestaurant, setIsAddingRestaurant,
    isAddingReview, setIsAddingReview
    }) {

    return (
        <div>                  
            <div>
                {isAddingRestaurant
                ? // when true
                    <AddRestaurant
                        restaurantsAsArray={restaurantsAsArray}
                        setRestaurantsAsArray={setRestaurantsAsArray}
                        setIsAddingRestaurant={setIsAddingRestaurant}
                        newRestaurantLat={newRestaurantLat}
                        newRestaurantLng={newRestaurantLng}
                        close={() => setIsAddingRestaurant(false)}
                    />
                : // when false
                null
                }
            </div>
                    {chosenRestaurant && (<Card className="restaurant-card">
                    <div>
                    <Row>
                        <Col xs={6} md={6} lg={6} style={{padding:"20px"}}>
                        <h5>{commentsForRestaurant}</h5>
                        <ul>{
                            comments.map((comments) =>
                                <li key={uuidv4()}><span>{comments}</span></li>)}
                        </ul>
                        </Col>
                        <Col xs={6} md={6} lg={6} 
                        // style={{padding:"20px"}}
                        >
                        <p >                    
                        <img alt="" src= {imgRequest} className="photo"/>
                        </p>
                        </Col>
                        </Row>
                    </div>
                   
                   <Row className="row justify-content-center"> 
                        {isAddingReview
                            ? // when true
                            <AddReview 
                                chosenRestaurant={chosenRestaurant}
                                restaurantsAsArray={restaurantsAsArray}
                                setRestaurantsAsArray={setRestaurantsAsArray}
                                setIsAddingReview={setIsAddingReview}
                                close={() => setIsAddingReview(false)}
                            />                          
                            : // when false
                            <div >
                            <Button className="btn btn-primary" 
                                onClick={() => setIsAddingReview(true)}
                            >
                                Add review
                            </Button>
                            </div>                           
                        }                  
                        </Row> 
                    </Card>
                )}
            </div>
    )
}
  

