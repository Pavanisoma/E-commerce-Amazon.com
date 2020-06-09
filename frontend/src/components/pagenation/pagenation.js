import React, { Component } from "react";
import { Redirect } from "react-router";
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'

class Pagenation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

 

  render() {
   
    return (
      
      <div>
     <Pagination>
  <Pagination.First onClick={()=>{this.props.paginate(0,9)}} />
  <Pagination.Prev onClick={()=>this.props.paginate(this.props.currentStart-9,this.props.currentEnd-9)}/>
  <Pagination.Item>{1}</Pagination.Item>
  <Pagination.Ellipsis />

  <Pagination.Item>{10}</Pagination.Item>
  <Pagination.Item>{11}</Pagination.Item>
  <Pagination.Item>{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item>

  <Pagination.Ellipsis />
  <Pagination.Item>{20}</Pagination.Item>
  <Pagination.Next onClick={()=>this.props.paginate(this.props.currentStart+9,this.props.currentEnd+9)}/>
  <Pagination.Last />
</Pagination>
      </div>
    );
  }
}



export default Pagenation;
