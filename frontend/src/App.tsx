import React, {useContext, useEffect, useState} from 'react';
import './static/style.css'
import 'antd/dist/reset.css';
import cookie from 'react-cookies';
import {AuthContext, UserContext} from "./components/Context/AuthContext";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import RequireAuth from "./components/handler/handleRoute";
import ListMovies from "./components/MovieList";
import Setting from "./components/Setting";
import AddEntry from "./components/AddEntry";
import Login from "./components/UserAuth/Login";
import Logout from "./components/UserAuth/Logout";
import Register from "./components/UserAuth/Register";
import Home from "./components/views/Home";
import Index from "./components/Index";

function App() {

  // @ts-ignore
    return (
        <BrowserRouter>
            <AuthContext.Provider value={!!cookie.load("access_token")}>
                <UserContext.Provider value={cookie.load("user")}>
                    <Routes>
                        <Route path="/home" element={<Index />} />
                            <Route path='/' element={ <Navigate to="/home" /> }/>
                            <Route path="/movies" element={
                                <RequireAuth>
                                    <Index index={"movies"}/>
                                </RequireAuth>
                            } />
                            <Route path="/setting" element={
                                <RequireAuth>
                                    <Index index={"setting"}/>
                                </RequireAuth>
                            } />
                            <Route path="/addentry" element={
                                <RequireAuth>
                                    <Index index={"addentry"}/>
                                </RequireAuth>
                            } />
                            <Route path="/login" element={<Index index={"login"}/>} />
                            <Route path="/logout" element={
                                <RequireAuth>
                                    <Index index={"logout"}/>
                                </RequireAuth>
                            } />
                            <Route path="/register" element={<Index index={"register"}/>} />
                    </Routes>
                </UserContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}
export default App;
