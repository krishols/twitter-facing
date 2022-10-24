import React, { Component } from "react";

import DashTweetList from "./DashboardTweetList.component";
import axios from "axios";
import UserCard from "./Usercard.component";

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
export default class AllUsers extends Component {
    
    constructor(props) {
        super(props);
        axios.defaults.baseURL = 'https://cpeg-1.herokuapp.com/';
        this.user = localStorage.getItem('currentUser');
    
        this.path = '/users/' + this.user;
        this.state = {
            tweetDraft: '',
            some: ''
        };
    };

    refreshPage() {
        window.location.reload(false);
      }

    SAFE_componentWillMount() {
   //     this.callAPI = this.callAPI.bind(this);
        this.getUsers = this.getUsers.bind(this);



    }


    getUsers() {

        axios.get('/users')
        .then(res => {
            console.log(res);
            this.setState({users:res.data});
            console.log(this.state.users);
            if (this.state.users != null) {
            let numUsers = Object.keys(this.state.users).length;
            let keys = Object.keys(this.state.users)
            let rows = []
            for (let i = 0; i < numUsers; i++ ) {
               // console.log( );
                let path = '/users/' + keys[i];
                console.log(path);
                rows.push(<UserCard path = {path}/>)
                console.log(this.state);
            }
            this.setState({userCards: rows});
        };
        
        })

        .catch(err => {
            
            console.error(err);
        });

    }
    render() {
   //     if (this.state.fn == null) { this.callAPI();};
        if (this.state.userCards == null) {this.getUsers();};
        //todo is replace user's tweets with their followers tweets
        console.log(this.state);
        return (
            
        <MDBContainer style={{'padding-top': '60px'}}> 
            
            <div style={{ margin: '2em 0 1em 0' }} class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Here are all of our users: </h5>
                                {this.state.userCards}
                            </div>
                        </div>
        </MDBContainer>
        )
    }
};