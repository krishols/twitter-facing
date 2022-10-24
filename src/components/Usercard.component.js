import React, { Component, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from "axios";
import UserTweetList from "./tweetlist.component";
import PictureUploader from "./picLoader.component";
import configs from '../configs.json';
export default class UserCard extends Component {

    constructor(props) {
        super(props);
  //      axios.defaults.baseURL = 'https://cpeg-1.herokuapp.com/';
      
        this.username = props.username;
      
       this.path = props.path;
     
        this.id = this.path.split('/').pop();
        this.state = {
            tweetDraft: '',
            some: ''
        };
        this.sendTweet = this.sendTweet.bind(this);
        this.onFollow = this.onFollow.bind(this);
        this.onUnfollow = this.onUnfollow.bind(this);
    };

    SAFE_componentWillMount() {
        this.callAPI = this.callAPI.bind(this);



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
                window.location.reload();
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
                window.location.reload();
            }

            )
            .catch(err => {
                console.error(err);
            });

    };

    callAPI() {

        axios.get(`${this.path}`)
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
            .catch(err => {
                console.error(err);
            });
            axios.get(`${this.path}/profile-pic`)
            .then(res => {
            //    console.log(res.data);
                this.setState({ pfp: res.data });
             //   console.log(this.state);
            })
            .catch(err => {
                console.error(err);
            });
    };

    sendTweet() {
        //      console.log(this.state.tweetDraft);
        const draftContent = this.state.tweetDraft;
        const date = new Date();
        const nowSec = date.getTime();
        const newTweet = { username: this.state.username, time: nowSec, content: draftContent, pfp: this.state.pfp};
        const path = '/users/' + this.state.username + '/add-tweet';
        axios.post(path, newTweet)
            .then(() => {
                // console.log(this.state);
                this.callAPI();
                console.log("Sent tweet");
                console.log(this.state);
                window.location.reload(false);
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        if (this.state.fn == null) {this.callAPI()};
        return (
            
            <MDBCard style={{ borderRadius: '15px' }}>

                <MDBCardBody className="p-4">

                    <div className="d-flex text-black">
                        <div className="flex-shrink-0">
                            {this.state.pfp != null &&
                            <MDBCardImage
                                style={{ width: '180px', borderRadius: '10px' }}
                                src={this.state.pfp}
                                alt='Generic placeholder image'
                                fluid />}
                        </div>

                        

                        <div className="flex-grow-1 ms-3">
                            <MDBCardTitle> {this.state.fn} {this.state.ln}</MDBCardTitle>
                            <MDBCardText>@{this.state.username}</MDBCardText>

                            <div className="d-flex justify-content-center rounded-3 p-2 mb-2"
                                style={{ backgroundColor: '#efefef' }}>
                                <div>
                                    <p className="small text-muted mb-1">Tweets</p>

                                    {this.state.tweets != null && <p className="mb-0">{Object.keys(this.state.tweets).length - 1}</p>}
                                </div>
                                <div className="px-3">
                                    <p className="small text-muted mb-1">Followers</p>
                                    {this.state.followers != null && <p className="mb-0">{Object.keys(this.state.followers).length - 1}</p>}
                                    <p className="mb-0"></p>
                                </div>
                                <div>
                                    <p className="small text-muted mb-1">Following</p>
                                    {this.state.following != null && <p className="mb-0">{Object.keys(this.state.following).length - 2}</p>}

                                    <p className="mb-0"> </p>
                                </div>
                            </div>
                            {this.state.username != localStorage.getItem('currentUser') && localStorage.getItem(this.state.username) != 'true' &&
                                <div className="d-flex pt-1">

                                    <MDBBtn onClick={this.onFollow} className="flex-grow-1">Follow</MDBBtn>
                                </div>
                            }
                            {this.state.username != localStorage.getItem('currentUser') && localStorage.getItem(this.state.username) == 'true' &&
                                <div className="d-flex pt-1">

                                    <MDBBtn onClick={this.onUnfollow} className="flex-grow-1">Unfollow</MDBBtn>
                                </div>
                            }
                            {this.state.username == localStorage.getItem('currentUser') &&
                                <div className="justify-content-center rounded-3 p-2 mb-1" style={{ backgroundColor: '#efefef' }}>
                                    <div class="form-outline">
                                        <MDBInput wrapperClass='mb-4' label='Tweet away...' id='tweetDraft' type='text' value={this.state.tweetDraft} onChange={evt => this.setState({ tweetDraft: evt.target.value })} />

                                        <MDBBtn onClick={this.sendTweet} className="flex-grow-1">Tweet</MDBBtn>
                                    </div>
                                </div>
                            }
                        </div>
                        
                    </div>
                    {this.state.username == localStorage.getItem('currentUser') &&
                    <div className="justify-content-center">{<PictureUploader />}</div>    }
                </MDBCardBody>
                
            </MDBCard>
        )
    };
};

