import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import exportData from "../../../config/config";
import Form from "react-bootstrap/Form";
import ProductCard from "../../clientComponents/products/productCard";
import "../../CSS/styles.css";
import Header from "../../header/header";
import { connect } from 'react-redux';
import { getALLProducts } from '../../../store/actions/clientActions/productsActions';

class AdminHome extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

async componentDidMount() {

    await  this.props.getALLProducts()
    this.setState({
        loading: false
    })
  
  //  console.log(this.allProducts.data)

}

displayProducts = () => {
  //for loop
  for(let i=0; i<this.props.allProducts.length; i+=3){
    return (<div>
      <Row>
        <Col md={4}>
     { this.props.allProducts[i] && <ProductCard  cproducts = {this.props.allProducts[i]} key={i}/>}
     </Col>
     <Col md={4}>
    { this.props.allProducts[i+1] && <ProductCard  cproducts = {this.props.allProducts[i+1]} key={i+1}/> }
    </Col>
    { this.props.allProducts[i+2] && <ProductCard  cproducts = {this.props.allProducts[i+2]} key={i+2}/>}
    </Row>
    </div>)
  }
}
  render() {
    const products = this.props.allProducts
    console.log(products);
    return (
      <div>
        <div>
          <Header />
        </div>
        <Container fluid>
          <Row>
            <Col md={3}>
              {/* <h4>Sellers Categories</h4> */}
              <span className="block-example border border-dark">
                {/* <Container className="themed-container"> </Container> */}
                {/* <Form>
                  {["1", "2", "3", "4", "5"].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id={`product-${type}`}
                        label={` Seller ${type}`}
                      />
                    </div>
                  ))}
                </Form> */}
              </span>
            </Col>

            <Col md={9}>
              {this.displayProducts()}
              {/* {this.props.allProducts.map((product, ind)=>{    
              return (<Row><Col sm = {12}><ProductCard  cproducts = {product} key={ind}/></Col></Row>)
            })} */}
            </Col>
          </Row>
          <Row>PageNation</Row>
        </Container>
      </div>
    );
  }
}


//fetching from store
const mapStateToProps = (state) => {
  return { allProducts: state.allProducts }
}

export default connect(mapStateToProps, { getALLProducts })(AdminHome);

