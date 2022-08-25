import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";//New
// import Login from "./components/Login/Login";//New
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// let token = sessionStorage.getItem('Token');

// const timeout = setTimeout( () => <App/>, 10000);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 
  <React.StrictMode>
    <Router>
      <App />
    {/* { !token === "" || !token === null ? <App /> : <Login />} */}
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();