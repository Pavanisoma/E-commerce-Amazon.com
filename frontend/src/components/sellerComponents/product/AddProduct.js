import React from 'react';
import { Button , Col, Container, Form } from 'react-bootstrap';
import Header from "../../sellerComponents/sellerHeader/sellerHeader";
import axios from 'axios';
import exportData from '../../../config/config';
import {Redirect} from 'react-router';

class AddProduct extends React.Component {

    constructor(){
        super();
        this.state = {
            productName: '',
            price: '',
            categoryId: '',
            productDescription: '',
            fileArray: [],
            filePreviewUrls: [],
            categories: [],
            redirect: ''
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    componentDidMount(){
        axios.get(exportData.backenedURL + 'read/admin/category/').then(res => {
         console.log(res.data)  
           if (res.status === 200) {
               this.setState({
                 categories : res.data,
                 categoryId: res.data[0].id
               })
               
             }

        })
    }
    
    onSubmitHandler = e =>{
        const id = localStorage.getItem("id")
        const sellerName = localStorage.getItem("sellerName")
        const data = {
            productName: this.state.productName,
            sellerName: sellerName,
            price: this.state.price,
            rating: "",
            inventory: "100",
            description: this.state.productDescription,
            sellerId: id,
            categoryId: this.state.categoryId
        }
        
        axios.post(exportData.backenedURL + 'write/products/' + id, JSON.stringify(data), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
        .then(res => {
                if (res.status === 201) {
                    const productId = res.data.id
                    var fileArray = this.state.fileArray;
                    const formData = new FormData();
                    for(var i=0; i<fileArray.length; i++){
                        formData.append(i+1, fileArray[i]);
                    }
                    axios.put(exportData.backenedURL + 'write/products/' + productId + '/uploads', formData, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res)
                        } 
                    })
                    alert("Product added successfully")
                    this.setState({ redirect: <Redirect to='/sellerHome' /> });
                } 
        })
    }

    onSelectCategory = e => {
        this.setState({categoryId: e.target.value})
    }

    selectMultipleFiles = e => {
        e.preventDefault()
        var selectedFiles = e.target.files;
        var uploadedFiles = this.state.fileArray;
        var totalFiles = selectedFiles.length + uploadedFiles.length;
        if(totalFiles>5){
            alert("You are allowed to upload only 5 Images")
            e.preventDefault()
            document.getElementById("productImages").value = "" 
            return;
        } else {
            e.preventDefault()
            var fileArray = [...uploadedFiles, ...selectedFiles]
            this.setState({fileArray: fileArray})
            var filePreviewUrls = []
            for (let i = 0; i < fileArray.length; i++) {
                filePreviewUrls.push(URL.createObjectURL(fileArray[i]))
            }
            this.setState({filePreviewUrls: filePreviewUrls})
        }

    }


    render(){
        return(
          <div>
            <Header />
            <Container>
                {this.state.redirect}
                <br/>
                <h2>Add a New Product:</h2>
                <br/>
                <Form onSubmit={this.onSubmitHandler}>                    
                    <Form.Group>
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control id="productName" 
                                      value={this.state.productName} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Product Name"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control id="price" 
                                      value={this.state.price} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Price"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Product Category:</Form.Label>
                        <Form.Control as="select" onChange={this.onSelectCategory}>
                            {this.state.categories.map((category)=>{
                                return(
                                    <option value={category.id} label={category.categoryName}></option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Product Description:</Form.Label>
                        <Form.Control id="productDescription" 
                                      value={this.state.productDescription} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Product Description" 
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Label>Product Images:</Form.File.Label>
                            <div className="form-group multi-preview">
                                {(this.state.filePreviewUrls || []).map(url => (
                                    <div style={{float:"left"}}>  
                                        <img src={url} alt="..." width={150} height={150}/> 
                                        &nbsp; &nbsp; &nbsp;
                                    </div>
                                ))}
                            </div>
                            {/* <Button variant="primary" style={{float:"right"}}>Upload</Button> */}
                            <Form.File.Input onChange={this.selectMultipleFiles} multiple id="productImages"/>
                        </Form.File>
                    </Form.Group>
                    <br/>
                    <Button variant="warning" onClick={this.onSubmitHandler}>
                        Add Product
                    </Button>
                </Form>
            </Container>                
          </div>
        );
    }
}

export default AddProduct;