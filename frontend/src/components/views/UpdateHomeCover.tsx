import { Button, Card, ConfigProvider, Form, Input, message} from "antd";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../Context/AuthContext";
import ImageUploadUnit from "../Units/ImageUploadUnit";
import {mainThemeColor} from "../Context/DefaultInfo";
import {HomeCoverContext} from "../Context/ElementContext";

export default function UpdateHomeCover() {
    const {currentHomeCover} = useContext(HomeCoverContext)
    const {setCurrentHomeCover} = useContext(HomeCoverContext)
    const [coverId, setCoverId] = useState("0")
    // 更新封面
    const onUpdate = (value, id?:null)=>{
        // debug
        // console.log(value)
        const coverData=JSON.parse(JSON.stringify(currentHomeCover))
        console.log(coverData)
        // coverData[coverId].cover_id=value
        // setCurrentCover(coverData)
    }

    const onIdChange = (e)=>{
        setCoverId(e.target.value)
        console.log(e.target.value)
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: mainThemeColor,
                },
            }}
        >
            <Input placeholder="Basic usage" onChange={onIdChange}/>
            <div>
                <div style={{float: 'left'}} >上传图片</div><br/>
                <ImageUploadUnit
                    update ={onUpdate}
                    urlName={'home_cover'}
                    mode={'cover'}
                    cover_id={coverId}
                />
            </div>
        </ConfigProvider>
    );
}