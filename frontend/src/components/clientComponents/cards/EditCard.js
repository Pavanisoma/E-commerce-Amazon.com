import React from 'react';
import {Redirect} from 'react-router';
import { Button , Container, Form } from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';

class EditCard extends React.Component {

    constructor(){
        super();
        this.state = {
            name: '',
            cardNumber: '',
            expirationDate: '',
            CVV: '',
            redirect: ''
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
            const id = this.state.paymentCardId
            // const id = 1
            const data = {
                name: this.state.name,
                cardNumber: this.state.cardNumber,
                expirationDate: this.state.expirationDate,
                cvv: this.state.CVV,            
            }
            console.log(data)
            axios.put(exportData.backenedURL + 'write/customer/profile/cards/' + id, JSON.stringify(data), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    this.setState({redirect: <Redirect to={{pathname: '/user/cards/manageCards/'}} />})
                } 
            })
        }
    }

    onCancelClick = e => {
        e.preventDefault();
        this.setState({ redirect: <Redirect to='/user/cards/manageCards/' /> });
    }

    componentDidMount() {
        var paymentCardId = this.props.location.state.paymentCard.id
        var name = this.props.location.state.paymentCard.name
        var cardNumber = this.props.location.state.paymentCard.cardNumber;
        var expirationDate = this.props.location.state.paymentCard.expirationDate;
        var CVV = this.props.location.state.paymentCard.cvv;
        this.setState({
            paymentCardId: paymentCardId,
            name: name,
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            CVV: CVV, 
        })
    } 

    render(){
        return(
          <div>
            <Header />
            <Container>
                {this.state.redirect}
                <br/>
                <h2>Edit card:</h2>
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

export default EditCard;