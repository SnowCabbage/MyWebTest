import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import cookie from 'react-cookies';
import axios from "axios";
import GetUrl from "../Context/UrlSource";
import {Button, Form, Input, message} from "antd";
import requests from "../handler/handleRequest";

export default function ArticleView() {
    const {currentUser} = useContext(UserContext)
    const params = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)
    const { TextArea } = Input;
    const [contentInfo, setContentInfo] = useState({
        "desc": "",
        "title": "",
        "update_date": "",
        "create_by": "",
        "content": ""
    })
    // const {contentWidth} = useContext(ContentWidthContext)

    useEffect(()=>{
        axios.get(GetUrl("movies/" + params.id), {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            }})
            .then(response=>{
                setLoading(false)
                setContentInfo(response.data['data'])

            })
            .catch(e=>console.log('Error:', e))
    },[])

    const onFinish = (values: any) => {
        setLoading(true)
        let data = values
        let currentDate = new Date()
        data['author'] = currentUser.user
        data['update_time'] = currentDate.toLocaleString()
        // if (data['content'] == null) data['content'] = 'To be update'
        //debug
        // console.log(data['content'])
        // console.log(data)
        sendMsg(data)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const add = (e) => {
        let val = e.target.value
        // debug
        // console.log("value:", val)
        // console.log("key code:", e.keyCode)

        if (e.keyCode === 9){
            e.preventDefault()
            val = val + "    "
            form.setFieldValue("content", val)
        }
    }

    const success = () => {
        setLoading(false)
        message.success('评论成功');
        resetAll()
    };

    const resetAll = ()=>{
        form.resetFields()
    }

    const sendMsg=(data) => {
        data = {
            "data": data,
        }
        requests.post(GetUrl("comments"),data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
        })
            .then(response=>{
                // console.log(response.data)
                success()
            })
            .catch(e=>{
                fail(e.msg)
                console.log("Error:", e)
            })
    };

    return (
        <>
            <h1>{contentInfo.title}</h1>
            <p>Created by {contentInfo.create_by}</p>
            <p>{contentInfo.desc}</p>
            <div className={'mainText'}>
                <p>{contentInfo.content}</p>
            </div>
            <div style={{
                paddingTop: '20vh',
                width: '80vw',
                maxWidth: 720,
            }}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // style={{ width: '80vw',
                    //     maxWidth: 720,
                    //     display:"inline-block",
                    //     position: "relative",
                    //     right: '5vw'
                    // }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="评论"
                        name="content"
                    >
                        <TextArea
                            rows={10}
                            style={{whiteSpace:'pre-wrap'}}
                            onKeyDown={e=>add(e)}
                            required
                        />
                    </Form.Item>

                    <Form.Item
                        // wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div></div>
        </>
    );
}