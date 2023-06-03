import React, {useContext, useState} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import requests from "../handler/handleRequest";
import GetUrl from "../Context/UrlSource";
import {UserContext} from "../Context/AuthContext";
import { App } from 'antd';
import cookie from 'react-cookies';

export interface Props {
    update?:any
    urlName:string
    mode:string
    cover_id?:string
}

export default function ImageUploadUnit(prop:Props){
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const {currentUser} = useContext(UserContext)

    const handleUpload = () => {
        const formData = new FormData();
        let idx = 1
        fileList.forEach((file) => {
            formData.append('file' + idx, file as RcFile);
            if (prop.mode === 'user')
                formData.append(prop.mode, currentUser.user);
            else if (prop.mode === 'cover') formData.append(prop.mode, prop.cover_id);
            idx += 1;
        });
        setUploading(true);

        requests.post(GetUrl(prop.urlName), formData, {headers: {
                "Content-type": "multipart/form-data",
                "Authorization": "Bearer " + cookie.load("access_token"),
            }})
            .then(response=>{
                setFileList([]);
                if (prop.update !== undefined) prop.update(response.data.image_id)
                message.success('修改成功');
            })
            .catch(e=>{
                message.error('修改失败');
                console.log("Error:", e)
            })
            .finally(() => {
                setUploading(false);
            })
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {

            //限制只能上传一个文件
            let newFileList = [...fileList, file]
            newFileList = newFileList.slice(-1)
            setFileList(newFileList)
            return false;
        },
        fileList,
    };

    return (
        <App>
            <Upload {...props}>
                <Button icon={<UploadOutlined />} >选择文件</Button>
            </Upload>
            <Button
                type="primary"
                onClick={()=>{
                    handleUpload();
                }}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? '上传中' : '确定'}
            </Button>
        </App>
    );
};