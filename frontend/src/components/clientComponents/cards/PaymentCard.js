import React from 'react';
import { Button , Col, Container, Form, Card , Modal} from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';
import {Redirect} from 'react-router';

class PaymentCard extends React.Component {

    constructor(){
        super();
        this.state = {
            showModal: false,
            redirect:''
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    onEditClick = e => {
        e.preventDefault();
        this.setState({ redirect: <Redirect to={{pathname: '/user/address/editCard/', state: {paymentCard: this.props.paymentCard }}} /> });
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

      handleDelete = () => {
        const id = this.props.paymentCard.id
        axios.delete(exportData.backenedURL + 'write/customer/profile/cards/' + id, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status === 200) {
                console.log(res)
                this.setState({showModal: false})
            } 
        })
      }
     

    render(){
        return(
          <div>
              {this.state.redirect}
              <Card>
                        <Card.Header>
                          {this.props.paymentCard.name}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Card Number: {this.props.paymentCard.cardNumber}
                            <br/>
                            Expiration Date: {this.props.paymentCard.expirationDate}
                            <br/>
                            Security Code or CVV: {this.props.paymentCard.cvv}
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
                    <Modal.Title>Delete Card</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this Card?</Modal.Body>
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

export default PaymentCard;