import React, {useContext, useEffect, useState} from "react";
import { ConfigProvider, message} from "antd";
import Header from "../elements/Header";
import Footer from "../elements/Footer";
import {useLocation, useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';
import {UserContext} from "../Context/AuthContext";

export default function Logout(){
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(UserContext)
    const {currentUser} = useContext(UserContext)
    const [user, setUser] = useState(currentUser)

    useEffect(()=>{
        success()
    },[])

    const toHome = ()=>{
        navigate("/", {replace:true});
        // navigate(0);
    }

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '退出成功',
        });
        cookie.remove("access_token")
        cookie.remove("user")
        setTimeout(()=>{
            setUser("")
            setCurrentUser(null)
            toHome()
        }, 1500)
    }

    return (
        <>
            {contextHolder}
            {/*<div className={"contentStyle"}>*/}

            {/*</div>*/}
        </>
    );
}