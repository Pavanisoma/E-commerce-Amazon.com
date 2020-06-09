import React, { Component } from "react";
import { Redirect } from "react-router";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignUp } from '../../store/actions/clientActions/loginActions';
import Logo from '../../images/Amazon.svg'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      userType: "",
      password: "",
      errorRedirect: false
    };

  }
//   async componentDidMount() {

//     await this.props.SignUp(data)
//     this.setState({
//         loading: false

//     })

// }

  firstNameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

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

  signup = e => {
     e.preventDefault();
      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        userType: this.state.userType
      };
      // console.log(data)
    this.props.SignUp(data);
  };

  render() {
    let redrirectVar = null;
    if(this.props.SignUpTrue === 200){
       redrirectVar =  <Redirect to={{ pathname: '/signin' }} />
      // alert("successfully created user")
    }
    console.log(this.props.SignUpTrue)
    return (
      
      <div>
       {redrirectVar}
        <div className="container fill-graywhite">
          <div className="container content">
            <div className="login-container">
            <img src = {Logo} height='100px' width='100px' style={{marginLeft:'480px'}}/>

              <div className="login-form-container col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3 border">
                <h2>Create account</h2>
                <div className="form-group login-form-control pad-top-20">
                <label class="control-label col-sm-2">YourName</label>
                  <input
                    type="text"
                    name="yourname"
                    id="yourname"
                    className="form-control form-control-lg"
        
                    onChange={this.firstNameChangeHandler}
                    required
                  />
                </div>
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
                  </select>
                </div>
                <div className="form-group login-form-control">
                <Button variant="warning" size="sm" block onClick={this.signup}>
                     Create your Amazon account          
                        </Button>   
                </div>
                <small>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</small>
               <div>
               <Link to={{ pathname: "/signin" }} style={{ color: 'blue' }}>Already have an account?</Link>
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
  return { SignUpTrue: state.SignUpTrue }
}

export default connect(mapStateToProps, { SignUp})(Register);
