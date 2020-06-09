import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect } from 'react-router';


class OrderHeader extends Component {

    state = {
        redirectPage: '',
    }
    clickedOrders = () => {
        this.setState({
            redirectPage: <Redirect to = {{pathname:'/seller/orders/'}} />

        })
    }

    clickedCancelOrders = () => {
        this.setState({
            redirectPage: <Redirect to = {{pathname:'/seller/cancelledDelivered/'}} />

        })
    }

    clickedOpenOrders = () => {
        this.setState({
            redirectPage: <Redirect to = {{pathname:'/seller/open/'}} />

        })
    }

    


    render() {
        return (
            <div>
                {this.state.redirectPage}

                <div>
                    <br></br>
                    <br></br>
                    <Container>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>
                                <Navbar expand="lg" bg="light" variant="light" style={{ width: '100%' }}>
                                    <Nav className="mr-auto">
                                        <Nav.Link onClick={this.clickedOrders} >Orders</Nav.Link>
                                        <Nav.Link onClick={this.clickedOpenOrders}>Open Orders </Nav.Link>
                                        <Nav.Link onClick={this.clickedCancelOrders}>Cancelled/Delivered Orders</Nav.Link>
                                    </Nav>

                                </Navbar>
                            </Col>
                            <Col md={1}></Col>

                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default OrderHeader;