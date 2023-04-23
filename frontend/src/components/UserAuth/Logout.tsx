import React, {useEffect, useState} from "react";
import {Avatar, Button, Checkbox, ConfigProvider, Form, Input, Menu, MenuProps, message, Card} from "antd";
import Header from "../Header";
import Footer from "../Footer";
import {useLocation, useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';

export default function Logout(){
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(()=>{
        success()
    },[])

    const toHome = ()=>{
        navigate("/", {replace:true});
        navigate(0);
    }

    const success = () => {
        cookie.remove("access_token")
        cookie.remove("user")
        messageApi.open({
            type: 'success',
            content: '退出成功',
        });
        setTimeout(()=>{
            // window.location.reload()
            toHome()
        }, 1000)


    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4b5cc4',
                },
            }}
        >
            {/*<Header index={"logout"}/>*/}
            {contextHolder}
            <main>
            </main>
            {/*<Footer/>*/}
        </ConfigProvider>
    );
}