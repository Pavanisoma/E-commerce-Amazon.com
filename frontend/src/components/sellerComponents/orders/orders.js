import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrderHeader from './orderHeader';
import { Link } from 'react-router-dom';
import exportData from '../../../config/config';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { getSellerOrders, updateStatus } from '../../../store/actions/sellerActions/ordersActions';
import Header from '../sellerHeader/sellerHeader'

//let sellerName = "Apple";
let sellerName = localStorage.getItem('sellerName');

class SellerOrders extends Component {

    state = {
        loading: false,

    }

    async componentDidMount () {
        await this.props.getSellerOrders(sellerName);

    }

    orderStatusUpdate = async (orderDetail, e) => {
      //  console.log((e.target.value))
       // console.log(orderDetail);

        let values={orderUpdateItem:e.target.value, productId:orderDetail.product.productId, orderId:orderDetail.orderId,sellerName:sellerName};

        this.props.updateStatus(values);

    }

    changeStatus = (product, orders_id) => {
    //    console.log(product)
        let i =0;
        let orderDetail = {orderId: orders_id, product:product};
        let update = product.orderUpdates;
       // for( i=0; i<update.length;i++);
        let latestStatus = update[0].deliveryStatus;
        let title = exportData.deliveryStatus[latestStatus];

     //   console.log(title)
        return (

            <Form onChange={(e)=>this.orderStatusUpdate(orderDetail, e)}>
                {/* <Form.Label>Change Status</Form.Label> */}
                <Form.Control as="select" custom>
                    <option value="3">{title}</option>
                    {latestStatus === "0" && <option value="1">Packing</option>}
                    {(latestStatus === "1" || latestStatus === "0") && <option value="2">Out for Shipping</option>}

                </Form.Control>
            </Form>
        )

    }


    render() {

     //   console.log(this.props.sellerOrders);
        return (
            <div>
                <Header/>
                <div>
                    <OrderHeader />
                    <br></br>
                    <Container>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>
                            {this.props.sellerOrders.length ? <div>
                                {this.props.sellerOrders.length && this.props.sellerOrders.map((orders, i) => {
                            //        console.log(orders)
                                    return (
                                        <div key={i}>
                                            {orders.products.map((product, i) => {
                                                if (product.sellerName === sellerName) {
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
                                                                                <Link to={{ pathname: "/seller/orders/details/", state: { orderInfo: orders, productInfo: product } }} >Order details</Link>
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

                                                                                {/* <Link> {product.sellerName}</Link> */}
                                                                            </Row>
                                                                        </Col>

                                                                        <Col md={3}>
                                                                            <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f3cf75', border: '#f3cf75', color: 'black' }}  ><Link to={{pathname:"/seller/orders/orderStatus/", state:{ productInfo:product}}} style={{color:'black'}}>Track Package</Link></Button>
                                                                            <br></br>
                                                                            <br></br>
                                                                            {product.orderStatus == 0 && <div>
                                                                                <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f0f1f4', border: '#f0f1f4', color: 'black' }} > <Link to={{ pathname: "/seller/orders/cancelOrder/", state: { orderInfo: orders, productInfo: product } }} style={{ color: 'black' }}>Cancel Order</Link></Button>

                                                                                <br></br>
                                                                                <br></br>
                                                                            </div>
                                                                            }
                                                                            {this.changeStatus(product, orders._id)}

                                                                        </Col>
                                                                    </Row>
                                                                </Card.Body>
                                                            </Card>
                                                            <br></br>
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (<div key={i}>
                                                    </div>)
                                                }
                                            })}
                                        </div>
                                    )
                                })}
                                </div>:
                                <div></div>
                            }

                            </Col>

                            <Col md={2}></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

//export default SellerOrders;
const mapStateToProps = (state) => {
    return { sellerOrders: state.sellerOrders }
}

export default connect(mapStateToProps, { getSellerOrders, updateStatus })(SellerOrders);