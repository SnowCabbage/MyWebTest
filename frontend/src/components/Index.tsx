import React, {useContext, useState} from "react";
import {ConfigProvider, Menu} from "antd"
import {Avatar} from "antd";
import type { MenuProps } from 'antd';
import {AuthContext} from "./Context/AuthContext";
import type { TabsProps } from 'antd';
import { useLocation} from "react-router-dom";
import {Tabs} from "antd";
import ListMovies from "./MovieList";
import Login from "./UserAuth/Login";
import Home from "./views/Home";
import Register from "./UserAuth/Register";
import AddEntry from "./AddEntry";
import Logout from "./UserAuth/Logout";
import Setting from "./Setting";
import { Layout, Space } from 'antd';
import Footer from "./Footer";

const unAuthTabItems: TabsProps['items'] = [
    {
        key: 'home',
        label: `主页`,
        children: (
            <Home/>
        )
    },
    {
        key: 'login',
        label: `登录`,
        children: (
            <Login/>
        )
    },
    {
        key: 'register',
        label: `注册`,
        children: (
            <Register/>
        )
    },
];

const authTabItems: TabsProps['items'] = [
    {
        key: 'home',
        label: `主页`,
        children: (
            <Home/>
        ),
    },
    {
        key: 'movies',
        label: `好康的`,
        children: (
            <>
                <ListMovies/>
            </>
        )
    },
    {
        key: 'addentry',
        label: `增加条目`,
        children: (
            <AddEntry/>
        )
    },
    {
        key: 'logout',
        label: `登出`,
        children: (
            <Logout/>
        )
    },
    {
        key: 'setting',
        label: `设置`,
        children: (
            <Setting/>
        )
    },
];

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};

export default function Index(props) {
    const [current, setCurrent] = useState(props.index);
    const isAuth = useContext(AuthContext)
    const location = useLocation()
    //取得当前url
    const initPath = window.location.href.split('/').pop()

    const onChange = (key: string) => {
        // console.log(key);
        // console.log(location)
        // console.log(initPath)
        if(key !== "home")
            window.history.pushState({},'',key)
        else window.history.pushState({},"","home")
        // redirect("/movies")
    };
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4b5cc4',
                },
            }}
        >
                {/*<header>*/}
                {/*    <Avatar src={"../../dog.jpg"} style={{display:"block"}} alt="A dog" size={60}/>*/}
                {/*</header>*/}
                <div className={"header"}>
                    <Avatar src={"../../dog.jpg"} style={{display:"block"}} alt="A dog" size={60}/>
                </div>

                <div className={"contentStyle"}>
                    <Tabs
                          centered
                          size={"large"}
                          defaultActiveKey={current}
                          items={isAuth? authTabItems : unAuthTabItems}
                          onChange={onChange}
                    />
                </div>
                <div className={"footerStyle"}>
                    <Footer/>
                </div>

                {/*<main>*/}
                {/*    <Tabs style={{background:'#d1d9e0'}}*/}
                {/*          centered*/}
                {/*          size={"large"}*/}
                {/*          defaultActiveKey={current}*/}
                {/*          items={isAuth? authTabItems : unAuthTabItems}*/}
                {/*          onChange={onChange}*/}
                {/*    />*/}
                {/*    /!*<Footer/>*!/*/}
                {/*</main>*/}


        </ConfigProvider>
    );
}