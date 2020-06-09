import React from 'react';
import { Row, Button , Col, Container, Form, Modal, Image } from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import { getCartProducts } from '../../../store/actions/clientActions/cartActions';


class Checkout extends React.Component {

    constructor(){
        super();
        this.state = {
            addressCards: [],
            selectedAddress: '',
            cards: [],
            selectedCard: '',
            redirect: '',
            showAddressModal: false,
            showCardModal: false,
            fullName: '',
            streetAddressLine1: '',
            streetAddressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            country:'',
            phoneNumber: '',
            name: '',
            cardNumber: '',
            expirationDate: '',
            CVV: '',
            cartProducts:[],
            showGiftTextBox: false,
            giftMessage: ''
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };
    
    onSubmitHandler = e =>{

    }

    onAddressChangeListener = e => {
        this.setState({selectedAddress: e.target.id})
    }

    onCardChangeListener = e => {
        this.setState({selectedCard: e.target.id})
        console.log(e.target.id)
    }

    addNewAddress = e => {
        e.preventDefault();
        this.setState({
            showAddressModal: true
        })
    }

    handleAddressClose = () => {
        this.setState({
            showAddressModal: false
        })
    }

    onSaveNewAddress = e => {
        e.preventDefault();
        const newAddress = {
            name : this.state.fullName,
            address1: this.state.streetAddressLine1,
            address2: this.state.streetAddressLine2,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zipcode: this.state.zipCode,
            phoneNumber: this.state.phoneNumber
        }
        var addressCards = this.state.addressCards
        addressCards.push(newAddress)
        this.setState({
            addressCards: addressCards, 
            showAddressModal: false
        })
    }

    addNewCard = e => {
        e.preventDefault();
        this.setState({
            showCardModal: true
        })
    }

    handleCardClose = () => {
        this.setState({
            showCardModal: false
        })
    }

    onPlaceOrder = e => {
        var cartProducts = this.state.cartProducts
        console.log(cartProducts)
        var customerId
        var productArray = []
        customerId = localStorage.getItem("id");
        
        for(var i=0; i< cartProducts.length; i++){
            let product = {
                productId: '',
                
                productName: '',
                sellerName: '',
                quantity: '',
                perQuantityPrice: '',
                totalPrice: '',
                orderStatus: '0',
                orderUpdates: [],
                gift: {
                    gift: false,
                    giftMessage: ''
                }
            }
            console.log(cartProducts[i])
            product.productId = cartProducts[i].productId
            product.productName = cartProducts[i].productName
            product.sellerName = cartProducts[i].sellerName
            product.quantity = cartProducts[i].quantity
            product.perQuantityPrice = cartProducts[i].price
            product.productPhotoUrl = cartProducts[i].thumbNail
            product.totalPrice = product.quantity * product.perQuantityPrice
            if(cartProducts[i].gift===1){
                product.gift.gift = true 
                product.gift.giftMessage = this.state.giftMessage
            }
            var orderUpdates = [{
                
                deliveryStatus : '0'
            }]
            product.orderUpdates = orderUpdates
            productArray.push(product) 
        }
        var netPrice = 0;
        for(var j=0 ; j<productArray.length; j++){
            netPrice += productArray[j].totalPrice
        }
        var addressDetails = this.state.selectedAddress.split(",")
        var shippingAddress = {
            name: addressDetails[0],
            address1 : addressDetails[1],
            adress2 :addressDetails[2],
            city: addressDetails[3],
            state: addressDetails[4],
            country: addressDetails[5],
            zipcode: addressDetails[6],
            phoneNumber: addressDetails[7]
        }
        var customerName = localStorage.getItem("customerName")
        var cardDetails = this.state.selectedCard.split(",")
        var billing = {
            name : cardDetails[0],
            cardNumber: cardDetails[1],
            totalPrice: netPrice
        }
        const data = {
            customerId : customerId,
             customerName : customerName,
            billing: billing,
            shippingAddress : shippingAddress,
            products : productArray
        }

        axios.post(exportData.backenedURL + 'write/customer/orders/' + customerId, JSON.stringify(data), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
            .then(res => {
                console.log(res)
                if (res.status === 201) {
                    console.log(res)
                    alert("order placed successfully")
                } 
        })

    }

    onSaveNewCard = e => {
        e.preventDefault();
        const id = localStorage.getItem("id")
        const newCard = {
            name : this.state.name,
            cardNumber: this.state.cardNumber,
            expirationDate: this.state.expirationDate,
            cvv: this.state.CVV
        }
        axios.post(exportData.backenedURL + 'write/customer/profile/cards/' + id, JSON.stringify(newCard), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status === 200) {
                console.log(res)
                var cards = this.state.cards
                cards.push(newCard)
                this.setState({
                    cards: cards, 
                    showCardModal: false
                })
            } 
        })

    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };
    

    async componentDidMount(){
        // const id = localStorage.getItem("user_id")
        const id = localStorage.getItem("id")
        axios.get(exportData.backenedURL + 'read/customer/profile/' + id).then(res => {
            console.log(res)  
            if (res.status === 200) {
                this.setState({
                    addressCards : res.data.customerAddresses
                })
            }    
        })
        axios.get(exportData.backenedURL + 'read/customer/profile/' + id).then(res => {
            console.log(res)  
            if (res.status === 200) {
                this.setState({
                    cards : res.data.cards
                })
            }    
        })   
        await this.props.getCartProducts(id);
        console.log(this.props.cartProducts)
        var cartProducts = this.props.cartProducts
        this.setState({cartProducts: cartProducts})
        for(var i=0; i<cartProducts.length; i++){
            if(cartProducts[i].gift===1){
                this.setState({showGiftTextBox: true})
            }
        }
        // const data = {

        // }
    
    }

    render(){
         console.log(this.props.cartProducts)
        // let redirectVar = null;
        // if (!localStorage.getItem("id") || localStorage.getItem("usertype") !== 'customer') {
        //     redirectVar = <Redirect to="/unauthorised" />
        // }
        return(
          <div>
               {/* {redirectVar} */}
            <Header />
            {this.state.redirect}
            <Container>
                <br/>
                <h2>User Checkout: </h2>
                <hr/>

                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            <h5>Select Address: </h5>
                        </Form.Label>
                        <Col sm={10}>
                            {this.state.addressCards.map((addressCard)=>{
                                return(
                                    <Form.Check
                                        type="radio"
                                        label={addressCard.address1 + ", " + 
                                               addressCard.address2 + ", " + 
                                               addressCard.city + ", " + 
                                               addressCard.state + ", " +
                                               addressCard.country}
                                        name="addressRadioButton"
                                        id={addressCard.name + "," +
                                            addressCard.address1 + "," + 
                                            addressCard.address2 + "," + 
                                            addressCard.city + "," + 
                                            addressCard.state + "," +
                                            addressCard.country + "," +
                                            addressCard.zipcode + "," +
                                            addressCard.phoneNumber}
                                        onChange={this.onAddressChangeListener}
                                    />
                                )
                            })}
                        </Col>                        
                    </Form.Group>
                </fieldset>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        <h5>OR</h5>
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="dark" onClick={this.addNewAddress}>Add New Address</Button>
                    </Col>
                </Form.Group>
                <br/>

                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            <h5>Select Card: </h5>
                        </Form.Label>
                        <Col sm={10}>
                            {this.state.cards.map((card)=>{
                                return(
                                    <Form.Check
                                        type="radio"
                                        label={card.name + ", Card Number:" + 
                                               card.cardNumber + ", Expiration Date:" + 
                                               card.expirationDate}
                                        name="cardRadioButton"
                                        id={card.name + "," +
                                            card.cardNumber + "," +
                                            card.expirationDate}
                                        onChange={this.onCardChangeListener}
                                    />
                                )
                            })}
                        </Col> 
                    </Form.Group>
                </fieldset>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        <h5>OR</h5>
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="dark" onClick={this.addNewCard}>Add New Card</Button>
                    </Col>
                </Form.Group>
                <br/>
                
                {this.state.showGiftTextBox && 
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h5>Gift Messages(If any):</h5>
                            <Form.Control placeholder="Gift Message" 
                            column id="giftMessage" 
                            value={this.state.giftMessage} 
                            onChange={this.onChangeHandler}/>
                        </Form.Label>                        
                    </Form.Group>
                }
                
                <br/>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="warning" onClick={this.onPlaceOrder}>Place Order</Button>
                    </Col>
                </Form.Group>

                {/* Add New Address Modal  */}
                <Modal show={this.state.showAddressModal} onHide={this.handleAddressClose} animation={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.onSaveNewAddress}>
                            Save Changes
                        </Button>
                        <Button variant="light" onClick={this.handleAddressClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Add New Card Modal  */}
                <Modal show={this.state.showCardModal} onHide={this.handleCardClose} animation={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.onSaveNewCard}>
                            Save Changes
                        </Button>
                        <Button variant="light" onClick={this.handleCardClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>                
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { cartProducts: state.cartProducts }
}

export default connect(mapStateToProps, { getCartProducts })(Checkout);