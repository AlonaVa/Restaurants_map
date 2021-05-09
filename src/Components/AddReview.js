import React, {useState} from 'react';
import {Row, Form, FormGroup, Label, Input, Button} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Toast, ToastHeader, ToastBody} from 'reactstrap';

export default function AddReview({chosenRestaurant, restaurantsAsArray, setRestaurantsAsArray, setIsAddingReview}) {
    const initialInputState2 = {newComment: "", newReview: ""};
    const [eachEntry2, setEachEntry] = useState(initialInputState2);
    const {newComment, newReview} = eachEntry2;
    const handleInputChange = e => {
        setEachEntry({...eachEntry2, [e.target.name]: e.target.value});
    };
    const handleFinalSubmit = e => {
        let newRating = {stars: newReview, comment: newComment};
        let newArray = restaurantsAsArray;
        newArray.find(restaurant => restaurant.ID === chosenRestaurant.ID).ratings.push(newRating);
        setRestaurantsAsArray(newArray);
        console.log("chosenRestArate:" + chosenRestaurant.arating);
        console.log(restaurantsAsArray);
        setIsAddingReview(false);
    };
    return (      
             <Toast Close={()=>setIsAddingReview(false)} className="toast-add-review">
                <ToastHeader className="toast-add-review">
                        <h4>Your review:</h4>
                </ToastHeader>    
               <ToastBody>
                <Row >
                    <Form className="toast-add-review">
                        <FormGroup >
                            <Label for="newComment">Comment
                            </Label>
                            <br></br>
                            <Input
                                    name="newComment"
                                    placeholder="your comment"
                                    onChange={handleInputChange}
                                    value={newComment}   
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newReview">Review
                            </Label>
                            <br></br>
                            <Input
                                    name="newReview"
                                    placeholder="number of stars (1-5)"
                                    onChange={handleInputChange}
                                    value={newReview}
                                    className="toast-add-reviews"
                            />
                        </FormGroup>
                        <Button onClick={handleFinalSubmit}>
                            Submit</Button>
                        <Button onClick={()=>setIsAddingReview(false)}>
                        Close</Button>
                    </Form>
                </Row>
                </ToastBody>
                </Toast>

 
 
    );
}