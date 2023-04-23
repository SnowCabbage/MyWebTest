import React, {useContext, useState} from "react";
import {ConfigProvider, Menu} from "antd"
import {Avatar} from "antd";
import type { MenuProps } from 'antd';
import {AuthContext} from "./Context/AuthContext";
import type { TabsProps } from 'antd';
import {NavLink, useLocation} from "react-router-dom";

const authItems: MenuProps['items'] = [
    {
        label: (
            <a href="/" rel="noopener noreferrer">
                主页
            </a>
            // <NavLink to="/">
            //     主页
            // </NavLink>
        ),
        key: 'home',
    },
    {
        label: (
            <NavLink to="/movies">
                好康的
            </NavLink>
        ),
        key: 'movies',
    },
    {
        label: (
            <NavLink to="/setting">
                设置
            </NavLink>
        ),
        key: 'setting'
    },
    {
        label: (
            <NavLink to="/addentry">
                增加条目
            </NavLink>
        ),
        key: 'addEntry'
    },
    {
        label: (
            <NavLink to="/logout">
                登出
            </NavLink>
        ),
        key: 'logOut'
    }
];

const unAuthItems: MenuProps['items'] = [
    {
        label: (
            <a href="/" rel="noopener noreferrer">
                主页
            </a>
            // <NavLink to="/">
            //     主页
            // </NavLink>
        ),
        key: 'home',
    },
    {
        label: (
            <a href="/login" rel="noopener noreferrer">
                登录
            </a>
            // <NavLink to="/login">
            //     登录
            // </NavLink>
        ),
        key: 'logIn'
    },
];


export default function Header() {
    const [current, setCurrent] = useState('');
    const isAuth = useContext(AuthContext)
    const location = useLocation()
    //取得当前url
    const initPath = window.location.href.split('/').pop()

    const onClick: MenuProps['onClick'] = (e) =>{
        setCurrent(e.key)
        console.log('click',e)
        console.log(isAuth)
        console.log(location.state)
        console.log(initPath)
    }

    // const onChange = (key: string) => {
    //     // console.log(key);
    //     // console.log(location)
    //     // console.log(initPath)
    //     if(key !== "home")
    //         window.history.pushState({},'',key)
    //     else window.history.pushState({},"","home")
    //     // redirect("/movies")
    // };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4b5cc4',
                },
            }}
        >
            <div className={"header"}>
                    <Avatar src={"../../dog.jpg"} style={{display:"block"}} alt="A dog" size={60}/>
                    <Menu  style={{
                        display:'block',
                        background:'#d1d9e0',
                        textAlign:'center',
                        height: 50
                    }}
                           onClick={onClick}
                           selectedKeys={[current]}
                           mode="horizontal"
                           items={isAuth? authItems : unAuthItems} />
            </div>


        </ConfigProvider>
    );
}