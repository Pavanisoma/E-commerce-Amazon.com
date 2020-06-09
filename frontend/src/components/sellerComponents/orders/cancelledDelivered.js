import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrderHeader from './orderHeader';
import { Link } from 'react-router-dom';
import moment from 'moment';
import exportData from '../../../config/config';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Header from '../sellerHeader/sellerHeader'


let sellerName = localStorage.getItem('sellerName');

class SellerCancelledOrders extends Component {
    async componentDidMount () {
        //   await this.props.getSellerOrders(sellerName);
   
       }

    render() {
       

        return (
            <div>
                <Header />
                <div>
                    <OrderHeader />
                    <br></br>
                    <Container>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>
                            {this.props.sellerOrders.length ? <div>
                                {this.props.sellerOrders.length && this.props.sellerOrders.map((orders, i) => {
                                    return (
                                        <div key={i}>
                                            {orders.products.map((product, i) => {
                                                
                                                    if((product.orderStatus === 2 || product.orderStatus === 1||product.orderStatus === "1" || product.orderStatus === "2") && product.sellerName === sellerName){
                                                    

                                                return (
                                                    <div key={i}>
                                                        <Card>

                                                            <Card.Header >

                                                                <Row>

                                                                    <Col md={3}>
                                                                        <Row>
                                                                            <small className="text-muted">
                                                                                ORDER PLACED</small>
                                                                        </Row>
                                                                        <Row>
                                                                            <small className="text-muted">{moment(orders.orderDate).format('MMM') + " " + moment(orders.orderDate).format('DD') + ", " +
                                                                                moment(orders.orderDate).format('YYYY')}</small>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Row>
                                                                            <small className="text-muted">
                                                                                SHIP TO</small>
                                                                        </Row>
                                                                        <Row>
                                                                            <small className="text-muted">{orders.shippingAddress.name}</small>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Row>
                                                                            <small className="text-muted">
                                                                                Order #</small>
                                                                            <small className="text-muted">
                                                                                {orders._id}</small>
                                                                        </Row>
                                                                        <Row>
                                                                            <Link to={{pathname:"/user/orders/details/", state:{orderInfo:orders, productInfo:product}}} >Order details</Link>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Header >

                                                            <Card.Body>

                                                                <Card.Title>{exportData.orderStatus[product.orderStatus]}</Card.Title>
                                                                <Row>
                                                                    <Col xs={2}>
                                                                        {/* <Link to={{ pathname: '//', state: {} }}> */}
                                                                            <img
                                                                                alt=''
                                                                                style={{ width: '100%' }}
                                                                                // src={'https://imagesbuckethandshake.s3-us-west-1.amazonaws.com/product.jpg'}
                                                                                src={product.productPhotoUrl }
                                                                            ></img>
                                                                        {/* </Link> */}
                                                                    </Col>
                                                                    <Col md={7}>
                                                                        <Row>
                                                                        {product.productName}
                                                                        </Row>
                                                                        <Row>
                                                                        
                                                                            <Link> {product.sellerName}</Link>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                    <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f3cf75', border: '#f3cf75', color: 'black' }}  ><Link to={{pathname:"/user/orders/orderStatus/", state:{ productInfo:product}}} style={{color:'black'}}>Track Package</Link></Button>

                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                        <br></br>
                                                    </div>
                                                ) 
                                                    }
                                                    else{
                                                        return(
                                                            <div key={1}>
                                                                </div>
                                                        )
                                                    }
                                               
                                            })}
                                            
                                        </div>
                                    )
                                })}
                                </div>:<div></div>}
                            </Col>

                            <Col md={2}></Col>

                        </Row>

                    </Container>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { sellerOrders: state.sellerOrders }
}

export default connect(mapStateToProps, { })(SellerCancelledOrders);