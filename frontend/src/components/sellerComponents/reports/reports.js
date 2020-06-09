import React, { Component } from 'react'
import { Chart } from "react-google-charts";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import exportData from '../../../config/config';
import moment from 'moment';
import { Redirect } from 'react-router';
import Header from '../sellerHeader/sellerHeader'

let seller_id = localStorage.getItem('id');

let sellerName = localStorage.getItem('sellerName');
class Reports extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
           
            products: [],
            loading: true,
            monthWiseSale:[],
            sellerDataProducts:[],
            sellerDataAmount:[],
        }
    }

    async componentDidMount() {

        try {
            //all products under seller api

            let sellerDataProductArray = [];
            let sellerDataAmountArray = []
            sellerDataAmountArray.push(['Seller Data', 'Amount'])
            sellerDataProductArray.push(
                ['Seller Data', 'Quantity'],
                //  ['2014', 1000, 400],
                //  ['2015', 1170, 460],
                //  ['2016', 660, 1120],
                //  ['2017', 1030, 540],
            );

            const response = await axios.get(exportData.backenedURL + 'read/seller/orders/' + sellerName);

  //          console.log(response.data)
            let tempProducts = [];
            let tempAmount =[];
            let m = 0;
            let tempQuantity = [];
            if (response.data.length) {
                response.data.map((order)=>{
                    if(order.products && order.products.length){
                        order.products.map((product)=>{
                            if(product.sellerName === sellerName){
                           //     console.log(product)
                                let index = tempProducts.indexOf(product.productName)
                                if( index > -1){
                                    tempAmount[index] =  tempAmount[index] + product.totalPrice;
                                    tempQuantity[index] = tempQuantity[index] + product.quantity;
                                }
                                else{
                                    tempProducts[m] = product.productName;
                                    tempQuantity[m] = product.quantity;
                                    tempAmount[m] =  product.totalPrice;
                                    m++;
                                 }
                              //  if(product.orderStatus === 1 || product.orderStatus === "1"){
                               //   console.log(product.productName, product.quantity, product.totalPrice)


                               //   sellerDataAmountArray.push([product.productName, product.totalPrice, moment(order.orderDate).format('DD/MM/YYYY')])
                                 // sellerDataProductArray.push([product.productName, product.quantity, moment(order.orderDate).format('DD/MM/YYYY')])

                                //}
                            }
                        })
                    }
                })

                for(let i =0; i<tempProducts.length;i++){
                    sellerDataAmountArray.push([tempProducts[i], tempAmount[i]])
                    sellerDataProductArray.push([tempProducts[i], tempQuantity[i]])

                }
                this.setState({
                    products: response.data
                })
            }
            else {

            }
            console.log(sellerDataProductArray, sellerDataAmountArray)

            let monthWiseSaleArray = [];
            monthWiseSaleArray.push(['Based on sold products', 'Amount'])

            const monthWiseSale = await axios.get(exportData.backenedURL + 'read/admin/stats/seller/sales/' + sellerName);
            console.log(monthWiseSale)

            if (monthWiseSale.data) {
                monthWiseSaleArray.push(['Sales',monthWiseSale.data.total ])
               
            }
            else {

            }

            console.log(monthWiseSaleArray)
           
            this.setState({
                monthWiseSale:monthWiseSaleArray,
                sellerDataAmount:sellerDataAmountArray,
                sellerDataProducts:sellerDataProductArray,
                loading: false
            })

        }
        catch (e) {
            console.log(e)
        }
    }


    render() {
         let redirectVar = null;
         if (!localStorage.getItem("id") || localStorage.getItem("usertype") !== 'seller') {
             redirectVar = <Redirect to="/unauthorised" />
        }

        return (
            <div>
              <Header />
                <div>
                    {!this.state.loading && <div>
                        
                            <br></br>
                            <br></br>
                            <Row>
                            <Col md={1}></Col>
                            <Col md={6}>
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
                                                    title: 'Month wise sale ',
                                                    subtitle:  moment().format('MMM') + ", " + moment().format("YYYY"),
                                                },
                                               
                                            }}

                                        />
                                    </Card.Body>
                                </Card>
                                </Col>
                                </Row>
                                <br></br>
                                        <Row>
                                        <Col md={1}></Col>

                                <Col md={10}>
                            <Card>
                                    <Card.Body>

                            <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="Bar"
                                    loader={<div>Loading Chart</div>}
                                    data={this.state.sellerDataProducts}
                                    options={{
                                        chart: {
                                            title: 'Seller Data',
                                            subtitle: 'Products sold, quantities',
                                        },
                                        colors: ["#FB7A21"]

                                    }}
                                /> 
                                 </Card.Body>
                                </Card>
                            </Col>
                            </Row>
                            <Row>
                                        <Col md={1}></Col>

                                <Col md={10}>
                            <Card>
                                    <Card.Body>

                            <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="Bar"
                                    loader={<div>Loading Chart</div>}
                                    data={this.state.sellerDataAmount}
                                    options={{
                                        chart: {
                                            title: 'Seller Data',
                                            subtitle: 'Products sold, amount',
                                        },
                                        colors: ["#1e7e34"]
                                    }}
                                /> 
                                 </Card.Body>
                                </Card>
                            </Col>
                            </Row>
                            

                        
                           
                        
                    </div>}
                </div>
            </div>
        )
    }
}



export default (Reports);