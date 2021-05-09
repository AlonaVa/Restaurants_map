import React, {useState} from 'react';
import {Row, Form, FormGroup} from "react-bootstrap";
import {Input, Label, Button} from "reactstrap";

export const Filters = props => {
    const {setMinRate, setMaxRate} = props;
    const initialInputState = {minRating: "", maxRating: ""};
    const [eachEntry, setEachEntry] = useState(initialInputState);
    const {minRating, maxRating} = eachEntry;
    const handleInputChange = e => {
        setEachEntry({...eachEntry, [e.target.name]: e.target.value});
    };

    const handleFinalSubmit = e => {
        setMinRate(minRating);
        setMaxRate(maxRating);
    };
    return (
            <div className="filter">
                <h6 style={{textAlign:"left", padding:"0px", margin:"0px"}}>
                    You can choose min and max average review for restaurants (from 1 to 5 stars)
                </h6>
                <Row >
                    <Form style={{textAlign:"center"}}>
                        <FormGroup>
                            <Label for="minRating">
                                Choose min average review for restaurants
                                &ensp;
                            </Label>
                            <Input name="minRating"
                                   placeholder="1"
                                   onChange={handleInputChange}
                                   value={minRating}>
                            </Input>
                        </FormGroup>
                    </Form>
                </Row>
                <Row>
                    <Form>
                        <FormGroup>
                            <Label for="maxRating">
                                Choose max average review for restaurants
                                &ensp;
                            </Label>
                            <Input name="maxRating"
                                   placeholder="5"
                                   onChange={handleInputChange}
                                   value={maxRating}>
                            </Input>
                        </FormGroup>
                        <Button onClick={handleFinalSubmit}>
                            Filter
                        </Button>
                    </Form>
                </Row>
            </div>
    );
}
