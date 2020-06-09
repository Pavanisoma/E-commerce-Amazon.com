import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { getSave4LaterProducts, moveToCart } from '../../../store/actions/clientActions/saveLaterActions';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';

let user_id = localStorage.getItem('id');
let userType=localStorage.getItem('usertype');

class Save4Later extends Component {

    constructor() {
        super();
        this.state = {
            loading: true

        }

    }

    async componentDidMount() {
        await this.props.getSave4LaterProducts(user_id)
        this.setState({
            loading: false

        })
    }


    deleteClicked = (product, event) => {
        console.log(product)
        console.log(event)
        //delete and update store.



    }
    moveClicked = (product, event) => {
        console.log(product)
        console.log(event)
        let values = {user_id:user_id, productId:product.productId};

        this.props.moveToCart(values);


    }

    render() {

        console.log(this.props.saveLaterProducts)

        let products = [{
            cartid: 1,
            gift: true,
            giftMessage: 'hello',
            price: '10',
            flag: 0,
            quantity: 2,
            productid: 1,
            customerid: 3,
            productName: 'product 1',
            sellerName: 'seller 1',
            productPrice: 3,
            rating: 3,
            sellerid: 1,
            productPhoto: ''
        },
        {
            cartid: 2,
            gift: false,
            giftMessage: '',
            price: '10',
            flag: 1,
            quantity: 1,
            productid: 1,
            customerid: 3,
            productName: 'product 1',
            sellerName: 'seller 1',
            productPrice: 3,
            rating: 3,
            sellerid: 1,
            productPhoto: ''
        }]


        return (
            <div>
                <div>
                <Row>
                        {this.state.loading && <Spinner animation="grow" variant="primary" style={{ marginLeft: '34%' }} />
                        }

                    </Row>
                    {!this.state.loading && <div>
                    <Row>
                        <Col md={9}>
                            <Card >
                                <Card.Header><strong>Save for Later ({this.props.saveLaterProducts.length + " item)"}</strong></Card.Header>
                                <ListGroup variant="flush">

                                    {this.props.saveLaterProducts.length ? <div>
                                        {this.props.saveLaterProducts.map((product, i) => {
                                            return (
                                                <ListGroup.Item key={i}>
                                                    <Row>
                                                        <Col xs={2}>
                                                            <Link to={{ pathname: '//', state: {} }}>
                                                                <img
                                                                    alt=''
                                                                    style={{ width: '100%' }}
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


                                                            </Row>
                                                            <Row>

                                                            </Row>
                                                            <Row>

                                                                <Link onClick={(value, event) => this.deleteClicked(product, event)}> <small>Delete</small></Link> |
                                                                 <Link onClick={(value, event) => this.moveClicked(product, event)}><small> Move to Cart</small></Link>


                                                            </Row>
                                                        </Col>
                                                        <Col xs={1}>
                                                      <strong><p style={{ color: '#B12704' }}>{"$" + product.price}</p></strong>
                                                        </Col>
                                                    </Row>

                                                    {/* <EachProductCart product={product} key={i} /> */}
                                                </ListGroup.Item>

                                            )

                                        })}

                                    </div>:
                                    <div>
                                    </div>}
                                </ListGroup>
                            </Card>



                        </Col>

                    </Row>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { saveLaterProducts: state.saveLaterProducts }
}

export default connect(mapStateToProps, { getSave4LaterProducts, moveToCart})(Save4Later);