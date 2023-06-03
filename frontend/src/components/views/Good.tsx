import {App, Button, ConfigProvider, message, Modal} from "antd";
import React, {useState} from "react";
import {mainThemeColor} from "../Context/DefaultInfo";
import requests from "../handler/handleRequest";
import GetUrl from "../Context/UrlSource";
import cookie from 'react-cookies';

export default function Good() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mag, setMag] = useState("")
    const onClick = (e)=>{
        requests.get(GetUrl("goods"),{
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
        })
            .then(response=>{
                message.success('获取成功');
                setMag(response.data['mag'])
                setIsModalOpen(true)
            })
            .catch(e=>{
                message.error(e.msg)
                console.log("Error:", e)
            })
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <App>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: mainThemeColor,
                    },
                }}
            >
                <Button onClick={onClick}> 获取一个item </Button>
                <Modal title="盲盒" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>{mag}</p>
                </Modal>
            </ConfigProvider>
        </App>
    );
}