import { Button, Card, ConfigProvider, Form, Input, message} from "antd";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../Context/AuthContext";
import ImageUploadUnit from "../Units/ImageUploadUnit";
import {mainThemeColor} from "../Context/DefaultInfo";

export default function UploadImage() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext)
    const {setCurrentUser} = useContext(UserContext)
    // 更新头像
    const onUpdate = (value)=>{
        // debug
        // console.log(value)
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: mainThemeColor,
                },
            }}
        >
            {contextHolder}
                <div>
                    <div style={{float: 'left'}} >上传图片</div><br/>
                    <ImageUploadUnit
                        // update ={onUpdate}
                        urlName={'avatar'}
                        mode={'user'}
                    />
                </div>
        </ConfigProvider>
    );
}