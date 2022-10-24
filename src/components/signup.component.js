import React, { Component } from "react";
import axios from "./custom-axios";
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
  from 'mdb-react-ui-kit';

  export const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    } 
    return Wrapper;
}

class SignUp extends Component {
  
  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'https://cpeg-1.herokuapp.com/';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset();
  }
  reset() {

    const date = new Date();
    const nowSec = date.getTime();
    console.log(nowSec);
    //const readable = nowSer.substring(0,15);
   // console.log(readable);
    //
    
    this.state = {
      fn: '',
      ln: '',
      email: '',
      username: '',
      pw: '',
      tweets: {0: {username: 'mocktweet', content: "My first tweet!", likes:0}},
      followers: {0: 'mockfollower'}, 
      following: {0: 'mockfollowing'}
    }
  }
  handleSubmit(e) {
    console.log('You clicked submit!');
    
    console.log(this.state);
    axios
      .post('/newuser', this.state)

      .then(() => {
        console.log('User Received');
        //this.setState({tweets: {nowStr: "My first tweet!"}});
        localStorage.setItem('currentUser', this.state.username);
        const path = '/allusers/' + this.state.username;
        window.location = path;
      }
      )
      .catch(err => {
          console.error(err);
      });
  };



render() {
  return (

    <MDBContainer fluid className='justify-content-center p-4'>
    <div className="divider d-flex align-items-center my-4">
                                <h1 className="text-center fw-bold mx-3 mb-0">Thanks for your interest! Sign up here:</h1>
                            </div>
      <MDBRow>


        <MDBCol md='12'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='fn' type='text' value={this.state.fn} onChange={evt => this.setState({ fn: evt.target.value })} />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='ln' type='text' value={this.state.ln} onChange={evt => this.setState({ ln: evt.target.value })} />
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' value={this.state.email} onChange={evt => this.setState({ email: evt.target.value })} />
              <MDBInput wrapperClass='mb-4' label='Username' id='username' type='username' value={this.state.username} onChange={evt => this.setState({ username: evt.target.value })} />
              <MDBInput wrapperClass='mb-4' label='Password' id='pw' type='password' value={this.state.pw} onChange={evt => this.setState({ pw: evt.target.value })} />
          

              <MDBBtn onClick={this.handleSubmit} className='w-100 mb-4' size='md'>sign up</MDBBtn>


              
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  )
}
}
export default withRouter(SignUp);