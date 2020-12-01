import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import ChangepassComponent from './changepass/changepass';
import DashboardComponent from './dashboard/dashboard';


const firebase = require("firebase");
require("firebase/firestore");

// NOTE: to be removed/obscured later
firebase.initializeApp({
  apiKey: "AIzaSyDNcdWG03QifRIDoVeTaxKEF9tfeGirszE",
  authDomain: "personal-notes-373ae.firebaseapp.com",
  databaseURL: "https://personal-notes-373ae.firebaseio.com",
  projectId: "personal-notes-373ae",
  storageBucket: "personal-notes-373ae.appspot.com",
  messagingSenderId: "608900678595",
  appId: "1:608900678595:web:b04453f936348cce80f376",
  measurementId: "G-C2603FGYZT"
});

// Routing between login, sign up, change password and dashboard established for proper redirects
const routing = (
  <Router>
    <div id = 'routing-container'>
      <Route path = '/login' component = {LoginComponent}></Route>
      <Route path = '/signup' component = {SignupComponent}></Route>
      <Route path = '/changepass' component = {ChangepassComponent}></Route>
      <Route path = '/dashboard' component = {DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
