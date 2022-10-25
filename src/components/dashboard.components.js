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
        this.user = localStorage.getItem('currentUser');
    
        this.path = '/users/' + this.user;
    
        let data;
        let fn, ln, email, username, pw, tweets;
        this.state = {
            tweetDraft: '',
            some: '',
            following: ''
        };

    };

    refreshPage() {
        window.location.reload(false);
      }

    SAFE_componentWillMount() {
        this.callAPI = this.callAPI.bind(this);
        this.getFollowing = this.getFollowing.bind(this);
        this.getTweets = this.getTweets.bind(this);



    }
async callAPI() {
       // console.log("API call");
        await axios.get('https://staging-twittah.herokuapp.com' + this.path)
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
                return true;
            })
            .then((res) =>{
                this.getTweets();
                console.log(this.state);
            }
            )
    
        };
/*
    getFollowing() {
     //   console.log("grr"); 
        axios.get('https://staging-twittah.herokuapp.com/users/' + this.state.username + '/following')
        .then(res => {
            console.log(res);
            this.setState({following:res.data});
            console.log(this.state);
        })

     

        .catch(err => {
            console.log("Sigh");
                console.error(err);
            });
   
    }
    */
async getTweets() {
        const users = Object.keys(this.state.following);
        console.log(users);
       
         for await (var account of users) {
            var tweets = [];
            axios.get('https://staging-twittah.herokuapp.com/users/' + account)
            .then(res => {
                
                console.log(account);
                console.log(res);
             //   this.setState({dashboardTweets:res.data.tweets});
             var tempTweets = res.data.tweets;
             const numTweets = Object.keys(tempTweets).length - 1;
            var timestamps = Object.keys(tempTweets).reverse();
        
            tweets.push(tempTweets);
                
            }).then( res => {
            console.log(tweets);
            this.setState({dashboardTweets: tweets});
            return tweets;

         });
        }

             
        
               
     };
    render() {
        if (this.state.username == null) { this.callAPI();};
 
        if (this.state.dashboardTweets == null) {
            this.getTweets();
                    };
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