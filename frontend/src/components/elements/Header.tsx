import React, {useContext, useEffect, useState} from "react";
import {ConfigProvider, Menu} from "antd"
import {Avatar} from "antd";
import type { MenuProps } from 'antd';
import {AuthContext} from "../Context/AuthContext";
import {NavLink, useLocation} from "react-router-dom";
import { Button, Tooltip } from 'antd';
import { SearchOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';

const authItems: MenuProps['items'] = [
    {
        label: (
            // <a href="/home" rel="noopener noreferrer">
            //     主页
            // </a>
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


export default function Header() {
    const [current, setCurrent] = useState('');
    const isAuth = useContext(AuthContext)
    // const [currentUrl] = useState(window.location.pathname.split('/')[1])
    const location = useLocation()
    // //取得当前url
    // const initPath = window.location.href.split('/').pop()

    useEffect(()=>{
        let currentUrl = window.location.pathname.split('/')[1]
        // console.log(currentUrl)
        setCurrent(currentUrl)
    },[location])

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
                <Avatar src={"../../dog.jpg"} style={{display:"block"}} alt="A dog" size={60}/>
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
                                        right:120,
                                        position: 'absolute',
                                    }} type="primary" icon={<UserOutlined />}>
                                    登录
                                </Button>
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/home/register">
                            <Tooltip title="注册账号">
                                <Button style={{
                                    top: 25,
                                    display: 'inline-block',
                                    right:20,
                                    position: 'absolute',
                                }} type="primary" icon={<UserOutlined spin/>}>
                                    注册
                                </Button>
                            </Tooltip>
                        </NavLink>
                    </div>
                }
            </div>
        </ConfigProvider>
    );
}