import React, { Component } from 'react'
import { Chart } from "react-google-charts";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { getSellers } from '../../../store/actions/adminActions/ordersActions';
import axios from 'axios';
import exportData from '../../../config/config';
import moment from 'moment';
import { Redirect } from 'react-router';

class SellerInfo extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            seller: this.props.location.state.seller ? this.props.location.state.seller : {},
            products: [],
            loading: true,
            monthWiseSale:[],
        }
    }

    async componentDidMount() {

        try {
            console.log(this.props.location.state.seller.id)
            //all products under seller api


            const response = await axios.get(exportData.backenedURL + 'read/seller/product/' + this.props.location.state.seller.id);
            console.log(response)

            if (response.data.length) {
                this.setState({
                    products: response.data
                })
            }
            else {

            }

            let monthWiseSaleArray = [];
            monthWiseSaleArray.push(['Based on sold products', 'Amount'])

            const monthWiseSale = await axios.get(exportData.backenedURL + 'read/admin/stats/seller/sales/' + this.state.seller.name);
            console.log(monthWiseSale)

            if (monthWiseSale.data) {
                monthWiseSaleArray.push(['Sales',monthWiseSale.data.total ])
               
            }
            else {

            }

            console.log(monthWiseSaleArray)
           
            this.setState({
                monthWiseSale:monthWiseSaleArray,
                loading: false
            })

        }
        catch (e) {
            console.log(e)
        }
    }


    render() {
        let redirectVar = null;
        if (!localStorage.getItem("id") || localStorage.getItem("usertype") !== 'admin') {
            redirectVar = <Redirect to="/unauthorised" />
        }

        return (
            <div>
                {redirectVar}
                <div>
                    {!this.state.loading && <div>
                        <Row>
                            <br></br>
                            <Col md={3}></Col>
                            <Col md={5}>
                            <Card>
                                    <Card.Body>
                                        <Chart

                                            width={'500px'}
                                            height={'300px'}
                                            chartType="Bar"
                                            loader={<div>Loading Chart</div>}
                                            data={this.state.monthWiseSale}
                                            options={{
                                                chart: {
                                                    title: 'Month wise sale of '+this.state.seller.name,
                                                    subtitle:  moment().format('MMM') + ", " + moment().format("YYYY"),
                                                },
                                            }}

                                        />
                                    </Card.Body>
                                </Card>


                                {/* <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="Bar"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Year', 'Sales', 'Expenses', 'Profit'],
                                        ['2014', 1000, 400, 200],
                                        ['2015', 1170, 460, 250],
                                        ['2016', 660, 1120, 300],
                                        ['2017', 1030, 540, 350],
                                    ]}
                                    options={{
                                        chart: {
                                            title: 'Company Performance',
                                            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                                        },
                                    }}
                                /> */}
                            </Col>


                        </Row>
                        
                        <Row>
                            <Col md={1}></Col>
                            <Col md={8}>

                            {this.state.products.length ? <div>
                                <br></br>
                                <h2 style={{marginLeft:'35%'}}>List of products</h2>
                                <br></br>
                                <Row>
                                        {this.state.products.map((product, i) => {
                                            console.log(product)
                                            return (<Col md={4} key={i}>
                                                <Card style={{ width: '20rem' }}>
                                                    <Card.Img variant="top"    src={product.thumbNail} />
                                               
                                             <Card.Body> 
                                             <Row>
                                                  
                                                  <Col md={12}>
                                            <h5 style={{color:'#1e7e34'}}>{product.productName}</h5>
                                                  </Col>
                                                 
                                             </Row>
                                              <Row>
                                                  
                                                  <Col md={12}>
                                            <p>Price: {product.price}</p>
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
                                        <h2>No mapped products!</h2></div>}

                            {this.state.products.map((product, i)=>{

                            })}
                            </Col>
                        </Row>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { totalSellers: state.totalSellers }
}

export default connect(mapStateToProps, { getSellers })(SellerInfo);