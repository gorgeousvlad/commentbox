import "./styles/bootstrap/css/bootstrap.min.css";
import "./main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import {CommentContainer}  from "./components.jsx";


const curUser = {
    author: "curUser",
    avatar: '',
    text: "sometext"
}

ReactDOM.render(
  <CommentContainer url = 'users.json' curUser = {curUser}/>,
  document.getElementById("app"));