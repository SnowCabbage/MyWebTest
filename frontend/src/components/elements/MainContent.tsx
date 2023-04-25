import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "../views/Home";
import Register from "../UserAuth/Register";
import Login from "../UserAuth/Login";
import RequireAuth from "../handler/handleRoute";
import ListMovies from "../MovieList";
import Setting from "../Setting";
import AddEntry from "../AddEntry";
import Logout from "../UserAuth/Logout";
import React from "react";
import {useRef, useEffect } from 'react'

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