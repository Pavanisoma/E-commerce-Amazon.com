import React from 'react';
import {Redirect} from 'react-router';
import { Button , Container, Card, CardColumns, Modal } from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';
import PaymentCard from './PaymentCard';

class ManageCards extends React.Component {

    constructor(){
        super();
        this.state = {
            showModal: false,
            paymentCards: [],
            redirect: ''
        }
    }

    onAddClick = e => {
      e.preventDefault();
      this.setState({ redirect: <Redirect to='/user/cards/addCard/' /> });
    }

    onEditClick = e => {
      e.preventDefault();
      this.setState({ redirect: <Redirect to='/user/cards/editCard/' /> });
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

    componentDidMount(){
      const id = localStorage.getItem("id")
      axios.get(exportData.backenedURL + 'read/customer/profile/' + id).then(res => {
        console.log(res)  
        if (res.status === 200) {
            this.setState({
              paymentCards : res.data.cards
            })
          }    
      })    
    }


    render(){
        return(
          <div>
            <Header />
            <Container>
                {this.state.redirect}
                <br/>
                <h2>Your Payment Options:</h2>
                <br/>
                <Button variant="dark" onClick={this.onAddClick}>Add Card</Button>
                <br/>
                <br/>
                <CardColumns>
                  {this.state.paymentCards.map((paymentCard)=>{
                    return <PaymentCard key={paymentCard.id} paymentCard={paymentCard}/>
                  })}
                </CardColumns>
                
            </Container>                
          </div>
        );
    }
}

export default ManageCards;