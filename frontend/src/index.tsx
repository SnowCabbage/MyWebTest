import 'babel-polyfill'

import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';



import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListMovies from "./components/MovieList";
import Setting from "./components/Setting";
import AddEntry from "./components/AddEntry";
import Login from "./components/UserAuth/Login";
import RequireAuth from "./components/handler/handleRoute";
import Logout from "./components/UserAuth/Logout";
import {AuthContext, UserContext} from "./components/Context/AuthContext";
import cookie from 'react-cookies';
import Register from "./components/UserAuth/Register";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
