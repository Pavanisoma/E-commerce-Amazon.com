import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import exportData from '../../../config/config';
import Form from 'react-bootstrap/Form'
import logo from '../../../images/shoes.png'
import Carousel from 'react-bootstrap/Carousel'

class ProductImages extends Component{

render(){
  if(this.props.images===undefined){
    return null;
  }

  let output=[]
  for(let i of this.props.images)
  {
    output.push(<Carousel.Item>
    <img
      className="d-block w-100"
      src={i.imageUrl}
      alt="First slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>)
  }

    return(
<Carousel >
{output}
 
</Carousel>
);

}

}

export default ProductImages;