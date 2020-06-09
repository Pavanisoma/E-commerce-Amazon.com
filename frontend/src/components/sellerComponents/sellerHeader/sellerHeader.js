import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../../../images/Amazon.svg'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';

class SellerHeader extends Component {
    constructor(props){
        super(props)
    }

    logout = e => {
        localStorage.clear();
       window.location.href='/'
      }

    render(){
        return(
            <Navbar bg="dark" variant="dark">
                 <Navbar.Brand href="/"> <img src = {Logo} height='30px' width='120px'/></Navbar.Brand>
            <Nav className="mr-auto" style={{marginLeft:'5%'}}>
              <Nav.Link href="/sellerHome">Home</Nav.Link>
              <Nav.Link href="/seller/product/addProduct">Add Product</Nav.Link>
              <Nav.Link href="/seller/orders/">Orders</Nav.Link>
              <Nav.Link href="/seller/reports/">Reports</Nav.Link>
              <Nav.Link href="/seller/inventory/">Inventory</Nav.Link>
            </Nav>
            <DropdownButton id="dropdown-item-button" title="Seller"  bg="light" variant="dark">
  <Dropdown.Item  href="/seller/profile/"> Profile </Dropdown.Item>
  <Dropdown.Item as="button" onClick={this.logout}>Logout</Dropdown.Item>
  <Dropdown.Item as="button">Something else</Dropdown.Item>
</DropdownButton>
  </Navbar>
         
        );
    }

}

export default SellerHeader;