import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import {Toast, ToastHeader, ToastBody} from 'reactstrap';


export default function AddRestaurant({restaurantsAsArray, setRestaurantsAsArray, setIsAddingRestaurant, newRestaurantLat, newRestaurantLng, toggle}) {
    const initialInputState = {
        newRestaurantName: "",
        newRestaurantAddress: "",
        newRestaurantComment: "",
        newRestaurantReview: ""
    };
    const [eachEntry, setEachEntry] = useState(initialInputState);
    const {newRestaurantName, newRestaurantAddress, newRestaurantComment, newRestaurantReview} = eachEntry;
    const handleInputChange = e => {
        setEachEntry({...eachEntry, [e.target.name]: e.target.value});
    };
    const handleFinalSubmit = e => {
        let newRestaurantID = restaurantsAsArray.length;
        let newRestaurant = {
            "restaurantName": newRestaurantName,
            "ID": newRestaurantID,
            "address": newRestaurantAddress,
            "lat": newRestaurantLat,
            "long": newRestaurantLng,
            "ratings": [
                {
                    "stars": newRestaurantReview,
                    "comment": newRestaurantComment
                }
            ]
        };
        let newArray = restaurantsAsArray;
        newArray.push(newRestaurant);
        setRestaurantsAsArray(newArray);
        setIsAddingRestaurant(false);
        console.log(restaurantsAsArray);
    };
    return (
        <Toast onClose={()=>setIsAddingRestaurant(false)}>
            <div>
            <ToastHeader>
                        <h4>Add new restaurant:</h4>
            </ToastHeader>
            <ToastBody>
                    <Form>
                        <FormGroup>
                            <Label for="newRestaurantName">Name
                            </Label>
                            <br></br>
                            <Input
                                    name="newRestaurantName"
                                    placeholder="type name"
                                    onChange={handleInputChange}
                                    value={newRestaurantName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="newRestaurantAddress">Address
                            </Label>
                            <br></br>
                            <Input
                                    name="newRestaurantAddress"
                                    placeholder="type address"
                                    onChange={handleInputChange}
                                    value={newRestaurantAddress}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newRestaurantComment">Comment
                            </Label>
                            <br></br>
                            <Input
                                    name="newRestaurantComment"
                                    placeholder="your comment"
                                    onChange={handleInputChange}
                                    value={newRestaurantComment}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newRestaurantReview">Review
                            </Label>
                            <br></br>
                            <Input
                                    name="newRestaurantReview"
                                    placeholder="number of stars (1-5)"
                                    onChange={handleInputChange}
                                    value={newRestaurantReview}
                            />
                        </FormGroup>
                        Please, choose the location of the restaurant by double click on the map
                        <br></br>
                        <br></br>
                        <Button
                            onClick={handleFinalSubmit}>
                            Submit</Button>
                            <Button
                            onClick={()=>setIsAddingRestaurant(false)}>
                            Close</Button>
                    </Form>
                 </ToastBody>
            </div>           
            </Toast>
    );
}