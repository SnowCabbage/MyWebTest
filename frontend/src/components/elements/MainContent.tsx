import { Route, Routes, Navigate} from "react-router-dom";
import Home from "../views/Home";
import Register from "../UserAuth/Register";
import Login from "../UserAuth/Login";
import RequireAuth from "../handler/handleRoute";
import ListMovies from "../views/MovieList";
import Setting from "../views/Setting";
import AddEntry from "../views/AddEntry";
import Logout from "../UserAuth/Logout";
import React from "react";
import ArticleView from "../views/ArticleView";
import NoMatch from "../views/NoMatch";
import Header from "./Header";
import Footer from "./Footer";
import Test from "../views/Test"
import UpdateHomeCover from "../views/UpdateHomeCover";
import Profile from "../views/Profile";

export default function MainContent() {
    return (
            <Routes>
                <Route path='/' element={
                    <>
                        <Header/>
                        <div className={"contentStyle"}>
                            <Navigate to="/home" />
                        </div>
                        <Footer/>
                    </>

                }
                />
                <Route path="/home" element={
                    <>
                        <Header/>
                        <div className={"contentStyle"}>
                            <Home />
                        </div>
                        <Footer/>
                    </>
                }
                />
                <Route path="/home/register" element={
                    <>
                        <div className={"contentStyle"}>
                            <Register/>
                        </div>
                        <Footer/>
                    </>

                }
                />
                <Route path="/home/login" element={
                    <>
                        <div className={"contentStyle"}>
                            <Login/>
                        </div>
                        <Footer/>
                    </>
                }
                />
                <Route path="/movies" element={
                    <>
                        <Header/>
                        <div className={"contentStyle"}>
                            <RequireAuth>
                                <ListMovies/>
                            </RequireAuth>
                        </div>
                        <Footer/>
                    </>
                } />
                    <Route path="/movies/:id" element={
                        <>
                            <Header/>
                            <div className={"contentStyle"}>
                                <RequireAuth>
                                    <ArticleView/>
                                </RequireAuth>
                            </div>
                            <Footer/>
                        </>
                    }
                    />
                <Route path="/setting" element={
                    <>
                        <Header/>
                        <div className={"contentStyle"}>
                            <RequireAuth>
                                <Setting/>
                            </RequireAuth>
                        </div>
                        <Footer/>
                    </>
                } />
                <Route path="/addentry" element={
                    <>
                        <Header/>
                        <div className={"contentStyle"}>
                            <RequireAuth>
                                <AddEntry/>
                            </RequireAuth>
                        </div>
                        <Footer/>
                    </>
                } />

                <Route path="/logout" element={
                    <>
                        <Header/>
                        <div className={"contentStyle"}>
                            <RequireAuth>
                                <Logout/>
                            </RequireAuth>
                        </div>
                        <Footer/>
                    </>
                } />
                <Route path="/test" element={
                    <>
                        <Header/>
                            <Test/>
                        <Footer/>
                    </>
                } />
                <Route path="/upload_cover" element={
                    <>
                        <Header/>
                        <UpdateHomeCover/>
                        <Footer/>
                    </>
                } />
                <Route path="/user/profile" element={
                    <>
                        <Header/>
                        <div className={"contentStyle"}>
                            <Profile/>
                        </div>
                        <Footer/>
                    </>
                } />
                <Route path='*' element={
                    <NoMatch/>
                } />
            </Routes>
    );
}