import React, { Component, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from "axios";
import UserTweetList from "./tweetlist.component";
import PictureUploader from "./picLoader.component";
import UserCard from "./Usercard.component";
import configs from '../configs.json';
export default class UserPage extends Component {



    constructor(props) {
        super(props);
        this.path = window.location.pathname;
        this.id = this.path.split('/').pop();
        this.path = '/users/' + this.id;
       // axios.defaults.baseURL = 'https://staging-twittah.herokuapp.com';

        this.state = {
            tweetDraft: '',
            some: ''
        };
        this.onFollow = this.onFollow.bind(this);
        this.onUnfollow = this.onUnfollow.bind(this);
        this.sendTweet = this.sendTweet.bind(this);
    };


    /*
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
    
        };

    */

  async  callAPI() {
        // console.log(configs.SERVER_URI)
        console.log(this.path);
      await  axios.get('https://staging-twittah.herokuapp.com' +this.path)
            .then(res => {
                //       console.log(res);
                console.log(res);
                if (res != null) {
               
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
                }
            return res;})
            .then(res => {
                    if (res.data.username = localStorage.getItem('currentUser')) {
                        if (res.data.following != null){
                            const numFollowing = Object.keys(res.data.following).length;
                            const following = Object.keys(res.data.following);
                            console.log(following);
                            for (var i = 0; i < numFollowing; i++) {
                                var object = following[i];
                                console.log(object);
                                localStorage.setItem([object], 'true');
    
                        }}
                        return true;
                    }
                }
            )
                .catch(err => {
                    console.error(err);
                });
         /*       })
            .then(res => { 
                axios.get(this.path + '/profile-pic') 
            })
            .then(res => {
                if (res != null) {
                console.log(res.data);
                this.setState({ pfp: res.data });
                console.log(this.state);
                }
            })
*/
         
        


    };

  async  sendTweet() {
        const draftContent = this.state.tweetDraft;
        const date = new Date();
        const nowSec = date.getTime();
        const newTweet = { username: this.state.username, time: nowSec, content: draftContent };
        const path = '/' +  this.state.username + '/add-tweet';
        axios.post(path, newTweet)
            .then(() => {
                this.callAPI();
                console.log("Sent tweet");
                console.log(this.state);
                return true;
            })
            .catch(err => {
                console.error(err);
            });
    }

   async onFollow() {
        const user = localStorage.getItem('currentUser');
        const userToFollow = this.state.username;
        const date = new Date();
        const nowSec = date.getTime();
        const sendData = { timestamp: nowSec, username: user, toFollow: userToFollow };
       await axios.post('/click-follow', sendData)
            .then(() => {
                console.log("Follower added!");
                localStorage.setItem(this.state.username, true);
                this.callAPI();
                return true;
            }

            )
            .catch(err => {
                console.error(err);
            });

    };

  async  onUnfollow() {
        const user = localStorage.getItem('currentUser');
        const userToUnfollow = this.state.username;
        const date = new Date();
        const nowSec = date.getTime();
        const sendData = { timestamp: nowSec, username: user, toUnfollow: userToUnfollow };
      await  axios.post('/click-unfollow', sendData)
            .then(() => {
                console.log("Follower removed!");
                localStorage.setItem(this.state.username, false);
                this.callAPI();
                return true;
            }

            )
            .catch(err => {
                console.error(err);
            });

    };

    SAFE_componentWillMount() {
        this.callAPI = this.callAPI.bind(this);



    }

    render() {
        if (this.state.tweets == null) { this.callAPI(); 
        console.log(this.state);};
        return (
            <div style={{ 'padding-top': '60px', height: '100%' }}>
                <div className="vh-100" style={{ backgroundColor: '#fefae0' }}>
                    <MDBContainer style={{ backgroundColor: '#fefae0' }}>

                        <MDBRow className="justify-content-center">



                            <UserCard path={this.path} />

                        </MDBRow>
                        <div style={{ margin: '2em 0 1em 0' }} class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Your latest tweets:</h5>
                            </div>
                        </div>

                        < UserTweetList username={this.state.username} tweets={this.state.tweets} />
                    </MDBContainer>
                </div>
            </div>
        );
    }




}

/* 

for others viewing account: 

 <div className="d-flex pt-1">
                                                <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
                                                <MDBBtn className="flex-grow-1">Follow</MDBBtn>
                                            </div>

*/