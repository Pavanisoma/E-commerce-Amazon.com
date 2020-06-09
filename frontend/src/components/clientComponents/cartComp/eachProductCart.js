import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
//import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'

class EachProductCart extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            giftMessage: this.props.product.giftMessage ? this.props.product.giftMessage : '',
            showTextArea: this.props.product.gift
        }
    }

    onChangeMessage = (e) => {
        console.log(e.target.value)
        this.setState({
            giftMessage: e.target.value
        })
    }

    giftCheckBox = (e) => {
        if (e.target.checked) {
            this.setState({
                showTextArea: true
            })
        }
        else {
            this.setState({
                showTextArea: false,
                giftMessage: ''
            })
        }
    }



    render() {
        return (
            <div>
                <div>
                    <Row>
                        <Col xs={2}>
                            <Link to={{ pathname: '//', state: {} }}>
                                <img
                                    alt=''
                                    style={{ width: '100%' }}
                                    src={'https://imagesbuckethandshake.s3-us-west-1.amazonaws.com/product.jpg'}
                                ></img>
                            </Link>
                        </Col>
                        <Col xs={9}>
                            <Row>
                                product name
                                </Row>
                            <Row>
                                <small style={{ color: 'green' }}>In stock</small>
                            </Row>
                            <Row>
                                <small><img alt="" src={require('../../icon.png')} style={{ maxWidth: '10%', minHeight: '10%', maxHeight: '0%' }} /></small>

                            </Row>

                            <Row>
                                <Form.Check aria-label="option 1" onChange={this.giftCheckBox} label={<small>This is a gift</small>}
                                />

                            </Row>
                            <Row>
                                {this.state.showTextArea && <div>

                                    <Form>
                                        <Form.Control as="textarea" rows="3" placeholder="Enter gift message..." onChange={this.onChangeMessage} value={this.state.giftMessage} />
                                    </Form>
                                    <Button variant="info">Save</Button>
                                </div>}
                            </Row>
                            <Row>
                                Qty
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Control as="select" custom>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Row>
                        </Col>
                        <Col xs={1}>
                            <strong><p style={{ color: '#B12704' }}>$11.98</p></strong>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default EachProductCart;
