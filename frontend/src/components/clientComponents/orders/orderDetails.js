import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import Header from "../../header/header";

class OrderDetails extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            orderInfo: this.props.location.state.orderInfo,
            productInfo: this.props.location.state.productInfo
        }
    }

    trackPackage = () => {

    }
    render() {
        return (
            <div>
                <div>
                <Header />

                    <br></br>
                    <Container>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>
                                <h3 >Order Details</h3>
                                <Row>
                                    <Col md={6}>
                                        <p> Ordered on {moment(this.state.orderInfo.orderDate).format('MMM') + " " + moment(this.state.orderInfo.orderDate).format('DD') + ", " +
                                            moment(this.state.orderInfo.orderDate).format('YYYY')}
                                            <small class="text-muted">|</small>  Order # {this.state.orderInfo._id}</p>

                                    </Col>

                                </Row>
                                <br></br>

                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col md={4}>
                                                <div style={{ marginLeft: '4%' }}>
                                                    <Row>
                                                        <small><strong>Shipping address</strong></small>
                                                    </Row>
                                                    <Row>
                                                        <small>
                                                            {this.state.orderInfo.shippingAddress.name}
                                                        </small>
                                                    </Row>
                                                    <Row>
                                                        <small>
                                                            {this.state.orderInfo.shippingAddress.address1}
                                                        </small>
                                                    </Row>
                                                    <Row>
                                                        <small>
                                                            {this.state.orderInfo.shippingAddress.address2}
                                                        </small>
                                                    </Row>
                                                    <Row>
                                                        <small>
                                                            {this.state.orderInfo.shippingAddress.address2}
                                                        </small>
                                                    </Row>
                                                    <Row>
                                                        <small>
                                                            {this.state.orderInfo.shippingAddress.city}
                                                            {" " + this.state.orderInfo.shippingAddress.state}
                                                            {" " + this.state.orderInfo.shippingAddress.zipcode}

                                                        </small>
                                                    </Row>
                                                    <Row>
                                                        <small>
                                                            {this.state.orderInfo.shippingAddress.country}


                                                        </small>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <Row>
                                                    <small><strong>Payment Method</strong></small>
                                                </Row>
                                                <Row>
                                                    <small>
                                                        {this.state.orderInfo.billing.name}
                                                    </small>
                                                </Row>
                                                <Row>
                                                    <small>
                                                        Card: {this.state.orderInfo.billing.cardNumber}
                                                    </small>
                                                </Row>

                                            </Col>
                                            <Col md={4}>
                                                <small><strong>Order Summary</strong></small>
                                                <Row>
                                                    <Col xs={9}>
                                                        <small> Quantity:</small>
                                                    </Col>
                                                    <small>{this.state.productInfo.quantity}</small>
                                                </Row>
                                                <Row>
                                                    <Col xs={9}>
                                                        <small> Item(s) Subtotal:</small>
                                                    </Col>
                                                    <small>${this.state.productInfo.totalPrice}</small>
                                                </Row>
                                                <Row>
                                                    <Col xs={9}>
                                                        <small>Shipping & Handling:</small>
                                                    </Col>
                                                    <small>$0.00</small>
                                                </Row>
                                                <Row>
                                                    <Col xs={9}>
                                                        <small><strong>Grand Total:</strong></small>
                                                    </Col>
                                                    <small>${this.state.productInfo.totalPrice}</small>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={2}></Col>

                        </Row>

                    </Container>
                </div>
            </div>
        )
    }
}
export default OrderDetails;