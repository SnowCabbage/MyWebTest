import React, {useContext, useEffect, useState} from "react";
import {ConfigProvider, Dropdown, Menu} from "antd"
import {Avatar} from "antd";
import type { MenuProps } from 'antd';
import {AuthContext, UserContext} from "../Context/AuthContext";
import {NavLink, useLocation} from "react-router-dom";
import { Button, Tooltip, Typography } from 'antd';
import {
    PoweroffOutlined,
    UserOutlined,
    HomeOutlined,
    BarsOutlined,
    PlusOutlined, SmileOutlined, DownOutlined, SettingFilled
} from '@ant-design/icons';
import GetUrl from "../Context/UrlSource";
import requests from "../handler/handleRequest";
import cookie from 'react-cookies';
import {mainThemeColor} from "../Context/DefaultInfo";
import OnlineStatistic from "./OnlineStatistic";


const { Text} = Typography;

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
        icon: <BarsOutlined/>
    },
    {
        label: (
            <NavLink to="/addentry">
                增加条目
            </NavLink>
        ),
        key: 'addentry',
        icon: <PlusOutlined />
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

const settingItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <NavLink to="/user/profile">
                个人信息
            </NavLink>
        ),
        icon: <SmileOutlined />
    },
    {
        key: '2',
        label: (
            <NavLink to="/setting">
                设置
            </NavLink>
        ),
        icon: <SettingFilled />,
    },
    {
        key: '3',
        danger: true,
        label: (
            <NavLink to="/logout">
                退出当前账号
            </NavLink>
        ),
        icon: <PoweroffOutlined/>
    },
];

function ShowAvatar({Auth, avatar_id}){
    if (Auth){
        // console.log(Auth)
        return (
            <Dropdown menu={{ items:settingItems }}>
                <Avatar src={GetUrl("images/" + avatar_id)} alt="头像" size={60}
                        style={{
                            cursor: 'pointer'
                        }}
                />
            </Dropdown>
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
    // const {setCurrentUser} = useContext(UserContext)
    // //取得当前url
    // const initPath = window.location.href.split('/').pop()

    useEffect(()=>{
        let currentUrl = window.location.pathname.split('/')[1]
        // console.log(currentUrl)
        setCurrent(currentUrl)
    },[location])

    useEffect(()=>{
        if (isAuth){
            // console.log(currentUser.user)
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
                    // console.log(response.data)
                    setCurrentAvatar(response.data['data']['profile']['avatar_id'])
                })
                .catch(e=>{
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
                    colorPrimary: mainThemeColor,
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
                    <Text italic strong style={{
                        fontSize: 30,
                        color: '#db5a6b'
                    }}>
                        {currentUser.user===null ? "" :currentUser.user}
                    </Text>
                </div>
                <>
                    <OnlineStatistic/>
                </>


                <Menu  style={{
                    display:'block',
                    background:'#f6f6fa',
                    textAlign:'center',
                    height: 50
                }}
                       onClick={onClick}
                       selectedKeys={[current]}
                       mode="horizontal"
                       items={isAuth? authItems : unAuthItems} />
                {isAuth ? <></> :
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