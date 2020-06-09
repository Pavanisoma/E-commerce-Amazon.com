import React from 'react';
import { Col , Row, Container, Form, Card, Button, Media, Modal, Image } from 'react-bootstrap';
import Header from "../../header/header";
import DefaultProfilePic from '../../../images/default-profile.png'
import axios from 'axios';
import exportData from '../../../config/config';

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            name:'',
            profilePic: '',
            city: '',
            state: '',
            country: '',
            productsAdded: []
        }
    }

    async componentDidMount(){
        // const id = localStorage.getItem("user_id")
        const id = localStorage.getItem("id")
        axios.get(exportData.backenedURL + 'read/seller/profile/' + id).then(res => {
            console.log(res)  
            if (res.status === 200) {
                this.setState({
                    name : res.data.name,
                    city: res.data.city,
                    state: res.data.state,
                    country: res.data.country
                })
                if(res.data.profilePicUrl==null){
                    this.setState({profilePic : DefaultProfilePic})
                } else {
                  this.setState({profilePic : res.data.profilePicUrl})
                }
            }    
        })
        axios.get(exportData.backenedURL + 'read/seller/product/' + id).then(res => {
            console.log(res)  
            if (res.status === 200) {
                this.setState({
                    productsAdded : res.data
                })
            }    
        })   
    
    }

    render() {
        return (
          <div>
            <Header />
            <div style={{float:"left", width:"25%", marginLeft:"15%"}}>
                <h2>Your Profile:</h2>
                <br/>
                <Card>
                    <Card.Img variant="top" src={this.state.profilePic} 
                              width={200} height={200}/>
                    <Card.Body>
                        <Card.Title>{this.state.name}</Card.Title>
                        Located At: {this.state.city + ", " + this.state.state + ", " + this.state.country}
                    </Card.Body>
                </Card>
            </div>
            <div style={{float:"left", marginLeft:"5%"}}>
                <h2>Products Added:</h2>
                <br/>
                {this.state.productsAdded.map((product)=>{
                    return (
                        <Media>
                            <img width={64} height={64} className="mr-3"
                                src={DefaultProfilePic}
                                alt="Generic placeholder"/>
                            <Media.Body>
                                <a href="#">
                                    <h5>{product.productName}</h5>
                                </a>
                                <br/>
                                <hr/>
                            </Media.Body>
                        </Media>
                    )
                })}
            </div>
          </div>
        );
    }
}

export default Profile;
