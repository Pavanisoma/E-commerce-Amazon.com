import React,{Component} from 'react';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import exportData from '../../config/config';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Redirect } from "react-router";
import Logo from '../../images/Amazon.svg'




class MainHeader extends Component {

  logout = e => {
   localStorage.removeItem('id');
   localStorage.removeItem('usertype');
   window.location.href='/'
  }
    

render(){
  
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/"> <img src = {Logo} height='30px' width='120px'/></Navbar.Brand>
    <Form inline>
      <FormControl type="text" placeholder="Search" bg="light" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
    <Nav className="mr-auto">
      <Nav.Link href="/signIn">SignIn</Nav.Link>
      <Nav.Link href="/signup">SignUp</Nav.Link>
    </Nav>
    {/* <DropdownButton id="dropdown-item-button" title="Dropdown button" variant="Secondary">
  <Dropdown.Item as="button">Profile</Dropdown.Item>
  <Dropdown.Item as="button" onClick={this.logout}>Logout</Dropdown.Item>
  <Dropdown.Item as="button">Something else</Dropdown.Item>
</DropdownButton> */}
  </Navbar>
  );
 }
}

export  default MainHeader;