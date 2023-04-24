import React, {useContext, useEffect} from "react";
import { ConfigProvider, message} from "antd";
import Header from "../Header";
import Footer from "../Footer";
import {useLocation, useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';
import {UserContext} from "../Context/AuthContext";

export default function Logout(){
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(UserContext)

    useEffect(()=>{
        success()
    },[])

    const toHome = ()=>{
        navigate("/", {replace:true});
        // navigate(0);
    }

    const success = () => {
        cookie.remove("access_token")
        cookie.remove("user")
        messageApi.open({
            type: 'success',
            content: '退出成功',
        });
        setTimeout(()=>{
            setCurrentUser(null)
            toHome()
        }, 1000)


    }

    return (
        <>
            {contextHolder}
            <div className={"contentStyle"}>

            </div>
        </>
    );
}