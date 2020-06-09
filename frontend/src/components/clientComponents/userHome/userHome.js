import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import exportData from "../../../config/config";
import Form from "react-bootstrap/Form";
import ProductCard from "../products/productCard";
import "../../CSS/styles.css";
import Header from "../../header/header";
import { connect } from 'react-redux';
import { getALLProducts } from '../../../store/actions/clientActions/productsActions';
import PageNation from '../../pagenation/pagenation'
import Axios from "axios";
import Select from 'react-select';
import { stat } from "fs";
import { Redirect } from 'react-router';

const _ = require('lodash');

class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      productList: [],
      filterProducts: [],
      allCatgories: [],
      selectedFilter: null,
      paginationStart: 0,
      paginationEnd:9,
      search:""
    };
  }

  async componentDidMount() {

    await Axios.get(exportData.backenedURL + 'read/admin/category')
      .then((response) => {
        let cat = []
        for (let i of response.data) {

          cat.push({ value: i.id, label: i.categoryName })
        }
        this.setState({ allCatgories: cat })
     

      })
      .catch((error) => {

        console.log(error);
      })

      
    await this.props.getALLProducts()
    console.log(this.state.paginationStart+"____"+this.state.paginationEnd)
    let paginatedList=this.props.allProducts.slice(this.state.paginationStart,this.state.paginationEnd);
    this.setState({
      allProduct:this.props.allProducts,
      productList: paginatedList,
      filterProducts: paginatedList,
      loading: false
    })
  }

  paginate=(start,end)=>{
    if(start<0||(end>(this.state.allProduct.length)+9))
    return;
    var clonedArray = JSON.parse(JSON.stringify(this.state.allProduct));
    this.setState({
      productList:clonedArray.slice(start,end),
      filterProducts:clonedArray.slice(start,end),
      paginationStart:start,
      paginationEnd:end
    })
  }

  productSearchHandler = (e) => {
    if(e.target.value===null||e.target.value===""){
      this.setState({
        search:e.target.value
      })
    }
    let searchProductTxt = e.target.value;
    var clonedArray = JSON.parse(JSON.stringify(this.state.productList));
    let filteredArray=[]
    if(this.state.selectedFilter!=null){
    for(let i of clonedArray){
      console.log(i.categoryId)
      console.log(this.state.selectedFilter)
      if(i.categoryId===this.state.selectedFilter){
        filteredArray.push(i)
      }
    }
  }else{
    filteredArray=clonedArray;
  }
    let fList = _.filter(filteredArray, function (o) { return o.productName.toLowerCase().includes(searchProductTxt.toLowerCase()); });
    this.setState({
      filterProducts: fList,
      searchProductName: searchProductTxt,
      search:e.target.value
    })
  }

search=()=>{

  var clonedArray = JSON.parse(JSON.stringify(this.state.productList));
    
    let filteredArray=[]
  if(this.state.search!=null){
    filteredArray = _.filter(clonedArray, (o)=> { return o.productName.toLowerCase().includes(this.state.search); });
 }
 this.setState({filterProducts:filteredArray})
}


  filterProducts = (e) => {
    if(e===null){
    this.setState({selectedFilter:null,filterProducts:this.state.productList})
    this.search()
    return;
    }

    let filterValue = e.value;
    var clonedArray = JSON.parse(JSON.stringify(this.state.productList));
   
    let filteredArray=[]
    if(this.state.search!=""){
     filteredArray = _.filter(clonedArray, (o)=> { return o.productName.toLowerCase().includes(this.state.search); });
  }else{
    filteredArray=clonedArray;
  }
  let fList=[]
  for(let i of filteredArray){
    if(i.categoryId===filterValue){
      fList.push(i)
    }
  }
    this.setState({
      filterProducts: fList,
      selectedFilter: filterValue,
      search:e.value
    })


    this.setState({selectedFilter:e.value})
  }

  displayProducts = () => {
    //for loop
    let output = []
    for (let i = 0; i < this.state.filterProducts.length; i += 3) {
      output.push(<div>
        <Row>
          <Col md={4}>
            {this.state.filterProducts[i] && <ProductCard cproducts={this.state.filterProducts[i]} key={i} />}
          </Col>
          <Col md={4}>
            {this.state.filterProducts[i + 1] && <ProductCard cproducts={this.state.filterProducts[i + 1]} key={i + 1} />}
          </Col >
          <Col md={4}>
            {this.state.filterProducts[i + 2] && <ProductCard cproducts={this.state.filterProducts[i + 2]} key={i + 2} />}

          </Col>
        </Row>
      </div>)
    }
    return output;
  }
  render() {
    
    // console.log(this.state.filterProducts);
    let redirectVar = null;
    if (!localStorage.getItem("id") || localStorage.getItem("usertype") !== 'customer') {
        redirectVar = <Redirect to="/unauthorised" />
    }
    return (

      <div>

          {redirectVar}
        <div>
          <Header />
        </div>
        <Container fluid>

          <Row>
            <Col md={3}>

              <Row>
                <input
                  style={{ width: "90%", margin: "auto", marginTop: 30, marginBottom: 10 }}
                  type="text"
                  name="comment"
                  id="comment"
                  className="form-control form-control-lg"
                  placeholder="Search here"
                  onChange={this.productSearchHandler}
                  required
                />
              </Row>
              <div style={{ marginTop: 50 }}>
                <h4>Filters</h4>

                <Select
                  onChange={this.filterProducts}
                  options={this.state.allCatgories}
                  isClearable={true}
                  placeholder="Select Category"
                />
              </div>
              {/* </span> */}
            </Col>
            {this.state.filterProducts.length === 0 ? null : <Col md={9}>
              <div>
                {this.displayProducts()}
              </div>
              {/* {this.state.filterProducts.map((product, ind)=>{    
              return (<Row><Col sm = {12}><ProductCard  cproducts = {product} key={ind}/></Col></Row>)
            })} */}
            </Col>}

          </Row>
          {this.state.filterProducts.length === 0 ? null :
            <Row style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
              <PageNation paginate={this.paginate} currentStart={this.state.paginationStart} currentEnd={this.state.paginationEnd} />
            </Row>}

        </Container>
      </div>
    );
  }
}


//fetching from store
const mapStateToProps = (state) => {
  return { allProducts: state.allProducts }
}

export default connect(mapStateToProps, { getALLProducts })(UserHome);

