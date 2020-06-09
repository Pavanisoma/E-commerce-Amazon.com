import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import exportData from '../../../config/config';
import moment from 'moment';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getSellers } from '../../../store/actions/adminActions/ordersActions';
import { filteredSellers } from '../../../store/actions/adminActions/sellerActions';
import { Redirect } from 'react-router';


class SellerList extends Component {

    state = {
        sellersList:[],

    };


    async componentDidMount() {
        await this.props.getSellers();
        this.setState({
            sellersList:this.props.totalSellers
        })

    }

    handleChangeSeller = (e) => {
        let filteredlist = [];
        if(e){
            console.log(this.state.sellersList);
            for(let i =0; i<this.state.sellersList.length;i++){
                if(this.state.sellersList[i].name === e.value){
                    filteredlist.push(this.state.sellersList[i])
                }
            }
        }
        else{
            filteredlist = this.state.sellersList
        }

      //  console.log(filteredlist)
        this.props.filteredSellers(filteredlist)
    }


    render() {
        //console.log(this.props.totalSellers);
        const options = [];
        this.props.totalSellers.map((seller) => {
            options.push({ value: seller.name, label: seller.name })
        })

        let redirectVar = null;
        if (!localStorage.getItem("id") || localStorage.getItem("usertype") !== 'admin') {
            redirectVar = <Redirect to="/unauthorised" />
        }


        return (
            <div>
            {redirectVar}
                <div>
                    <div>
                        <br></br>
                        <Row>
                            <Col md={1}>
                            </Col>
                            <Col md={10}>
                                <Card>
                                    <br></br>
                                    <Row>
                                        <Col xs={1}></Col>

                                        <Col xs={10}>
                                            <Select
                                                onChange={this.handleChangeSeller}
                                                options={options}
                                                isClearable={true}
                                                placeholder="Select seller name"
                                            />
                                        </Col>
                                        <Col xs={1}></Col>


                                    </Row>
                                    <br></br>
                                </Card>

                            </Col>
                            <Col md={1}>


                            </Col>

                        </Row>
                        <br></br>
                        <Row>
                            <Col md={1}>


                            </Col>

                            <Col md={10}>
                                
                                    {this.props.totalSellers.length ? <Row>
                                        {this.props.totalSellers.map((seller, i) => {


                                            return (<Col md={4} key={i}>
                                                <Card style={{ width: '20rem' }}>
                                                    <Card.Img variant="top" src={seller.profilePicUrl} />
                                                    <Card.Body>
                                                        {/* <Card.Title>Card Title</Card.Title>
                                               
                                            </Card.Body>
                                            hello
                                             <Card.Body> */}
                                              <Link to={{pathname:"/admin/sellers/sellerInfo/", state:{seller:seller}}} >{seller.name}</Link>

                                                    </Card.Body>
                                                </Card>
                                            </Col>)
                                        })

                                        }
                                    </Row> : <div></div>}


                                
                            </Col>

                        </Row>
                        <br></br>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { totalSellers: state.totalSellers }
}

export default connect(mapStateToProps, { getSellers, filteredSellers })(SellerList);