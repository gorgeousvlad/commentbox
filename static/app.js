import "./styles/bootstrap/css/bootstrap.min.css";
import "./main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import {Comments}  from "./components.jsx";

const testData = [
  {
    author: "user1",
    avatar: '',
    text: "sometext"

  },
  {
    author: "user2",
    avatar: '',
    text: "sometext"

  },
  {
    author: "user3",
    avatar: '',
    text: "sometext"

  },
  {
    author: "user4",
    avatar: '',
    text: "sometext"

  }
  ,{
    author: "user5",
    avatar: '',
    text: "sometext"

  }
];
const curUser = {
    author: "curUser",
    avatar: '',
    text: "sometext"
}

ReactDOM.render(
  <Comments url = 'comments.json' data = {testData} curUser = {curUser}/>,
  document.getElementById("app"));