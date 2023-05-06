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
import {ContentHeightContext, ContentWidthContext} from "./components/Context/ElementContext";


function App() {

    const [currentUser, setCurrentUser] = useState(null)
    const [contentHeight, setContentHeight] = useState(null)
    const [contentWidth, setContentWidth] = useState(null)
    const mainArea = useRef(null)
    const [currentCookie, setCurrentCookie] = useState(cookie.load('user')? cookie.load('user') : 'default')
    // const mainWidth = useRef(null)

    useEffect(()=>{
        setCurrentUser({name: cookie.load('user')})
        // console.log("main height:",mainArea.current.clientHeight)
        // console.log("main width:", mainArea.current.clientWidth)
        setContentHeight(mainArea.current.clientHeight)
        setContentWidth(mainArea.current.clientWidth)

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
                        setContentHeight
                    }}>
                        <ContentWidthContext.Provider value={{
                            contentWidth,
                            setContentWidth
                        }}>
                        <Header/>
                        <div className={"contentStyle"} ref={mainArea}>
                            <MainContent/>
                        </div>
                        <Footer/>
                        </ContentWidthContext.Provider>
                    </ContentHeightContext.Provider>
                </UserContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}
export default App;
