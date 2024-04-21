import React, {useContext, useEffect, useState} from "react";
import requests from "../handler/handleRequest";
import GetUrl from "../Context/UrlSource";
import cookie from 'react-cookies';
import {AuthContext, UserContext} from "../Context/AuthContext";
import {mainThemeColor} from "../Context/DefaultInfo";
import {Avatar, Card, ConfigProvider, List, Skeleton} from "antd";
import {NavLink, useLocation} from "react-router-dom";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import UserAvatar from "../Units/UserAvater";

export default function Profile() {
    const {currentUser} = useContext(UserContext)
    const [userProfile, setUserProfile] = useState({})
    useEffect(()=>{
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
                    setUserProfile(response.data['data'])
                    //console.log(response.data['data'])
                })
                .catch(e=>{
                    console.log("Error:", e)
                })

    },[])
    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: mainThemeColor,
                    },
                }}
            ></ConfigProvider>
            <Card bordered={false} style={{
                width: '80vw',
                maxWidth: 800,
                margin: 'auto',
                // top: 36,
                right: 0,
                left: 0,
                // bottom: 36,
                background: '#ffffff',
            }}>
                <h3 style={{
                    float: 'left'
                }}>
                    用户名：{userProfile['username']}
                </h3>


                <UserAvatar
                    avatar_id={userProfile['profile'] ? userProfile['profile']['avatar_id'] : {}}
                    style={{
                        float: 'right',
                        cursor: 'pointer'
                    }}
                />
            </Card>
        </div>
    );
}