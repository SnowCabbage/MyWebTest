import { ConfigProvider, Input} from "antd";
import React, {useState} from "react";
import ImageUploadUnit from "../Units/ImageUploadUnit";
import {mainThemeColor} from "../Context/DefaultInfo";

export default function UpdateHomeCover() {
    const [coverId, setCoverId] = useState("0")

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
                    // update ={onUpdate}
                    urlName={'home_cover'}
                    mode={'cover'}
                    cover_id={coverId}
                />
            </div>
        </ConfigProvider>
    );
}