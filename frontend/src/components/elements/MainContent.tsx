import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "../views/Home";
import Register from "../UserAuth/Register";
import Login from "../UserAuth/Login";
import RequireAuth from "../handler/handleRoute";
import ListMovies from "../views/MovieList";
import Setting from "../views/Setting";
import AddEntry from "../views/AddEntry";
import Logout from "../UserAuth/Logout";
import React from "react";
import {useRef, useEffect } from 'react'
import ArticleView from "../views/ArticleView";

export default function MainContent() {
    // const mainHeight=useRef(null)
    //
    // useEffect(() => {
    //     console.log(mainHeight.current)
    // }, []);

    return (
            <Routes>
                <Route path='/' element={ <Navigate to="/home" /> }/>
                <Route path="/home" element={<Home />} />
                <Route path="/home/register" element={<Register/>} />
                <Route path="/home/login" element={<Login/>} />
                <Route path="/movies" element={
                    <RequireAuth>
                        <ListMovies/>
                    </RequireAuth>
                } />
                    <Route path="/movies/:id" element={<ArticleView/>}/>
                <Route path="/setting" element={
                    <RequireAuth>
                        <Setting/>
                    </RequireAuth>
                } />
                <Route path="/addentry" element={
                    <RequireAuth>
                        <AddEntry/>
                    </RequireAuth>
                } />

                <Route path="/logout" element={
                    <RequireAuth>
                        <Logout/>
                    </RequireAuth>
                } />

            </Routes>
    );
}