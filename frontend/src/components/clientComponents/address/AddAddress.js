import React from 'react';
import { Button , Col, Container, Form } from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';
import {Redirect} from 'react-router';

class AddAddress extends React.Component {

    constructor(){
        super();
        this.state = {
            fullName: '',
            streetAddressLine1: '',
            streetAddressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            country:'',
            phoneNumber: ''
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };
    
    onSubmitHandler = e =>{
        if(this.state.fullName==='' || this.state.streetAddressLine1==='' || this.state.streetAddressLine2==='' || 
        this.state.city==='' || this.state.state===''|| this.state.country==='' || this.state.phoneNumber===''){
            alert("Please fill all the form details before submitting")
        } else{
            const id = localStorage.getItem("id")
            
            const data = {
                name: this.state.fullName,
                address1: this.state.streetAddressLine1,
                address2: this.state.streetAddressLine2,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipCode,
                country: this.state.country,
                phoneNumber: this.state.phoneNumber            
            }
            console.log(data)
            axios.post(exportData.backenedURL + 'write/customer/profile/address/' + id, JSON.stringify(data), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    this.setState({redirect: <Redirect to={{pathname: '/user/address/manageAddresses/'}} />})
                } 
            })
        }
        
        
    }

    render(){
        return(
          <div>
            <Header />
            {this.state.redirect}
            <Container>
                <br/>
                <h2>Add a new address:</h2>
                <br/>
                {/* <Form onSubmit={this.onSubmitHandler}>                     */}
                    <Form.Group>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control id="fullName" 
                                      value={this.state.fullName} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Full Name"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Street Address Line 1:</Form.Label>
                        <Form.Control id="streetAddressLine1" 
                                      value={this.state.streetAddressLine1} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Street Address Line 1"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Street Address Line 2:</Form.Label>
                        <Form.Control id="streetAddressLine2" 
                                      value={this.state.streetAddressLine2} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Street Address Line 2" 
                                      required/>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City:</Form.Label>
                            <Form.Control id="city" 
                                          value={this.state.city} 
                                          onChange={this.onChangeHandler} 
                                          placeholder="City"
                                          required/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>State:</Form.Label>
                            <Form.Control id="state" 
                                          value={this.state.state} 
                                          onChange={this.onChangeHandler} 
                                          placeholder="State"
                                          required/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Zip Code:</Form.Label>
                            <Form.Control id="zipCode" 
                                          type="number" value={this.state.zipCode} 
                                          onChange={this.onChangeHandler} 
                                          placeholder="Zip Code"
                                          required/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Country:</Form.Label>
                        <Form.Control id="country" 
                                      value={this.state.country} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Country" 
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control id="phoneNumber" 
                                      type="number" 
                                      value={this.state.phoneNumber} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Phone Number" 
                                      required/>
                    </Form.Group>
                    <br/>
                    <Button variant="warning" onClick={this.onSubmitHandler}>
                        Add Address
                    </Button>
                {/* </Form> */}
            </Container>                
          </div>
        );
    }
}

export default AddAddress;