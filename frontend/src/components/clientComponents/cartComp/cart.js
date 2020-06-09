import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Save4Later from './save4Later';
import { connect } from 'react-redux';
import { getCartProducts, updateIsGift, moveToLater, changeQuantity, deleteProduct } from '../../../store/actions/clientActions/cartActions';
import Header from "../../header/header";
import { Redirect } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
//import Button from 'react-bootstrap/Button';


//change it to local storage
//let user_id = 1;
let user_id = localStorage.getItem('id');

let userType=localStorage.getItem('usertype');

class Cart extends Component {

    constructor() {
        super();
        this.state = {
            subtotal: 0,
            loading: true,
            redirect:'',
            //totalCost:0
        }
        
    }

    async componentDidMount() {

        await this.props.getCartProducts(user_id)
        console.log(this.props.cartProducts)
        this.setState({
            loading: false

        })
        console.log(localStorage.getItem('id'), localStorage.getItem('usertype'))

       // this.checkTotalCost();

    }

    checkTotalCost = () => {
        let cost = 0;
        for (let i = 0; i < this.props.cartProducts.length; i++) {
            if (this.props.cartProducts[i].price) {
                cost += (Number(this.props.cartProducts[i].quantity) * Number(this.props.cartProducts[i].price));

            }
            // this.setState({
            //     subtotal: this.state.subtotal + cost
            // })
        }
      
        return ("$"+cost);

    }

    

    giftCheckBox = (product, e) => {
        let values = {user_id:user_id, productId:product.productId};
        if (e.target.checked) {
            values.gift = 1;
    
        }
        else {
            values.gift = 0;
        }
        this.props.updateIsGift(values);

    }

    deleteClicked = (product, event) => {
        console.log(product)
        console.log(event)
        //delete and update store.
        let values = {user_id:user_id, productId:product.productId};
        this.props.deleteProduct(values);
        

    }
    save4laterClicked = (product, event) => {
        let values = {user_id:user_id, flag:1, productId:product.productId};
        this.props.moveToLater(values);

    }

    changeQuantity = (product, event) => {
       
        /*let oldPrice = this.state.subtotal - (product.price * product.quantity);
        let newPrice = product.price * event.target.value
        oldPrice += newPrice;
        this.setState({
            subtotal: oldPrice
        })
        */
        let values = {user_id:user_id, quantity:event.target.value, productId:product.productId};

        this.props.changeQuantity(values);

       
    }


    render() {
        let redirectVar = null;
        if (!localStorage.getItem("id") || localStorage.getItem("usertype") !== 'customer') {
            redirectVar = <Redirect to="/unauthorised" />
        }
        return (
            <div>
                {/* {redirectVar} */}
                <div>
                <Header />

                    <Row>
                        {this.state.loading && <Spinner animation="grow" variant="primary" style={{ marginLeft: '34%' }} />
                        }

                    </Row>
                    {!this.state.loading && <div>
                    { this.props.cartProducts.length ? <div>
                        <br></br>
                        <Row>

                            <Col md={9}>
                                <h3>Shopping Cart</h3>
                                <h5 style={{ float: 'right', marginRight: '3%' }}>price</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={9}>
                                <Card >
                                    <ListGroup variant="flush">
                                        <div>
                                            {this.props.cartProducts.map((product, i) => {
                                                return (
                                                    <ListGroup.Item key={i}>
                                                        <Row>
                                                            <Col xs={2}>
                                                                <Link to={{ pathname: '//', state: {} }}>
                                                                    <img
                                                                        alt=''
                                                                        style={{ width: '100%' }}
                                                                        // src={'https://imagesbuckethandshake.s3-us-west-1.amazonaws.com/product.jpg'}
                                                                        src={product.thumbNail}
                                                                    ></img>
                                                                </Link>
                                                            </Col>
                                                            <Col xs={9}>
                                                                <Row>
                                                                    {product.productName}
                                                                </Row>
                                                                <Row>
                                                                    <small style={{ color: 'green' }}>In stock</small>
                                                                </Row>
                                                                <Row>
                                                                    <small><img alt="" src={require('../../icon.png')} style={{ maxWidth: '10%', minHeight: '10%', maxHeight: '0%' }} /></small>

                                                                </Row>

                                                                <Row>
                                                                    <Form.Check aria-label="option 1" onChange={(e)=>this.giftCheckBox(product, e)} label={<small>This is a gift</small>}
                                                                        checked={product.gift} />

                                                                </Row>
                                                                <Row>

                                                                </Row>
                                                                <Row>
                                                                    <Col xs={2}>
                                                                        <Form>

                                                                            <Form.Control as="select" custom value={product.quantity} onChange={(e) => this.changeQuantity(product, e)}>
                                                                                <option>1</option>
                                                                                <option>2</option>
                                                                                <option>3</option>
                                                                                <option>4</option>
                                                                                <option>5</option>
                                                                                <option>6</option>
                                                                                <option>7</option>
                                                                                <option>8</option>
                                                                                <option>9</option>
                                                                                <option>10</option>
                                                                            </Form.Control>
                                                                        </Form>
                                                                    </Col>
                                                                    |    <Link onClick={(value, event) => this.deleteClicked(product, event)}> <small>Delete</small></Link> |
                                                                     <Link onClick={(value, event) => this.save4laterClicked(product, event)}><small> Save for later</small></Link>


                                                                </Row>
                                                            </Col>
                                                            <Col xs={1}>
                                                                <strong><p style={{ color: '#B12704' }}>{"$" + product.price}</p></strong>
                                                            </Col>
                                                        </Row>

                                                    </ListGroup.Item>

                                                )

                                            })}

                                        </div>
                                        <div>
                                        </div>
                                    </ListGroup>
                                </Card>

                                <p style={{ float: 'right', marginTop: '2%' }}><strong>{"Subtotal(" + this.props.cartProducts.length + " items): "}<strong style={{ color: '#B12704' }}>{this.checkTotalCost()}</strong></strong></p>


                            </Col>
                            <Col md={3} >
                                <Card style={{ background: '#f3f3f3', width: '90%' }}>
                                    <Card.Body>
                                        <Row>
                                            {/* <h6>{"Subtotal (" + this.props.cartProducts.length + " item): "}<strong style={{ color: '#B12704' }}>{"$" + this.state.subtotal}</strong></h6> */}
                                        <h6>{"Subtotal (" + this.props.cartProducts.length + " item): "}<strong style={{ color: '#B12704' }}>{this.checkTotalCost()}</strong></h6>

                                        </Row>
                                        <Row>

                                        </Row>
                                        <Row>
                                            <Button variant="primary" style={{ float: 'right', width: '100%', background: '#f3cf75', border: '#f3cf75', color: 'black' }} > <Link to={{ pathname: "/user/checkout/" }} style={{ color: 'black' }}>Checkout Amazon Cart</Link></Button>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div> :
                        <div>
                            <br></br>
                            <Row>
                            <Col md={1}></Col>
                                <Col md={3}>
                                    <img alt="" src="https://m.media-amazon.com/images/G/01/cart/empty/drip-desaturated._CB445245727_.svg" />
                                </Col>
                                <Col md={3} style={{marginTop:'2%'}}>
                                    <Row >
                                        <h4><strong>Your Amazon cart is empty</strong></h4>
                                    </Row>
                                    <Row >
                                        <Link to={{ pathname: '/user/orders/', state: {} }}><small>Check your orders</small></Link>
                                    </Row>
                                    <Row>
                                        <Button variant="primary" style={{ float: 'right', background: '#f3cf75', border: '#f3cf75', color: 'black' }} >Rediscover your list</Button>
                                    </Row>
                                </Col>
                            </Row>

                        </div>}
                        </div>}
                    <div>
                        <br></br>
                        <Save4Later />
                    </div>
                </div>

            </div>
        )
    }
}

//fetching from store
const mapStateToProps = (state) => {
    return { cartProducts: state.cartProducts }
}

export default connect(mapStateToProps, { getCartProducts,updateIsGift, moveToLater, changeQuantity, deleteProduct })(Cart);