import React from 'react';
import { Button , Col, Container, Form, Card , Modal} from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';
import {Redirect} from 'react-router';

class AddressCard extends React.Component {

    constructor(){
        super();
        this.state = {
          showModal: false,
          redirect: ''
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    onEditClick = e => {
        e.preventDefault();
        this.setState({ redirect: <Redirect to={{pathname: '/user/address/editAddress/', state: {addressCard: this.props.addressCard }}} /> });
      }
  
      onDeleteClick = e => {
        e.preventDefault();
        this.handleShow()
      }
  
      handleShow = () => {
        this.setState({showModal: true})
      }
  
      handleClose = () => {
        this.setState({showModal: false})
      }

      handleDelete = (e) => {
        e.preventDefault()
        const id = this.props.addressCard.id
        axios.delete(exportData.backenedURL + 'write/customer/profile/address/' + id, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status === 200) {
                console.log(res)
                this.setState({showModal: false})
                window.location.reload(true);
            } 
        })
      }
     

    render(){
        return(
          <div>
            {this.state.redirect}
                    <Card>
                        <Card.Header>
                          {this.props.addressCard.name}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Address Line 1: {this.props.addressCard.address1}
                            <br/>
                            Address Line 2: {this.props.addressCard.address2}
                            <br/>
                            City: {this.props.addressCard.city}
                            <br/>
                            State: {this.props.addressCard.state}
                            <br/>
                            Country: {this.props.addressCard.country}
                            <br/>
                            Zip Code: {this.props.addressCard.zipcode}
                            <br/>
                            Phone Number: {this.props.addressCard.phoneNumber}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button variant="outline-success" onClick={this.onEditClick}>Edit</Button>
                          &nbsp; &nbsp;
                          <Button variant="outline-danger" onClick={this.onDeleteClick}>Delete</Button>
                        </Card.Footer>
                    </Card>
                    <Modal show={this.state.showModal} onHide={this.handleClose} animation={false} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Address</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this address?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      No
                    </Button>
                    <Button variant="primary" onClick={this.handleDelete}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>           
          </div>
        );
    }
}

export default AddressCard;