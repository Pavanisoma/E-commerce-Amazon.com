import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { cancelOrderAPI } from '../../../store/actions/clientActions/ordersActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from "../../header/header";
import Toast from 'react-bootstrap/Toast';

let user_id = localStorage.getItem("id") ;

class CancelOrder extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            orderInfo: this.props.location.state.orderInfo,
            productInfo: this.props.location.state.productInfo,
            redirect: '',
            show:false

        }
    }

    orderCancelled = () => {
        //call action and redirect
     //   console.log(this.state)

        let values = { orderUpdateItem: "6", productId: this.state.productInfo.productId, orderId: this.state.orderInfo._id, user_id:localStorage.getItem("id") }
       // console.log(values)
        this.props.cancelOrderAPI(values)

        this.setState({
            show:true,
            redirectPage: <Redirect to = {{pathname:'/user/orders/'}} />
        })

        
    }

    render() {
        return (
            <div>
                {this.state.redirectPage}
                <div>
                <Header />
                    <br></br>
                    <div>
                        <Container>
                            <Row>
                                <Col md={1}></Col>
                                <h4>Are you sure you want to cancel the order?</h4>

                                <Col md={10}>
                                    <Card>
                                        <Card.Header>
                                            <Row>
                                                <Col md={8}>
                                                    <strong>Item Ordered</strong>
                                                </Col>
                                                <Col md={4}>
                                                    <strong>Price</strong>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col md={8}>

                                                    <Row>
                                                        <Link to="">{this.state.productInfo.productName}</Link>
                                                    </Row>
                                                    <Row>
                                                        <small>Sold by:</small>
                                                        <small>{this.state.productInfo.sellerName}</small>
                                                    </Row>

                                                </Col>
                                                <Col md={4}>
                                                    ${this.state.productInfo.totalPrice}
                                                    <br></br>
                                                    <Row>
                                                        <Button onClick={this.orderCancelled}> Cancel Order</Button>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                              
      <Col xs={6}>
        <Toast  onClose={() =>   this.setState({
                                    show:false
                                })} show={this.state.show} delay={1000} autohide
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                  }}>
          <Toast.Header>
           
            <strong className="mr-auto">Cancelled</strong>
            <small>a few seconds ago</small>
          </Toast.Header>
          <Toast.Body>Order cancelled successfully!</Toast.Body>
        </Toast>
      </Col>
      <Col xs={6}>
      </Col>
    </Row>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { customerOrders: state.customerOrders }
}

export default connect(mapStateToProps, { cancelOrderAPI })(CancelOrder);