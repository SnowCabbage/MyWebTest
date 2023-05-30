import React, { useState} from 'react';
import './static/style.css'
import 'antd/dist/reset.css';
import cookie from 'react-cookies';
import {AuthContext, UserContext} from "./components/Context/AuthContext";
import {BrowserRouter} from "react-router-dom";
import MainContent from "./components/elements/MainContent";
import { HomeCoverContext} from "./components/Context/ElementContext";


function App() {

    const [currentUser, setCurrentUser] = useState({
        user: cookie.load('user'),
        user_avatar: "1"
    })
    const [currentHomeCover, setCurrentHomeCover] = useState([
        {
            cover_name: '1',
            cover_id: ""
        },
        {
            cover_name: '2',
            cover_id: ""
        },
        {
            cover_name: '3',
            cover_id: ""
        }
    ])
    // const [currentAvatar, setCurrentAvatar] = useState(null)

    return (
        <BrowserRouter>
            <AuthContext.Provider value={!!cookie.load("access_token")}>
                <UserContext.Provider value={{
                    currentUser,
                    setCurrentUser
                }}>
                    <HomeCoverContext.Provider value={{
                        currentHomeCover,
                        setCurrentHomeCover
                    }}>
                        <MainContent/>
                    </HomeCoverContext.Provider>
                </UserContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}
export default App;
