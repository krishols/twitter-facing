import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './components/login.component';
import SignUp from './components/signup.component';
import UserPage from './components/user.component';
import Dashboard from './components/dashboard.components';
import AllUsers from './components/allusers.component';
import SignOut from './components/signout.component';
import './App.css';
import axios from 'axios';
import configs from './configs.json';
function App() {
  const [data, setData] = useState(null);
  axios.defaults.baseURL = configs.SERVER_URI;
  document.body.style = 'background: #fefae0;';

  
 // module.exports.config = configs[process.env.NODE_ENV];
  return (
    <Router>
      <Link to="/allusers"></Link>
    <div className="App" style={{height: '100%' }}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
   
          { localStorage.getItem('currentUser') == null &&
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
          
              <li className="nav-item">
                <Link className="nav-link" to={'/sign-in'}>
                  Login
                </Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to={'/sign-up'}>
                  Sign up
                </Link>
              </li> 
              </ul>
              </div>

          }
          { localStorage.getItem('currentUser') != null &&
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/dashboard'}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/allusers/' + localStorage.getItem('currentUser')}>
                  My Account
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/allusers'}>
                  All Users
                </Link>
              
              </li>
              <li className='nav-item'>
                <Link className="nav-link" to={'/sign-out'}> Sign Out </Link>
              </li>
              </ul>
              </div>
          }
            
          
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">

          <Routes>
            
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/allusers/:id" element={<UserPage/>}/>
            <Route path="/dashboard" element ={<Dashboard/>}/>
            <Route path='/allusers' element={<AllUsers/>} />
            <Route path='/sign-out' element={<SignOut/>} />
            </Routes>
        </div>
      </div>
    </div>
    
  </Router>
  );
}

export default App;


/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsTwpF6i8DkPg9OOSYqRmoxkZ8wWQMqUA",
  authDomain: "nd-twitter-ccd8b.firebaseapp.com",
  projectId: "nd-twitter-ccd8b",
  storageBucket: "nd-twitter-ccd8b.appspot.com",
  messagingSenderId: "538925359851",
  appId: "1:538925359851:web:b4fbf71999f9890ae514ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

*/
