import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import exportData from '../../../config/config';
import { Redirect } from 'react-router';

class AdminInventory extends Component {

    constructor() {
        super();
        this.state = {
            addCategoryModal: false,
            remCategoryModal: false,
            products: [],
            categoryName: '',
            remCategoryName: '',
            categoryList: [],
            remCategoryList: [],
            loading: true
        }
    }

    async componentDidMount() {
        await axios.get(exportData.backenedURL + 'read/admin/category/noProductsMapped')
            .then((response) => {
                // categoryName: "clothing"
                // createdAt: "2020-05-07T19:11:20.000Z"
                // id: 2
                console.log(response.data);
                const options = [];
                if (response.data && response.data.length) {
                    response.data.map((category) => {
                        options.push({ value: category.id, label: category.categoryName })
                    })
                    this.setState({
                        remCategoryList: options
                    })
                }
                else {
                    this.setState({
                        remCategoryList: []
                    })
                }

            })
            .catch((error) => {

                console.log(error);
            })

        await axios.get(exportData.backenedURL + 'read/admin/category/')
            .then((response) => {
                // categoryName: "clothing"
                // createdAt: "2020-05-07T19:11:20.000Z"
                // id: 2
                console.log(response.data);
                const options = [];
                if (response.data && response.data.length) {
                    response.data.map((category) => {
                        options.push({ value: category.id, label: category.categoryName })
                    })
                    this.setState({
                        categoryList: options
                    })
                }
                else {
                    this.setState({
                        categoryList: []
                    })
                }

            })
            .catch((error) => {

                console.log(error);
            })
    }

    showAddModal = () => {
        this.setState({
            addCategoryModal: true,
            //  categoryName:''
        })
    }
    handleCloseAdd = () => {
        this.setState({
            addCategoryModal: false,
            categoryName: ''

        })
    }

    handleOkAdd = () => {

        //axios call to add category
        if (this.state.categoryName) {
            axios.post(exportData.backenedURL + 'write/admin/category/', JSON.stringify({
                categoryName: this.state.categoryName
            }), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                }
            })
                .then(res => {
                    if (res.status >= 400) {
                        console.log(res)

                    }
                    else {
                        console.log(res)
                        this.loadAllData()

                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        this.setState({
            categoryName: ''
        })
    }

    showRemModal = () => {
        this.setState({
            remCategoryModal: true
        })
    }

    handleCloseRem = () => {


        this.setState({
            remCategoryModal: false
        })

    }

    handleOkRem = () => {
        //axios call to remove category


    }

    onChangeName = (e) => {
        this.setState({
            categoryName: e.target.value
        })
    }

    getProductsById = (e) => {
        if (e) {
            axios.get(exportData.backenedURL + 'read/admin/category/' + e.value)
                .then((response) => {
                   
                 //   console.log(response.data[0].products);
                    const options = [];
                    if (response.data[0] && response.data[0].products) {

                        this.setState({
                            products: response.data[0].products
                        })
                    }
                    else {
                        this.setState({
                            products: []
                        })
                    }

                })
                .catch((error) => {

                    console.log(error);
                })
        }
        else{
            this.setState({
                products: []
            })
        }

    }

    handleChangRemCategory = (e) =>{
        if(e){
        this.setState({
            remCategoryName:e.value
        })
    }
    else{
        this.setState({
            remCategoryName:''
        })
    }
    }

    removeCategory = () => {
        
         axios.delete(exportData.backenedURL + 'write/admin/category/'+this.state.remCategoryName, {
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
                console.log(res)
                    this.loadAllData()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    loadAllData = async () => {
        await axios.get(exportData.backenedURL + 'read/admin/category/noProductsMapped')
        .then((response) => {
            // categoryName: "clothing"
            // createdAt: "2020-05-07T19:11:20.000Z"
            // id: 2
            console.log(response.data);
            const options = [];
            if (response.data && response.data.length) {
                response.data.map((category) => {
                    options.push({ value: category.id, label: category.categoryName })
                })
                this.setState({
                    remCategoryList: options
                })
            }
            else {
                this.setState({
                    remCategoryList: []
                })
            }

        })
        .catch((error) => {

            console.log(error);
        })

    await axios.get(exportData.backenedURL + 'read/admin/category/')
        .then((response) => {
            // categoryName: "clothing"
            // createdAt: "2020-05-07T19:11:20.000Z"
            // id: 2
            console.log(response.data);
            const options = [];
            if (response.data && response.data.length) {
                response.data.map((category) => {
                    options.push({ value: category.id, label: category.categoryName })
                })
                this.setState({
                    categoryList: options
                })
            }
            else {
                this.setState({
                    categoryList: []
                })
            }

        })
        .catch((error) => {

            console.log(error);
        })

    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("id") || localStorage.getItem("usertype") !== 'admin') {
            redirectVar = <Redirect to="/unauthorised" />
        }


        return (
            <div>
                {redirectVar}
                <div>
                    <div>
                        <br></br>
                        <br></br>

                        <Row>

                            <Col md={1}>

                            </Col>

                            <Col md={5}>
                                <Card
                                    // bg={'Success'.toLowerCase()}
                                    key={1}
                                // text={'Success'.toLowerCase() === 'light' ? 'dark' : 'white'}
                                //  style={{ width: '18rem' }}
                                >
                                    <Card.Body>
                                        <Card.Title style={{ marginLeft: '30%' }}>SEARCH BY CATEGORY ID:</Card.Title>
                                        <Row>
                                            <Col md={2}></Col>
                                            <Col md={8}>
                                                <Select
                                                    onChange={this.getProductsById}
                                                    options={this.state.categoryList}
                                                    isClearable={true}
                                                    placeholder="Select Category"
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={5}>
                                <Card
                                    // bg={'Success'.toLowerCase()}
                                    key={1}
                                // text={'Success'.toLowerCase() === 'light' ? 'dark' : 'white'}
                                //  style={{ width: '18rem' }}
                                >
                                    <Card.Body>
                                        <Card.Title style={{ marginLeft: '35%' }}>PERFORM OPERATIONS</Card.Title>

                                        {/* <Row>
                                                <Col md={2}></Col>
                                                <Col md={4}>
                                                    <Button variant="success" onClick={this.showAddModal}>Add Category</Button>
                                                </Col>
                                                <Col md={4}>
                                                    <Button variant="danger" onClick={this.showRemModal}>Remove Category</Button>
                                                </Col>

                                            </Row> */}

                                        <Row>
                                            <Col md={2}></Col>
                                            <Col md={6}>
                                                <InputGroup className="mb-3">

                                                    <FormControl
                                                        placeholder="Category Name"
                                                        aria-label="Category Name"
                                                        aria-describedby="basic-addon1"
                                                        value={this.state.categoryName}
                                                        onChange={this.onChangeName}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={4}>
                                                <Button variant="success" onClick={this.handleOkAdd}>
                                                    Add
                                                    </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}></Col>

                                            <Col md={6}>
                                                <Select
                                                    onChange={this.handleChangRemCategory}
                                                    options={this.state.remCategoryList}
                                                    isClearable={true}
                                                    placeholder="Remove Category"
                                                />

                                            </Col>
                                            <Col md={4}>
                                                <Button variant="danger" onClick={this.removeCategory}>Remove </Button>
                                            </Col>

                                        </Row>


                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={1}>

                            </Col>

                        </Row>
                        <Row>
                            {/* <Modal show={this.state.addCategoryModal} onHide={this.handleCloseAdd} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>ADD A CATEGORY</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <InputGroup className="mb-3">

                                        <FormControl
                                            placeholder="Category Name"
                                            aria-label="Category Name"
                                            aria-describedby="basic-addon1"
                                            onChange={this.onChangeName}
                                        />
                                    </InputGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleCloseAdd}>
                                        Close
                               </Button>
                                    <Button variant="primary" onClick={this.handleOkAdd}>
                                        Save Changes
                                </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={this.state.remCategoryModal} onHide={this.handleCloseRem} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>REMOVE A CATEGORY</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleCloseRem}>
                                        Close
                               </Button>
                                    <Button variant="primary" onClick={this.handleOkRem}>
                                        Save Changes
                                </Button>
                                </Modal.Footer>
                            </Modal> */}
                        </Row>
                        <br></br>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>

                                {this.state.products.length ? <div>
                                    <h2 style={{ marginLeft: '35%' }} >LIST OF PRODUCTS:</h2>
                                    <br></br>
                                    <br></br>
                                    <Row>
                                        {this.state.products.map((product, i) => {
                                            return (<Col md={4} key={i}>
                                                <Card style={{ width: '20rem' }}>
                                                    <Card.Img variant="top" src={product.thumbNail} />

                                                    <Card.Body>
                                                        <Row>

                                                            <Col md={12}>
                                                                <h5 style={{ color: '#1e7e34' }}>{product.productName}</h5>
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col md={12}>
                                                                <p><strong>Price:</strong> {product.price}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={12}>
                                                                <p><strong>Seller:</strong> {product.sellerName}</p>
                                                            </Col>

                                                        </Row>
                                                        {/* <Row>
                                                  
                                                  <Col md={4}>
                                                      <h4>Price:</h4>
                                                  </Col>
                                                  <Col md={4}>
                                            <h5>{product.price}</h5>
                                                  </Col>
                                             </Row> */}
                                                    </Card.Body>
                                                </Card>
                                            </Col>)
                                        })

                                        }
                                    </Row>
                                </div> : <div>
                                        <Row>
                                            <Col md={2}></Col>
                                            <Col md={6}>
                                                <Alert variant="warning">
                                                    <Alert.Heading style={{ marginLeft: '16%' }}>No mapped products found!!</Alert.Heading>

                                                </Alert>
                                            </Col>
                                        </Row></div>}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminInventory;
