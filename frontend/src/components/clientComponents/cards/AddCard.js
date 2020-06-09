import React from 'react';
import { Button , Container, Form } from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';
import {Redirect} from 'react-router';

class AddCard extends React.Component {

    constructor(){
        super();
        this.state = {
            name: '',
            cardNumber: '',
            expirationDate: '',
            CVV: ''
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };
    
    onSubmitHandler = e =>{
        if(this.state.name==='' || this.state.cardNumber==='' || this.state.expirationDate==='' || this.state.CVV===''){
            alert("Please fill all the form details before submitting")
        } else{
            const id = localStorage.getItem("id")
            // const id = 1
            const data = {
                name: this.state.name,
                cardNumber: this.state.cardNumber,
                expirationDate: this.state.expirationDate,
                cvv: this.state.CVV,            
            }
            console.log(data)
            axios.post(exportData.backenedURL + 'write/customer/profile/cards/' + id, JSON.stringify(data), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    this.setState({redirect: <Redirect to={{pathname: '/user/cards/manageCards/'}} />})
                } 
            })
        }

    }

    render(){
        return(
          <div>
            <Header />
            <Container>
                {this.state.redirect}
                <br/>
                <h2>Add a new card:</h2>
                <br/>
                <Form onSubmit={this.onSubmitHandler}>                    
                    <Form.Group>
                        <Form.Label>Name on Card:</Form.Label>
                        <Form.Control id="name" 
                                      value={this.state.name} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Name on Card"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Card Number:</Form.Label>
                        <Form.Control id="cardNumber" type="number"
                                      value={this.state.cardNumber} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Card Number"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Expiration Date:</Form.Label>
                        <Form.Control id="expirationDate" 
                                      value={this.state.expirationDate} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Expiration Date" 
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Security Code or CVV:</Form.Label>
                        <Form.Control id="CVV" 
                                      type="password" 
                                      value={this.state.CVV} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Security Code or CVV" 
                                      required/>
                    </Form.Group>
                    <br/>
                    <Button variant="warning" onClick={this.onSubmitHandler}>
                        Add Card
                    </Button>
                </Form>
            </Container>                
          </div>
        );
    }
}

export default AddCard;