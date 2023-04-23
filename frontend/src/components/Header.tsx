import React, {useContext, useState} from "react";
import {ConfigProvider, Menu} from "antd"
import {Avatar} from "antd";
import type { MenuProps } from 'antd';
import {AuthContext} from "./Context/AuthContext";
import type { TabsProps } from 'antd';
import {NavLink, useLocation} from "react-router-dom";
import {Tabs} from "antd";
import ListMovies from "./MovieList";
import Login from "./UserAuth/Login";
import Home from "./views/Home";
import Register from "./UserAuth/Register";
import AddEntry from "./AddEntry";
import Logout from "./UserAuth/Logout";
import Setting from "./Setting";
import Footer from "./Footer";

const authItems: MenuProps['items'] = [
    {
        label: (
            // <a href="/" rel="noopener noreferrer">
            //     主页
            // </a>
            <NavLink to="/">
                主页
            </NavLink>
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
            <NavLink to="/">
                主页
            </NavLink>
        ),
        key: 'home',
    },
    {
        label: (
            <NavLink to="/login">
                登录
            </NavLink>
        ),
        key: 'logIn'
    },
];


export default function Header(props) {
    const [current, setCurrent] = useState(props.index);
    const isAuth = useContext(AuthContext)
    const location = useLocation()
    //取得当前url
    const initPath = window.location.href.split('/').pop()

    const onClick: MenuProps['onClick'] = (e) =>{
        setCurrent(e.key)
        console.log('click',e)
        console.log(isAuth)
        console.log(location)
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