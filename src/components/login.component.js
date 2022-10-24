import React, { Component } from "react";
import './login.component.css';
import axios from "axios";
import configs from '../configs.json';

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
export default class Login extends Component {
    constructor(props) {
        super(props);
        axios.defaults.baseURL = 'https://staging-twittah.herokuapp.com',
        this.handleLogin = this.handleLogin.bind(this);
        this.reset();
    }
    reset() {

        const date = new Date();
        const nowSec = date.getTime();
     //   console.log(nowSec);

        this.state = {
            username: '',
            pw: ''
        }
    }
    handleLogin(e) {
        axios
            .post('/login-attempt', this.state)
            .then(() => {
                const path = '/allusers/' + this.state.username;
                localStorage.setItem('currentUser', this.state.username);
                console.log("set");
                
                window.location = path;
            })
            .catch(err => {
                console.error(err);
            });
    };

render() {
    return (
        <div>
            <h3>
                <MDBContainer fluid className="p-3 my-5 h-custom">

                    <MDBRow>

                        <MDBCol col='10' md='6'>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                        </MDBCol>

                        <MDBCol col='4' md='6'>

                         

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Welcome back!</p>
                            </div>

                            <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='username' value={this.state.username} size="lg" onChange={evt => this.setState({ username: evt.target.value })} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' value={this.state.pw} size="lg" onChange={evt => this.setState({ pw: evt.target.value })} />

                           

                            <div className='text-center text-md-start mt-4 pt-2'>
                                <MDBBtn onClick={this.handleLogin} className="mb-0 px-5" size='lg'>Login</MDBBtn>
                                <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="sign-up" className="link">Register</a></p>
                            </div>

                        </MDBCol>

                    </MDBRow>

                    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                    

                  

                    </div>

                </MDBContainer>
            </h3>
        </div>
    )
}
}
