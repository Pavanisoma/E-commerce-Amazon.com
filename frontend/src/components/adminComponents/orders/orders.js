import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import axios from 'axios';
import exportData from '../../../config/config';
import { connect } from 'react-redux';
import { getAdminOrders, updateStatus, getSellers, searchAPI } from '../../../store/actions/adminActions/ordersActions';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router';

// 
class AdminOrders extends Component {

    state = {
        loading: true,
        sellerName: '',
        orderStatusValue: '',
        ordersDisplay: [],

    }

    async componentDidMount() {
        await this.props.getSellers();
        await this.props.getAdminOrders();
        this.setState({
            ordersDisplay: this.props.adminOrders,
            loading:false
        })
    }


    orderStatusUpdate = async (orderDetail, e) => {

        let values = { orderUpdateItem: e.target.value, productId: orderDetail.product.productId, orderId: orderDetail.orderId };

      await  this.props.updateStatus(values);

         this.setState({
             loading:true,
             ordersDisplay:[]
         })
         await this.props.getAdminOrders();

         this.setState({
             ordersDisplay: this.props.adminOrders,
             loading:false
         })
    }

    changeStatus = (product, orders_id) => {
        let i = 0;
        let orderDetail = { orderId: orders_id, product: product };
        let update = product.orderUpdates
        // for (i = 0; i < update.length; i++);
        let latestStatus = update[0].deliveryStatus;
        let title = exportData.deliveryStatus[latestStatus]

        return (

            <Form onChange={(e) => this.orderStatusUpdate(orderDetail, e)}>
                {/* <Form.Label>Change Status</Form.Label> */}
                <Form.Control as="select" custom>
                    <option value="1">{title}</option>
                    {latestStatus == 2 &&
                        <option value="3">{exportData.deliveryStatus[3]}</option>
                    }{(latestStatus == 2 || latestStatus == 3) &&
                        <option value="4">{exportData.deliveryStatus[4]}</option>
                    }
                    {(latestStatus == 2 || latestStatus == 3 || latestStatus == 4 )&&
                        <option value="5">{exportData.deliveryStatus[5]}</option>
                    }

                    {/* <option value="4">{exportData.deliveryStatus[4]}</option>
                    <option value="5">{exportData.deliveryStatus[5]}</option> */}


                    }

                </Form.Control>
            </Form>
        )

    }

    filterFunction = async (values) => {
        console.log(values)
/*        if (values.sellerName && values.orderStatusValue) {
            try {
                const response = await axios.get(exportData.backenedURL + 'read/admin/orders?sellerName=' + values.sellerName + '&orderStatus=' + values.orderStatusValue)
                if (response.data.length) {
                    response.data.map((order) => {
                        order.map((products) => {

                        })
                    })
                }
                else {

                }
            }
            catch (e) {
                console.log(e)
            }
        }
        else if (values.sellerName && !values.orderStatusValue) {
            try {
                const response = await axios.get(exportData.backenedURL + 'read/admin/orders?sellerName=' + 'OnePlus')
                console.log(response)

                if (response.data.length) {

                }
                else {

                }
            }
            catch (e) {
                console.log(e)
            }
        }
        else if (!values.sellerName && values.orderStatusValue) {

            try {
                const response = await axios.get(exportData.backenedURL + 'read/admin/orders?orderStatus=' + values.orderStatusValue)
                //     console.log(response)
                if (response.data.length) {

                }
                else {

                }
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            try {
                const response = await axios.get(exportData.backenedURL + 'read/admin/orders/');
                // console.log(response)
                if (response.data.length) {

                }
                else {

                }
            }
            catch (e) {
                console.log(e)
            }

        }
*/
    }

    handleChangeOrder = selectedOption => {
        if (selectedOption) {
            this.setState({
                orderStatusValue: selectedOption.value
            }, () => {
                let values = { orderStatusValue: this.state.orderStatusValue, sellerName: this.state.sellerName }
                // this.props.searchAPI(values)
                this.filterFunction(values);
            })
        }
        else {
            this.setState({
                orderStatusValue: ''
            }, () => {
                let values = { orderStatusValue: this.state.orderStatusValue, sellerName: this.state.sellerName }
                // this.props.searchAPI(values)
                this.filterFunction(values);

            })
        }


    };
    handleChangeSeller = selectedOption => {
        console.log(`Option selected:`, selectedOption);
        if (selectedOption) {
            this.setState({
                sellerName: selectedOption.value
            }, () => {
                let values = { orderStatusValue: this.state.orderStatusValue, sellerName: this.state.sellerName }
                //   this.props.searchAPI(values)
                this.filterFunction(values);

            })
        }
        else {
            this.setState({
                sellerName: ''
            }, () => {
                let values = { orderStatusValue: this.state.orderStatusValue, sellerName: this.state.sellerName }
                // this.props.searchAPI(values)
                this.filterFunction(values);

            })
        }
    };


    render() {

        const options = [];
        this.props.totalSellers.map((seller) => {
            options.push({ value: seller.name, label: seller.name })
        })

        const orderStatus = [
            { value: "0", label: exportData.deliveryStatus["0"] },
            { value: "1", label: exportData.deliveryStatus["1"] },
            { value: "2", label: exportData.deliveryStatus["2"] },
            { value: "3", label: exportData.deliveryStatus["3"] },
            { value: "4", label: exportData.deliveryStatus["4"] },
            { value: "5", label: exportData.deliveryStatus["5"] },
            { value: "6", label: exportData.deliveryStatus["6"] },
        ];
        let redirectVar = null;
        if (!localStorage.getItem("id") || localStorage.getItem("usertype") !== 'admin') {
            redirectVar = <Redirect to="/unauthorised" />
        }

        return (
            <div>
                {redirectVar}
                <div>
                    <br></br>
                    <Row>
                        <Col md={2}>
                        </Col>
                        <Col md={9}>
                            <Card>
                                <br></br>
                                <Row>
                                    <Col xs={1}>
                                    </Col>
                                    <Col xs={4}>
                                        <Select
                                            onChange={this.handleChangeSeller}
                                            options={options}
                                            isClearable={true}
                                            placeholder="Select seller name"
                                        />
                                    </Col>
                                    <Col xs={4}>

                                        <Select
                                            onChange={this.handleChangeOrder}
                                            options={orderStatus}
                                            isClearable={true}
                                            placeholder="Select order status"
                                        />
                                    </Col>

                                </Row>
                                <br></br>

                            </Card>
                            <br></br>
                            {this.state.loading && <Spinner animation="grow" variant="primary" style={{ marginLeft: '34%' }} />
                        }
                            {!this.state.loading && this.state.ordersDisplay.length ? <div>

                                {this.state.ordersDisplay.map((orders, i) => {
                                    return (
                                        <div key={i}>
                                            {orders.products && orders.products.map((product, i) => {
                                                if (this.state.sellerName && this.state.orderStatusValue) {
                                                    
                                                    if (product.sellerName === this.state.sellerName && product.orderUpdates[0].deliveryStatus === this.state.orderStatusValue) {

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
                                                                                    <Link to={{ pathname: "/user/orders/details/", state: { orderInfo: orders, productInfo: product } }} >Order details</Link>
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
                                                                                <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f3cf75', border: '#f3cf75', color: 'black' }}  ><Link to={{ pathname: "/user/orders/orderStatus/", state: { productInfo: product } }} style={{ color: 'black' }}>Track Package</Link></Button>

                                                                                <br></br>
                                                                                <br></br>
                                                                                {/* {product.orderStatus == 0 && <div>
                                                                        <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f0f1f4', border: '#f0f1f4', color: 'black' }}> <Link to={{ pathname: "/user/orders/cancelOrder/", state: { orderInfo: orders, productInfo: product } }} style={{ color: 'black' }}>Cancel Order</Link></Button>

                                                                        <br></br>
                                                                        <br></br>
                                                                    </div>
                                                                    } */}
                                                                                {this.changeStatus(product, orders._id)}

                                                                            </Col>
                                                                        </Row>
                                                                    </Card.Body>
                                                                </Card>
                                                                <br></br>
                                                            </div>

                                                        )
                                                    }
                                                }
                                                else if (this.state.sellerName && !this.state.orderStatusValue) {
                                                    if (product.sellerName === this.state.sellerName) {

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
                                                                                    <Link to={{ pathname: "/user/orders/details/", state: { orderInfo: orders, productInfo: product } }} >Order details</Link>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card.Header >

                                                                    <Card.Body>

                                                                        <Card.Title>{exportData.orderStatus[product.orderStatus]}</Card.Title>
                                                                        <Row>
                                                                            <Col xs={2}>
                                                                                <Link to={{ pathname: '//', state: {} }}>
                                                                                    <img
                                                                                        alt=''
                                                                                        style={{ width: '100%' }}
                                                                                    //    src={'https://imagesbuckethandshake.s3-us-west-1.amazonaws.com/product.jpg'}
                                                                                    src={product.productPhotoUrl }
                                                                                    ></img>
                                                                                </Link>
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
                                                                                <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f3cf75', border: '#f3cf75', color: 'black' }}  ><Link to={{ pathname: "/user/orders/orderStatus/", state: { productInfo: product } }} style={{ color: 'black' }}>Track Package</Link></Button>

                                                                                <br></br>
                                                                                <br></br>
                                                                                {/* {product.orderStatus == 0 && <div>
                                                                        <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f0f1f4', border: '#f0f1f4', color: 'black' }}> <Link to={{ pathname: "/user/orders/cancelOrder/", state: { orderInfo: orders, productInfo: product } }} style={{ color: 'black' }}>Cancel Order</Link></Button>

                                                                        <br></br>
                                                                        <br></br>
                                                                    </div>
                                                                    } */}
                                                                                {this.changeStatus(product, orders._id)}

                                                                            </Col>
                                                                        </Row>
                                                                    </Card.Body>
                                                                </Card>
                                                                <br></br>
                                                            </div>

                                                        )
                                                    }
                                                }
                                                else if (!this.state.sellerName && this.state.orderStatusValue) {
                                               //     console.log(this.state.orderStatusValue)
                                                 //   console.log(product.orderUpdates[0])
                                                    if (String(product.orderUpdates[0].deliveryStatus) === String(this.state.orderStatusValue)) {

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
                                                                                    <Link to={{ pathname: "/user/orders/details/", state: { orderInfo: orders, productInfo: product } }} >Order details</Link>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card.Header >

                                                                    <Card.Body>

                                                                        <Card.Title>{exportData.orderStatus[product.orderStatus]}</Card.Title>
                                                                        <Row>
                                                                            <Col xs={2}>
                                                                                <Link to={{ pathname: '//', state: {} }}>
                                                                                    <img
                                                                                        alt=''
                                                                                        style={{ width: '100%' }}
                                                                                    //    src={'https://imagesbuckethandshake.s3-us-west-1.amazonaws.com/product.jpg'}
                                                                                    src={product.productPhotoUrl }
                                                                                    ></img>
                                                                                </Link>
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
                                                                                <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f3cf75', border: '#f3cf75', color: 'black' }}  ><Link to={{ pathname: "/user/orders/orderStatus/", state: { productInfo: product } }} style={{ color: 'black' }}>Track Package</Link></Button>

                                                                                <br></br>
                                                                                <br></br>
                                                                                {/* {product.orderStatus == 0 && <div>
                                                                        <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f0f1f4', border: '#f0f1f4', color: 'black' }}> <Link to={{ pathname: "/user/orders/cancelOrder/", state: { orderInfo: orders, productInfo: product } }} style={{ color: 'black' }}>Cancel Order</Link></Button>

                                                                        <br></br>
                                                                        <br></br>
                                                                    </div>
                                                                    } */}
                                                                                {this.changeStatus(product, orders._id)}

                                                                            </Col>
                                                                        </Row>
                                                                    </Card.Body>
                                                                </Card>
                                                                <br></br>
                                                            </div>

                                                        )
                                                    }
                                                }
                                                else {
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
                                                                                <Link to={{ pathname: "/user/orders/details/", state: { orderInfo: orders, productInfo: product } }} >Order details</Link>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Card.Header >

                                                                <Card.Body>

                                                                    <Card.Title>{exportData.orderStatus[product.orderStatus]}</Card.Title>
                                                                    <Row>
                                                                        <Col xs={2}>
                                                                            <Link to={{ pathname: '//', state: {} }}>
                                                                                <img
                                                                                    alt=''
                                                                                    style={{ width: '100%' }}
                                                                               //     src={'https://imagesbuckethandshake.s3-us-west-1.amazonaws.com/product.jpg'}
                                                                               src={product.productPhotoUrl }
                                                                                ></img>
                                                                            </Link>
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
                                                                            <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f3cf75', border: '#f3cf75', color: 'black' }}  ><Link to={{ pathname: "/user/orders/orderStatus/", state: { productInfo: product } }} style={{ color: 'black' }}>Track Package</Link></Button>

                                                                            <br></br>
                                                                            <br></br>
                                                                            {/* {product.orderStatus == 0 && <div>
                                                                                            <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f0f1f4', border: '#f0f1f4', color: 'black' }}> <Link to={{ pathname: "/user/orders/cancelOrder/", state: { orderInfo: orders, productInfo: product } }} style={{ color: 'black' }}>Cancel Order</Link></Button>
                    
                                                                                            <br></br>
                                                                                            <br></br>
                                                                                        </div>
                                                                                        } */}
                                                                            {this.changeStatus(product, orders._id)}

                                                                        </Col>
                                                                    </Row>
                                                                </Card.Body>
                                                            </Card>
                                                            <br></br>
                                                        </div>

                                                    )
                                                }

                                            })}

                                        </div>
                                    )
                                })}
                            </div> : <div>
                                </div>}
                        </Col>


                    </Row>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { adminOrders: state.adminOrders, totalSellers: state.totalSellers }
}

export default connect(mapStateToProps, { getAdminOrders, updateStatus, getSellers, searchAPI })(AdminOrders);