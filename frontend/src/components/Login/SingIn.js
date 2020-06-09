import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/clientActions/loginActions';
import Logo from '../../images/Amazon.svg'
class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      userType: "",
      redirect:'',
    };

  }

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  profileChangeHandler = e => {
    this.setState({
      userType: e.target.value
    });
  };

submitLogin = async e => {
    e.preventDefault();
 
    const data = {
      email: this.state.email,
      password: this.state.password
    };

     await  this.props.login(data)


    
     if(this.props.loginDetails.status ===200){
      
      localStorage.setItem('usertype', this.state.userType);
      localStorage.setItem('id', this.props.loginDetails.data.id);

        console.log(localStorage.getItem('usertype'))
      if(localStorage.getItem('usertype') === 'seller') {
        localStorage.setItem('sellerName', this.props.loginDetails.data.name);
        this.setState({redirect: <Redirect to="/seller/inventory" />})
       // this.props.history.push('/seller/inventory')
      }

      else if(localStorage.getItem('usertype') === 'customer'){
        localStorage.setItem('customerName', this.props.loginDetails.data.name);
        this.setState({redirect: <Redirect to="/userHome" />})
        // this.props.history.push('/userHome')
         }
         
         else if(localStorage.getItem('usertype') === 'admin'){
          this.setState({redirect: <Redirect to="/admin/inventory/" />})
         // this.props.history.push('/admin/inventory/');
         }

      } else{
        this.setState({redirect: <Redirect to="/signup" />})

      }
      
      
  };

  render() {
    console.log(this.props.loginDetails)
    return (
      
      <div>
        {this.state.redirect}
       
        <div className="container fill-graywhite">
          <div className="container content">
        
          {/* <div>       */}
            
{/* </div> */}
            <div className="login-container">
            <img src = {Logo} height='100px' width='100px' style={{marginLeft:'480px'}}/>

              <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">

                <div className="login-form-heading input-group pad-top-10 input-group-lg">
                 <h2>Sign-In</h2>
                </div>
                <hr />
                
                
                <div className="form-group login-form-control">
                <label class="control-label col-sm-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    
                    onChange={this.emailChangeHandler}
                    required
                  />
                </div>
                <div className="form-group login-form-control">
                <label class="control-label col-sm-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-lg"
                   
                    onChange={this.passwordChangeHandler}
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2">SelectType</label>
                  <select
                    class="form-control"
                    onChange={this.profileChangeHandler}
                  >
                    <option value="select">Select</option>
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>   
                    <option value="admin">Admin</option>
                    required
                  </select>
                </div>
                
                <div className="form-group login-form-control">
                <Button variant="warning" size="sm" block onClick={this.submitLogin}>
                     Login Account          
                        </Button>              
                </div>
                <small>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</small>
                 
                  <div>
                  <Button variant="warning" size="sm" block><Link to={{ pathname: "/signup" }} style={{ color: 'black' }}> Create your Amazon account</Link>
                   
                  </Button> 
              </div>
                    
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//fetching from store
const mapStateToProps = (state) => {
  return { loginDetails: state.loginDetails }
}

export default connect(mapStateToProps, {login})(Login);
