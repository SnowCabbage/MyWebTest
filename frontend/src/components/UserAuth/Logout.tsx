import React, {useContext, useEffect, useState} from "react";
import { message} from "antd";
import { useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';
import {UserContext} from "../Context/AuthContext";
import {defaultUserInfo} from "../Context/DefaultInfo";

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
        cookie.remove("access_token", { path: '/' })
        cookie.remove("user", { path: '/' })
        setTimeout(()=>{
            setUser("")
            setCurrentUser(defaultUserInfo)
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