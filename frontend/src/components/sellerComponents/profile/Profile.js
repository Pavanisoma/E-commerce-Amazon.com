import React from 'react';
import { Col , Row, Container, Form, Card, Button, Media, Modal, Image } from 'react-bootstrap';
import Header from "../../sellerComponents/sellerHeader/sellerHeader";
import DefaultProfilePic from '../../../images/default-profile.png'
import axios from 'axios';
import exportData from '../../../config/config';

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            name:'',
            address1: '',
            address2: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            profilePic: '',
            selectedFile: '',
            filePreviewUrl : '',
            temporaryName: '',
            productsAdded: [],
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
        var temporaryAddress1 = this.state.address1
        var temporaryAddress2 = this.state.address2
        var temporaryCity = this.state.city
        var temporaryState = this.state.state
        var temporaryCountry = this.state.country
        var temporaryZipcode = this.state.zipcode
        this.setState({
            showModal: true,
            filePreviewUrl: filePreviewUrl,
            temporaryName: temporaryName,
            temporaryAddress1 : temporaryAddress1,
            temporaryAddress2 : temporaryAddress2,
            temporaryCity : temporaryCity,
            temporaryState: temporaryState,
            temporaryCountry: temporaryCountry,
            temporaryZipcode: temporaryZipcode
        })
    }
  
    handleClose = () => {
        this.setState({
            showModal: false,
            filePreviewUrl: '',
            temporaryName: '',
            temporaryAddress1 : '',
            temporaryAddress2 : '',
            temporaryCity : '',
            temporaryState: '',
            temporaryCountry: '',
            temporaryZipcode: ''
        })
    }

    handleSave = () => {
        const id = localStorage.getItem("id")
        const data = {
            name: this.state.temporaryName,
            address1: this.state.temporaryAddress1,
            address2: this.state.temporaryAddress2,
            city: this.state.temporaryCity,
            state: this.state.temporaryState,
            country: this.state.temporaryCountry,
            zipcode: this.state.temporaryZipcode
        }
        axios.put(exportData.backenedURL + 'write/seller/profile/data/' + id, JSON.stringify(data), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status === 200) {
                console.log(res)
                var name = this.state.temporaryName
                var address1= this.state.temporaryAddress1
                var address2= this.state.temporaryAddress2
                var city= this.state.temporaryCity
                var state= this.state.temporaryState
                var country= this.state.temporaryCountry
                var zipcode= this.state.temporaryZipcode
                this.setState({
                    name: name,
                    address1: address1,
                    address2: address2,
                    city: city,
                    state: state,
                    country: country,
                    zipcode: zipcode
                })
                const formData = new FormData();
                formData.append('upl', this.state.selectedFile)
                axios.put(exportData.backenedURL + 'write/seller/profile/upload/' + id, formData, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
                .then(res => {
                    console.log(res.config.url)
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

    async componentDidMount(){
        
        const id = localStorage.getItem("id")
        await axios.get(exportData.backenedURL + 'read/seller/profile/' + id).then(res => {
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
        await axios.get(exportData.backenedURL + 'read/seller/product/' + id).then(res => {
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
                        <br/>
                        <br/>
                        <center>
                            <Button variant="warning" onClick={this.onEditClick}>Edit your Profile</Button>
                        </center>
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
                                src={this.state.profilePic}
                                alt="Generic placeholder"/>
                            <Media.Body>
                                <a id={product.id}>
                                    <h5>{product.productName}</h5>
                                </a>
                                <br/>
                                <hr/>
                            </Media.Body>
                        </Media>
                    )
                })}
            </div>
            <Modal show={this.state.showModal} onHide={this.handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Image src={this.state.filePreviewUrl} width={280} height={200}>
                        </Image>
                    </center>
                    <hr/>
                    <div className="mb-3">
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Label>Profile Picture:</Form.File.Label>
                            <Form.File.Input onChange={this.onFileSelect}/>
                        </Form.File>
                    </div>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control placeholder="Name" 
                                    value={this.state.temporaryName} 
                                    id="temporaryName"
                                    required
                                    onChange={this.onChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Street Address Line 1:</Form.Label>
                            <Form.Control id="temporaryAddress1" 
                                        value={this.state.temporaryAddress1} 
                                        onChange={this.onChangeHandler} 
                                        placeholder="Street Address Line 1"
                                        required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Street Address Line 2:</Form.Label>
                            <Form.Control id="temporaryAddress2" 
                                        value={this.state.temporaryAddress2} 
                                        onChange={this.onChangeHandler} 
                                        placeholder="Street Address Line 2" 
                                        required/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>City:</Form.Label>
                                <Form.Control id="temporaryCity" 
                                            value={this.state.temporaryCity} 
                                            onChange={this.onChangeHandler} 
                                            placeholder="City"
                                            required/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>State:</Form.Label>
                                <Form.Control id="temporaryState" 
                                            value={this.state.temporaryState} 
                                            onChange={this.onChangeHandler} 
                                            placeholder="State"
                                            required/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Zip Code:</Form.Label>
                                <Form.Control id="temporaryZipcode" 
                                            type="number" value={this.state.temporaryZipcode} 
                                            onChange={this.onChangeHandler} 
                                            placeholder="Zip Code"
                                            required/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Country:</Form.Label>
                            <Form.Control id="temporaryCountry" 
                                        value={this.state.temporaryCountry} 
                                        onChange={this.onChangeHandler} 
                                        placeholder="Country" 
                                        required/>
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
