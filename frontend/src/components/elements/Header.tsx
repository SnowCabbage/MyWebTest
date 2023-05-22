import React, {useContext, useEffect, useState} from "react";
import {ConfigProvider, Menu} from "antd"
import {Avatar} from "antd";
import type { MenuProps } from 'antd';
import {AuthContext, UserContext} from "../Context/AuthContext";
import {NavLink, useLocation} from "react-router-dom";
import { Button, Tooltip } from 'antd';
import { SearchOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import GetUrl from "../Context/UrlSource";
import requests from "../handler/handleRequest";
import cookie from 'react-cookies';

const authItems: MenuProps['items'] = [
    {
        label: (
            <NavLink to="/">
                主页
            </NavLink>
        ),
        key: 'home',
        icon: <HomeOutlined/>
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
        key: 'addentry'
    },
];

const unAuthItems: MenuProps['items'] = [
    {
        label: (
            <NavLink to="/">
                主页
            </NavLink>
        ),
        key: 'home',
        icon: <HomeOutlined/>
    },
];

function ShowAvatar({Auth, avatar_id}){
    if (Auth){
        // console.log(Auth)
        return (
                <Avatar src={GetUrl("images/" + avatar_id)} alt="头像" size={60}/>
            )
    }
    return (
        <div style={{height: 60}}></div>
    )
}


export default function Header() {
    const [current, setCurrent] = useState('');
    const isAuth = useContext(AuthContext)
    const location = useLocation()
    const [currentAvatar, setCurrentAvatar] = useState('')
    const {currentUser} = useContext(UserContext)
    const {setCurrentUser} = useContext(UserContext)
    // //取得当前url
    // const initPath = window.location.href.split('/').pop()

    useEffect(()=>{
        let currentUrl = window.location.pathname.split('/')[1]
        // console.log(currentUrl)
        setCurrent(currentUrl)
    },[location])

    useEffect(()=>{
        // console.log(11111)
        // console.log(isAuth)
        if (isAuth){
            requests.get(GetUrl("user"), {
                params:{
                    "user": currentUser.user
                },
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + cookie.load("access_token"),
                },
            })
                .then(response=>{
                    console.log(response.data)
                    setCurrentAvatar(response.data['data']['profile']['avatar_id'])
                })
                .catch(e=>{
                    fail(e.msg)
                    console.log("Error:", e)
                })
        }

    },[currentUser, isAuth])

    const onClick: MenuProps['onClick'] = (e) =>{
        setCurrent(e.key)
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#177cb0',
                },
            }}
        >
            <div className={"header"}>
                <ShowAvatar
                    Auth={isAuth}
                    avatar_id={currentAvatar}
                />

                <div style={{
                    display: 'inline-block',
                    top: 15,
                    position: 'absolute',
                }}>
                    <h2>{currentUser.user===null ? "" :currentUser.user}</h2>
                </div>

                <Menu  style={{
                    display:'block',
                    background:'#d6ecf0',
                    textAlign:'center',
                    height: 50
                }}
                       onClick={onClick}
                       selectedKeys={[current]}
                       mode="horizontal"
                       items={isAuth? authItems : unAuthItems} />
                {isAuth ? <NavLink to="/logout">
                    <Tooltip title="退出当前账号">
                        <Button style={{
                            top: 25,
                            display: 'inline-block',
                            right: 0,
                            position: 'absolute',
                        }} type="primary" icon={<SearchOutlined spin/>}>
                            退出登录
                        </Button>
                    </Tooltip>
                </NavLink> :
                    <div>
                        <NavLink to="/home/login">
                            <Tooltip title="登录账号">
                                <Button style={{
                                        top: 25,
                                        display: 'inline-block',
                                        right:20,
                                        position: 'absolute',
                                    }} type="primary" icon={<UserOutlined />}>
                                    登录
                                </Button>
                            </Tooltip>
                        </NavLink>
                    </div>
                }
            </div>
        </ConfigProvider>
    );
}