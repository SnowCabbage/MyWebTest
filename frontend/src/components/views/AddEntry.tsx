import React, {useContext, useEffect, useState} from "react";
import {ConfigProvider, Card} from "antd";
import { Button, Form, Input ,message} from 'antd';
import GetUrl from "../Context/UrlSource";
import cookie from 'react-cookies';
import {UserContext} from "../Context/AuthContext";
import requests from "../handler/handleRequest";

export default function AddEntry() {

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const {currentUser} = useContext(UserContext)

    const sendMsg=(data) => {

        data = {
            "data": data
        }
        data['data']['url'] = 'https://' + data['data']['url']
        requests.post(GetUrl("movies"),data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
        })
            .then(response=>{
                if('error' in response.data) fail('上传失败')
                    else success()
        })
            .catch(e=>{
                fail(e.msg)
                console.log("Error:", e)
            })
    };

    const success = () => {
        setLoading(false)
        messageApi.open({
            type: 'success',
            content: '上传成功',
        });
        resetAll()
    };

    const resetAll = ()=>{
        form.resetFields()
    }

    const fail = (msg) => {
        setLoading(false)
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const onFinish = (values: any) => {
        setLoading(true)
        let data = values
        let currentDate = new Date()
        data['create_by'] = currentUser.name
        data['update_date'] = currentDate.toLocaleString()
        if (data['content'] == null) data['content'] = 'To be update'
        //debug
        // console.log(data['content'])
        // console.log(data)
        sendMsg(data)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    //实现tab缩进
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

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4b5cc4',
                },
            }}
        >
                    {contextHolder}
            <Card title="名单" bordered={false} style={{
                width: '60vw',
                maxWidth: 500,
                margin: 'auto',
                // top: 36,
                right: 0,
                left: 0,
                // bottom: 36,
                background: '#ffffff',
            }}>
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ width: '50vw',
                                maxWidth: 520,
                                display:"inline-block",
                                position: "relative",
                                right: '5vw'
                            }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="标题"
                                name="name"
                                validateTrigger={['onFinish']}
                                rules={[
                                    {required: true, message: '请输入标题'},
                                    {max: 16, message: '标题过长'},
                                ]}
                            >
                                <Input placeholder="请输入文章标题"/>
                            </Form.Item>

                            <Form.Item
                                label="描述"
                                name="desc"
                                rules={[{ required: true, message: '请输入简单描述!' }]}
                            >
                                <Input placeholder="请输入简单描述"/>
                            </Form.Item>

                            <Form.Item
                                label="内容"
                                name="content"
                            >
                                <TextArea
                                    rows={6}
                                    style={{whiteSpace:'pre-wrap'}}
                                    onKeyDown={e=>add(e)}
                                />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{ offset: 8, span: 16 }}
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
            </Card>
        </ConfigProvider>
    );
}