import { ConfigProvider} from "antd";
import React from "react";
import ImageUploadUnit from "../Units/ImageUploadUnit";
import {mainThemeColor} from "../Context/DefaultInfo";

export default function UploadGoods() {

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: mainThemeColor,
                },
            }}
        >
            <div>
                <div style={{float: 'left'}} >上传</div><br/>
                <ImageUploadUnit
                    // update ={onUpdate}
                    urlName={'goods'}
                    mode={'cover'}
                />
            </div>
        </ConfigProvider>
);
}