import React from 'react';
import {Redirect} from 'react-router';
import { Button , Container, Card, CardColumns, Modal } from 'react-bootstrap';
import Header from "../../header/header";
import axios from 'axios';
import exportData from '../../../config/config';
import AddressCard from './AddressCard';

class ManageAddresses extends React.Component {

    constructor(){
        super();
        this.state = {
            showModal: false,
            addressCards: [],
            redirect: ''
        }
    }

    onAddClick = e => {
      e.preventDefault();
      this.setState({ redirect: <Redirect to='/user/address/addAddress/' /> });
    }

    componentDidMount(){
      const id = localStorage.getItem("id")
      axios.get(exportData.backenedURL + 'read/customer/profile/' + id).then(res => {
        console.log(res)  
        if (res.status === 200) {
            this.setState({
              addressCards : res.data.customerAddresses
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
                <h2>Your Addresses:</h2>
                <br/>
                <Button variant="dark" onClick={this.onAddClick}>Add Address</Button>
                <br/>
                <br/>
                <CardColumns>
                  {this.state.addressCards.map((addressCard)=>{
                    return <AddressCard key={addressCard.id} addressCard={addressCard} />
                  })}
                </CardColumns>
                
            </Container>                
          </div>
        );
    }
}

export default ManageAddresses;