import React, { Component } from "react";
import MainHeader from './header/mainHeader';
import First from '../images/one.png';
import Second from '../images/two.png';
import Third from '../images/three.png';
import Forth from '../images/four.png';


class Home extends Component {
  render() {
    return (
    
      <div> 
          <MainHeader/>
        <section>
            <img src={First} style={{width:'100%'}}></img> 
        
            <img src={Second} style={{width:'100%'}}></img> 
       
            <img src={Third} style={{width:'100%'}}></img> 
       
            <img src={Forth} style={{width:'100%'}}></img> 
        </section>
      </div>
      
    );
  }
}

export default Home;
