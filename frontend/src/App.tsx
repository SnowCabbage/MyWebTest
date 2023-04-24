import React, {useEffect, useState} from 'react';
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
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(()=>{
        setCurrentUser({name: cookie.load('user')})
    }, [])

    return (
        <BrowserRouter>
            <AuthContext.Provider value={!!cookie.load("access_token")}>
                <UserContext.Provider value={{
                    currentUser,
                    setCurrentUser
                }}>
                    <Header/>
                    <Routes>
                        <Route path='/' element={ <Navigate to="/home" /> }/>
                        <Route path="/home" element={<Home />} />
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
                            <Route path="/login" element={<Login/>} />
                            <Route path="/logout" element={
                                <RequireAuth>
                                    <Logout/>
                                </RequireAuth>
                            } />
                            <Route path="/register" element={<Register/>} />
                    </Routes>
                    <Footer/>
                </UserContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}
export default App;
