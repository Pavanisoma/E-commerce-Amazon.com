import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import exportData from '../../../config/config';
import axios from 'axios';
import Select from 'react-select';
import { Redirect } from 'react-router';
import Header from '../sellerHeader/sellerHeader';

//localStorage.getItem('id');
//let sellerID = localStorage.getItem('id');
let sellerID = localStorage.getItem('id');
let sellerName = localStorage.getItem('sellerName');

class SellerInventory extends Component {

    constructor() {
        super()
        this.state = {
            products: [],
            productsDropDown: [],
            productsBkUp: [],
            loading:true,
        }
    }

    async componentDidMount() {
        try {

            const response = await axios.get(exportData.backenedURL + 'read/seller/product/' + localStorage.getItem('id'));
            console.log(response)
            let productsDropDownArray = [];

            if (response.data.length) {
                response.data.map((product) => {
                    productsDropDownArray.push({ value: product.id, label: product.productName })
                })
                this.setState({
                    products: response.data,
                    productsBkUp: response.data,

                    productsDropDown: productsDropDownArray
                })
            }
            else {

            }

            this.setState({
                loading: false
            })

        }
        catch (e) {
            console.log(e)
        }
    }

    handleChangeProduct = (e) => {
        if (e) {
            let filteredData = [];
            for(let i = 0; i <this.state.productsBkUp.length; i++){
                if(e.value === this.state.productsBkUp[i].id){
                    filteredData.push(this.state.productsBkUp[i]);
                }
                this.setState({
                    products:filteredData
                })
            }
        }
        else {
            this.setState({
                products: this.state.productsBkUp
            })
        }
    }

    loadAllData = async () => {
        try {
            //all products under seller api
            const response = await axios.get(exportData.backenedURL + 'read/seller/product/' + sellerID);
            console.log(response)
            
            let productsDropDownArray = [];

            if (response.data.length) {
                response.data.map((product) => {
                    productsDropDownArray.push({ value: product.id, label: product.productName })
                })
                this.setState({
                    products: response.data,
                    productsBkUp: response.data,

                    productsDropDown: productsDropDownArray
                })
            }
            else {
                this.setState({
                    products: [],
                    productsBkUp: [],

                    productsDropDown: []
                })
            }
            this.setState({
                loading: false
            })

        }
        catch (e) {
            console.log(e)
        }
    }

    removeProduct = (product, e) => {
        //console.log(product);
        axios.delete(exportData.backenedURL + 'write/products/' + product.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
        })
            .then(async res => {
                if (res.status >= 400) {
                    console.log(res)
                }
                else {
                    console.log(res)
                    this.loadAllData()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateProduct = (product, e) => {

    }
    addProduct = () => {
        this.setState({ redirect: <Redirect to='/seller/product/addProduct' /> });

    }


    render() {
        return (
            <div>
                {this.state.redirect}
                <div>
                    <Header />
                </div>
                <div>
                    <div>
                        <Row>
                            <Col md={1}>
                            </Col>
                            <Col md={10}>
                                <Card>
                                    <br></br>
                                    <Row>
                                        <Col xs={1}></Col>

                                        <Col xs={5}>
                                            <Select
                                                onChange={this.handleChangeProduct}
                                                options={this.state.productsDropDown}
                                                isClearable={true}
                                                placeholder="Select product name"
                                            />

                                        </Col>
                                        <Col xs={5}>
                                            <Button variant="success" onClick={this.addProduct}>Add Product</Button>

                                        </Col>

                                        <Col xs={1}></Col>


                                    </Row>
                                    <br></br>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={8}>

                                {!this.state.loading && this.state.products.length ? <div>
                                    <br></br>
                                    <h2 style={{ marginLeft: '35%' }}>List of products</h2>
                                    <br></br>
                                    <Row>
                                        {this.state.products.map((product, i) => {
                                            console.log(product)
                                            return (<Col md={4} key={i}>
                                                <Card style={{ width: '20rem' }}>
                                                    <Card.Img variant="top" src={product.thumbNail} style={{}}/>

                                                    <Card.Body>
                                                        <Row>

                                                            <Col md={12}>
                                                                <h5 style={{ color: '#1e7e34' }}>{product.productName}</h5>
                                                            </Col>

                                                        </Row>
                                                        <Row>

                                                            <Col md={12}>
                                                                <p>Price($): {product.price}</p>
                                                            </Col>

                                                        </Row>
                                                        <Row>

                                                            <Col md={6}>
                                                                {/* <Button variant="primary" onClick={(e)=>this.updateProduct(product, e)} >Update</Button> */}
                                                                <Button variant="primary"><Link to={{ pathname: "/seller/inventory/update/", state: { productInfo: product } }} style={{ color: 'black' }}>Update</Link></Button>
                                                            </Col>
                                                            <Col md={6}>
                                                                <Button variant="danger" onClick={(e) => this.removeProduct(product, e)}>Remove</Button>

                                                            </Col>

                                                        </Row>

                                                        {/* <Row>
                                                  
                                                  <Col md={4}>
                                                      <h4>Price:</h4>
                                                  </Col>
                                                  <Col md={4}>
                                            <h5>{product.price}</h5>
                                                  </Col>
                                             </Row> */}
                                                    </Card.Body>
                                                </Card>
                                            </Col>)
                                        })

                                        }
                                    </Row>
                                </div> : <div>
                                        <br></br>
                                        <br></br>

                                        <h4>No mapped products!</h4></div>}


                            </Col>
                        </Row>
                    </div>
                </div>

            </div>
        )
    }
}

export default SellerInventory;
