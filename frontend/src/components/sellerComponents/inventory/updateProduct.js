import React, { Component } from 'react'
import { Button , Container, Form } from 'react-bootstrap';
import {Redirect} from 'react-router';
import axios from 'axios';
import exportData from '../../../config/config';

export default class updateProduct extends Component {
    constructor(props){
        super(props);
        console.log(this.props)
        this.state={
         
            loading:true,
          

        }
    }

    async componentDidMount(){
        try{
            this.setState({
                product:this.props.location.state.productInfo,
                productName:this.props.location.state.productInfo.productName,
                description:this.props.location.state.productInfo.description,
                price:this.props.location.state.productInfo.price,
                loading:false
            })
        }
        catch(e){
            console.log(e)
        }
    }
    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };
    onCancelClick = e => {
        e.preventDefault();
        this.setState({ redirect: <Redirect to='/seller/inventory/' /> });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        let data = {
            "productName":this.state.productName,
            "price":this.state.price,
            "description":this.state.description
        }
         axios.put(exportData.backenedURL + 'write/products/'+this.state.product.id, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
    
            }
        })
            .then(async res => {
                if (res.status >= 400) {
                    console.log(res)
                }
                else {
                    this.setState({ redirect: <Redirect to='/seller/inventory/' /> });
                    console.log(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
      
    }
    render() {
        return (
            <div>
                  <Container>
                {this.state.redirect}
                <br/>
                {!this.state.loading && <div>
                <h2>Edit Product:</h2>
                <br/>
                <Form onSubmit={this.onSubmitHandler}>                    
                    <Form.Group>
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control id="productName" 
                                      value={this.state.productName} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Product name"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Product Price($):</Form.Label>
                        <Form.Control id="price" 
                                      value={this.state.price} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Product Price"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Product Description:</Form.Label>
                        <Form.Control id="description" 
                                      value={this.state.description} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Product Description" 
                                      required/>
                    </Form.Group>

                   
                    <br/>
                    <Button variant="success" type="submit">
                        Save Changes
                    </Button>
                    &nbsp; &nbsp;
                    <Button variant="cancel" onClick={this.onCancelClick}>
                        Cancel
                    </Button>
                </Form>
                </div>}     
            </Container>       
            </div>
        )
    }
}
