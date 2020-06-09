import React from 'react';
import {Redirect} from 'react-router';
import { Button , Col, Container, Form } from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';

class EditAddress extends React.Component {

    constructor(){
        super();
        this.state = {
            addressId:'',
            fullName: '',
            streetAddressLine1: '',
            streetAddressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phoneNumber: '',
            redirect: ''
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
            const id = this.state.addressId
            
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
            axios.put(exportData.backenedURL + 'write/customer/profile/address/' + id, JSON.stringify(data), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    this.setState({redirect: <Redirect to={{pathname: '/user/address/manageAddresses/'}} />})
                } 
            })
        }
    }

    componentDidMount() {
        var addressId = this.props.location.state.addressCard.id
        var name = this.props.location.state.addressCard.name
        var address1 = this.props.location.state.addressCard.address1;
        var address2 = this.props.location.state.addressCard.address2;
        var city = this.props.location.state.addressCard.city;
        var state = this.props.location.state.addressCard.state;
        var country = this.props.location.state.addressCard.country;
        var zipcode = this.props.location.state.addressCard.zipcode;
        var phoneNumber = this.props.location.state.addressCard.phoneNumber;
        this.setState({
            addressId: addressId,
            fullName: name,
            streetAddressLine1: address1,
            streetAddressLine2: address2,
            city: city,
            state: state,
            zipCode: zipcode,
            country: country,
            phoneNumber: phoneNumber, 
        })
    }    

    onCancelClick = e => {
        e.preventDefault();
        this.setState({ redirect: <Redirect to='/user/address/manageAddresses/' /> });
    }

    render(){
        return(
          <div>
            <Header />
            <Container>
                {this.state.redirect}
                <br/>
                <h2>Edit address:</h2>
                <br/>
                <Form>                    
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
                        Save Changes
                    </Button>
                    &nbsp; &nbsp;
                    <Button variant="light" onClick={this.onCancelClick}>
                        Cancel
                    </Button>
                </Form>
            </Container>                
          </div>
        );
    }
}

export default EditAddress;