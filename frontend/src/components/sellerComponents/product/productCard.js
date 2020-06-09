import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button'
import Lion from '../../../images/lion.jpg';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import exportData from "../../../config/config";
import Axios from "axios";

class ProductCard extends Component{
  
  constructor(props){
    super(props);
    console.log(this.props);
  }
  state = {
    redirect: false,
  }

  getDetails = () => {
    console.log(this.props.cproducts.id)
    // localStorage.setItem('prod_id',this.props.cproducts.id);
  }

 deleteProduct = async () => {
 console.log(this.props.cproducts.id)
    await Axios.get(exportData.backenedURL + 'write/products/'+ this.props.cproducts.id)
    .then((response) => {
      let cat = []
      for (let i of response.data) {
  
        cat.push({ value: i.id, label: i.categoryName })
      }
      this.setState({ allCatgories: cat })
   
  
    })
    .catch((error) => {
  
      console.log(error);
    })


}

render(){
    return(
      <div>    
  <Card> 
    <Card.Img variant="top" src={Lion} />
    <Card.Body>
      <Card.Title>{this.props.cproducts.productName}</Card.Title>
      <Card.Text>
        Price :{this.props.cproducts.price}
        </Card.Text>
        {/* <Card.Link href="/user/Productdetails">View Product</Card.Link> */}
     <Button  variant="warning" type="button" onClick={this.getDetails} >View Product</Button>  
     <Button  variant="warning" type="button" onClick={this.deleteProduct} style={{marginLeft:'10px'}}>Delete Product</Button> 
    {/* <Link to={{ pathname: "/user/Productdetails", state: { productID: this.props.cproducts.id } }} style={{ color: 'black' }}>View Product</Link> */}
    </Card.Body>
  </Card>
  </div>
    );
 
}
}

export default ProductCard;