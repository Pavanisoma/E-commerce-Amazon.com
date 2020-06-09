import React,{Component} from 'react';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import exportData from '../../config/config';



class CategoryList extends Component {
  
    

render(){
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/user/address/manageAddresses/">Delivery To</Navbar.Brand>
   
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
         <Nav.Link href="/user/cards/manageCards/">Manage Cards</Nav.Link>
        <Nav.Link href="#home">Whole Foods</Nav.Link>
        <Nav.Link href="#link">Prime video</Nav.Link>
        <Nav.Link href="#home">Help</Nav.Link>
        <Nav.Link href="#link">amazon.com</Nav.Link>
        <Nav.Link href="#home">Giftcards</Nav.Link>
        <Nav.Link href="#link">Buy Again</Nav.Link>
        <Nav.Link href="#home">Best Sellers</Nav.Link>
        <NavDropdown title="History" id="responsive-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Product 1</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Product 2</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Product 3</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#home">Find a Gift</Nav.Link>
        <Nav.Link href="#link">New Release</Nav.Link>
        <Nav.Link href="#home">3 Months Free Amazon Music</Nav.Link>
      </Nav>
     
    </Navbar.Collapse>
  </Navbar>
  );
 }
}

export  default CategoryList;