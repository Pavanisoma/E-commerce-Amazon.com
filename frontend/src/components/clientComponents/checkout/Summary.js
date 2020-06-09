import React from 'react';
import { Col , Row, Container, Form, Card, Button, Media, Modal, Image } from 'react-bootstrap';
import Header from "../../header/header";
import DefaultProfilePic from '../../../images/default-profile.png'
import axios from 'axios';
import exportData from '../../../config/config';

class SummaryPage extends React.Component {

    constructor() {
        super();
        this.state = {
            name:"Sumeet Deshpande",
            profilePic: ''
        }
    }

    componentDidMount(){
        // const id = localStorage.getItem("user_id")
        // const id = 1
        axios.get(exportData.backenedURL + 'read/customer/profile/' + id).then(res => {
          console.log(res)  
          if (res.status === 200) {
              this.setState({
                name : res.data.name,
                profilePic: res.data.profilePicUrl
              })
            }    
        })    
    }

    render() {
        return (
          <div>
            <Header />
                <Container>
                    <h1>Summary Page:</h1>

                </Container>
            
          </div>
        );
    }
}

export default SummaryPage;
