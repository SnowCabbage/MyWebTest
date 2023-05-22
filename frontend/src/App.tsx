import React, {useEffect, useState} from 'react';
import './static/style.css'
import 'antd/dist/reset.css';
import cookie from 'react-cookies';
import {AuthContext, UserAvatarContext, UserContext} from "./components/Context/AuthContext";
import {BrowserRouter} from "react-router-dom";
import {useRef } from 'react'

import Header from "./components/elements/Header";
import Footer from "./components/elements/Footer";
import MainContent from "./components/elements/MainContent";
import {ContentHeightContext, ContentWidthContext} from "./components/Context/ElementContext";


function App() {

    const [currentUser, setCurrentUser] = useState({
        user: cookie.load('user'),
        user_avatar: "1"
    })
    const [contentHeight, setContentHeight] = useState(null)
    const [contentWidth, setContentWidth] = useState(null)
    // const [currentAvatar, setCurrentAvatar] = useState(null)
    const mainArea = useRef(null)

    useEffect(()=>{
        // console.log(1111)
        // setCurrentUser({user: cookie.load('user'), user_avatar: "1"})
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
