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
            selectedFile: '',
            filePreviewUrl : '',
            profilePic: '',
            temporaryName: '',
            productReviews: [],
            showModal: false
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    onEditClick = e => {
        e.preventDefault();
        this.handleShow()
    }

    handleShow = () => {
        var filePreviewUrl = this.state.profilePic
        var temporaryName = this.state.name
        this.setState({
            showModal: true,
            filePreviewUrl: filePreviewUrl,
            temporaryName: temporaryName
        })
    }
  
    handleClose = () => {
        this.setState({
            showModal: false,
            filePreviewUrl: '',
            temporaryName: ''
        })
    }

    handleSave = () => {
        const id = localStorage.getItem("id")
        const data = {
            name: this.state.temporaryName
        }
        axios.put(exportData.backenedURL + 'write/customer/profile/' + id, JSON.stringify(data), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status === 200) {
                console.log(res)
                var name = this.state.temporaryName
                this.setState({name: name})
                const formData = new FormData();
                formData.append('upl', this.state.selectedFile)
                axios.put(exportData.backenedURL + 'write/customer/profile/upload/' + id, formData, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
                .then(res => {
                    if (res.status === 200) {
                        this.setState({profilePic: res.config.url})
                    } 
                })
                this.setState({showModal: false})
            } 
        })
    }

    onFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0],
            filePreviewUrl : URL.createObjectURL(e.target.files[0])
        });
    }

    componentDidMount(){
        const id = localStorage.getItem("id")
        axios.get(exportData.backenedURL + 'read/customer/profile/' + id).then(res => {
          console.log(res)  
          if (res.status === 200) {
              this.setState({
                name : res.data.name,
              })
              if(res.data.profilePicUrl==null){
                  this.setState({profilePic : DefaultProfilePic})
              } else {
                this.setState({profilePic : res.data.profilePicUrl})
              }
            }    
        })
        
        // axios.get(exportData.backenedURL + 'read/customer/comments/' + id).then(res => {
        //     console.log(res)  
        //     if (res.status === 200) {
        //         this.setState({
        //             productReviews: res.data
        //         })
        //       }    
        //   })
    }

    render() {
        return (
          <div>
            <Header />
            {/* Profile Component  */}
            <div style={{float:"left", width:"20%", marginLeft:"15%"}}>
                <h2>Your Profile:</h2>
                <br/>
                <Card>
                    <Card.Img variant="top" src={this.state.profilePic} height={200}/>
                    <Card.Body>
                        <Card.Title>{this.state.name}</Card.Title>
                        <br/>
                        <center>
                            <Button variant="warning" onClick={this.onEditClick}>Edit your Profile</Button>
                        </center>
                    </Card.Body>
                </Card>
            </div>
            {/* Comments And Ratings Component  */}
            {/* <div style={{float:"left", marginLeft:"5%"}}>
                <h2>Product Reviews and Comments:</h2>
                <br/>
                <h3>Product Comments: </h3>
                <br/>
                {this.state.productReviews.map((productReview)=>{
                    return (
                        <Media>
                            <img width={64} height={64} className="mr-3"
                                src={this.state.profilePic}
                                alt="Generic placeholder"/>
                            <Media.Body>
                                <a href="#">
                                    <h5>{productReview.productName}</h5>
                                </a>
                                Rating: {productReview.votes} 
                                <hr/>
                            </Media.Body>
                        </Media>
                    )
                })}
                <hr/> */}
                {/* <h3>Product Comments:</h3>
                <br/>                
                {this.state.productReviews.map((productReview)=>{
                    return (
                        <Media>
                            <img width={64} height={64} className="mr-3"
                                src={this.state.profilePic}
                                alt="Generic placeholder"/>
                            <Media.Body>
                                <a href="#">
                                    <h5>{productReview.productName}</h5>
                                </a>
                                Comments: {productReview.comments} 
                                <hr/>
                            </Media.Body>
                        </Media>
                    )
                })} */}
            {/* </div> */}
            {/* Edit Profile Modal  */}
            <Modal show={this.state.showModal} onHide={this.handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.File.Label>Profile Picture:</Form.File.Label>
                    <br/>
                    <center>
                        <Image src={this.state.filePreviewUrl} width={280} height={200}>
                        </Image>
                    </center>
                    <br/>
                    <div className="mb-3">
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Input onChange={this.onFileSelect} required/>
                        </Form.File>
                    </div>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control placeholder="Name" 
                                    value={this.state.temporaryName} 
                                    id="temporaryName"
                                    required
                                    onChange={this.onChangeHandler}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={this.handleSave}>
                        Save Changes
                    </Button>
                    <Button variant="light" onClick={this.handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
          </div>
        );
    }
}

export default Profile;
