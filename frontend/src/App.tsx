import React, {useEffect, useState} from 'react';
import './static/style.css'
import 'antd/dist/reset.css';
import cookie from 'react-cookies';
import {AuthContext, UserContext} from "./components/Context/AuthContext";
import {BrowserRouter} from "react-router-dom";
import {useRef } from 'react'

import Header from "./components/elements/Header";
import Footer from "./components/elements/Footer";
import MainContent from "./components/elements/MainContent";
import {ContentHeightContext} from "./components/Context/ElementContext";


function App() {

    const [currentUser, setCurrentUser] = useState(null)
    const [contentHeight, setcontentHeight] = useState(null)
    const mainHeight = useRef(null)

    useEffect(()=>{
        setCurrentUser({name: cookie.load('user')})
        console.log(mainHeight.current.clientHeight)
        setcontentHeight(mainHeight.current.clientHeight)
    }, [])

    return (
        <BrowserRouter>
            <AuthContext.Provider value={!!cookie.load("access_token")}>
                <UserContext.Provider value={{
                    currentUser,
                    setCurrentUser
                }}>
                    <ContentHeightContext.Provider value={{
                        contentHeight,
                        setcontentHeight
                    }}>
                        <Header/>
                        <div className={"contentStyle"} ref={mainHeight}>
                            <MainContent/>
                        </div>
                        <Footer/>
                    </ContentHeightContext.Provider>
                </UserContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}
export default App;
