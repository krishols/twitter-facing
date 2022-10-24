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
        this.path = '/users/'+this.id;

        let data;
        let fn, ln, email, username, pw, tweets;
        this.state = {
            tweetDraft: '',
            some: ''
        };
        this.onFollow = this.onFollow.bind(this);
        this.onUnfollow = this.onUnfollow.bind(this);
        this.sendTweet = this.sendTweet.bind(this);
    };

    callAPI() {
        console.log(configs.SERVER_URI);
        console.log(this.path);
        axios.get(this.path)
            .then(res => {
                //       console.log(res);
                console.log(this.res);
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
            .catch(err => {
                console.error(err);
            });
            axios.get(this.path + 'profile-pic')
            .then(res => {
                console.log(res.data);
                this.setState({ pfp: res.data });
                console.log(this.state);
            })
            .catch(err => {
                console.error(err);
            });

    };

    sendTweet() {
        const draftContent = this.state.tweetDraft;
        const date = new Date();
        const nowSec = date.getTime();
        const newTweet = { username: this.state.username, time: nowSec, content: draftContent };
        const path = '/users/' + this.state.username + '/add-tweet';
        axios.post(path, newTweet)
            .then(() => {
                this.callAPI();
                console.log("Sent tweet");
                console.log(this.state);
            })
            .catch(err => {
                console.error(err);
            });
    }

    onFollow() {
        const user = localStorage.getItem('currentUser');
        const userToFollow = this.state.username;
        const date = new Date();
        const nowSec = date.getTime();
        const sendData = { timestamp: nowSec, username: user, toFollow: userToFollow };
        axios.post('/click-follow', sendData)
            .then(() => {
                console.log("Follower added!");
                localStorage.setItem(this.state.username, true);
                this.callAPI();
            }

            )
            .catch(err => {
                console.error(err);
            });

    };

    onUnfollow() {
        const user = localStorage.getItem('currentUser');
        const userToUnfollow = this.state.username;
        const date = new Date();
        const nowSec = date.getTime();
        const sendData = { timestamp: nowSec, username: user, toUnfollow: userToUnfollow };
        axios.post('/click-unfollow', sendData)
            .then(() => {
                console.log("Follower removed!");
                localStorage.setItem(this.state.username, false);
                this.callAPI();
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
        if (this.state.fn == null) { this.callAPI(); }
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