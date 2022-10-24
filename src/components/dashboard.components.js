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
export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        axios.defaults.baseURL = 'https://cpeg-1.herokuapp.com/';
        this.user = localStorage.getItem('currentUser');
    
        this.path = '/users/' + this.user;
    
        let data;
        let fn, ln, email, username, pw, tweets;
        this.state = {
            tweetDraft: '',
            some: '',
            dashboardTweets: []
        };

    };

    refreshPage() {
        window.location.reload(false);
      }

    SAFE_componentWillMount() {
        this.callAPI = this.callAPI.bind(this);
        this.getFollowingTweets = this.getFollowingTweets.bind(this);



    }
    callAPI() {
       // console.log("API call");
        axios.get(this.path)
            .then(res => {
                //       console.log(res);
                this.setState({
                    fn: res.data.fn,
                    ln: res.data.ln,
                    email: res.data.email,
                    username: res.data.username,
                    // pw: res.data.pw,
                    tweets: res.data.tweets,
                    followers: res.data.followers,
                    following: res.data.following
                    
                })
                
            })
    };

    getFollowingTweets() {
        console.log("grr"); 
        axios.get('/users/' + this.state.username + '/following-tweets')
        .then(res => {
            console.log(res);
            this.setState({dashboardTweets:res.data});
        })

        .catch(err => {
            console.log("Sigh");
                console.error(err);
            });
    }
    render() {
        if (this.state.fn == null) { this.callAPI(); this.getFollowingTweets()};
    //    if (this.state.dashboardTweets == []) {this.getFollowingTweets();};
        //todo is replace user's tweets with their followers tweets
        console.log(this.state);
        return (
            
        <MDBContainer style={{'padding-top': '60px'}}> 
            <UserCard   path={this.path}/>
            <div style={{ margin: '2em 0 1em 0' }} class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Here's what you and your followers are up to: </h5>
                            </div>
                        </div>
        < DashTweetList username={this.state.username} tweets={this.state.dashboardTweets} />
        </MDBContainer>
        )
    }
};