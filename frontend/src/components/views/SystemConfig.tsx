import {App, Button, ConfigProvider, message} from "antd";
import React from "react";
import {mainThemeColor} from "../Context/DefaultInfo";
import requests from "../handler/handleRequest";
import GetUrl from "../Context/UrlSource";
import cookie from 'react-cookies';

export default function SystemConfig() {

    const onClick = (e)=>{
        requests.post(GetUrl("system/reset"),{
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
        })
            .then(response=>{
                message.success('重置完成');
            })
            .catch(e=>{
                fail(e.msg)
                console.log("Error:", e)
            })
    }

    return (
        <App>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: mainThemeColor,
                    },
                }}
            >
                <Button onClick={onClick}> 重置 </Button>
            </ConfigProvider>
        </App>
    );
}