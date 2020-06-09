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

class AdminInventory extends Component {

    constructor() {
        super();
        this.state = {
            addCategoryModal: false,
            remCategoryModal: false,
            products: [],
            categoryName:''
        }
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
            categoryName:''

        })
    }

    handleOkAdd = () => {

        //axios call to add category

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
        console.log(e.target.value)
        this.setState({
            categoryName:e.target.value
        })
    }


    render() {
        return (
            <div>
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
                                        <Card.Text>
                                            <Row>
                                                <Col md={2}></Col>
                                                <Col md={8}>
                                                    <Select
                                                        onChange={this.handleChangeSeller}
                                                        ///      options={options}
                                                        isClearable={true}
                                                        placeholder="Select Category"
                                                    />
                                                </Col>
                                            </Row>
                                        </Card.Text>
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
                                        <Card.Text>

                                            <Row>
                                                <Col md={2}></Col>
                                                <Col md={4}>
                                                    <Button variant="success" onClick={this.showAddModal}>Add Category</Button>
                                                </Col>
                                                <Col md={4}>
                                                    <Button variant="danger" onClick={this.showRemModal}>Remove Category</Button>
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col md={2}></Col>
                                                <Col md={4}>
                                                <InputGroup className="mb-3">
                                      
                                      <FormControl
                                          placeholder="Category Name"
                                          aria-label="Category Name"
                                          aria-describedby="basic-addon1"
                                          onChange={this.onChangeName}
                                      />
                                  </InputGroup>
                                  <Button variant="primary" onClick={this.handleOkAdd}>
                                        Save Changes
                                </Button>
                                                </Col>
                                                <Col md={4}>
                                                <Select
                                                        onChange={this.handleChangeSeller}
                                                        ///      options={options}
                                                        isClearable={true}
                                                        placeholder="Select Category"
                                                    />
                                                    <Button variant="danger" onClick={this.showRemModal}>Remove Category</Button>
                                                </Col>

                                            </Row>


                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={1}>

                            </Col>

                        </Row>
                        <Row>
                            <Modal show={this.state.addCategoryModal} onHide={this.handleCloseAdd} animation={false}>
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
                            </Modal>
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
                                            console.log(product)
                                            return (<Col md={4} key={i}>
                                                <Card style={{ width: '20rem' }}>
                                                    <Card.Img variant="top" src={'https://imagesbuckethandshake.s3-us-west-1.amazonaws.com/product.jpg'} />

                                                    <Card.Body>
                                                        <Row>

                                                            <Col md={12}>
                                                                <h5 style={{ color: '#1e7e34' }}>{product.productName}</h5>
                                                            </Col>

                                                        </Row>
                                                        <Row>

                                                            <Col md={12}>
                                                                <p>Price: {product.price}</p>
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
