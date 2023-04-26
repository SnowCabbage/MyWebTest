import React, {useContext} from "react";
import {ConfigProvider} from "antd";
import { Button, Form, Input ,message} from 'antd';
import { useNavigate } from 'react-router-dom';
import GetUrl from "../Context/UrlSource";
import cookie from 'react-cookies';
import axios from "axios";
import {UserContext} from "../Context/AuthContext";

export default function AddEntry() {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const {currentUser} = useContext(UserContext)

    const sendMsg=(data) => {

        data = {
            "data": data
        }
        data['data']['url'] = 'https://' + data['data']['url']
        axios.post(GetUrl("movies"),data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
            timeout: 6000
        })
            .then(response=>{
                if('error' in response.data) fail('上传失败')
                    else success()
        })
            .catch(e=>{
                fail('连接超时')
                console.log("Error:", e)
            })
    };

    const success = () => {
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
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const onFinish = (values: any) => {
        let data = values
        let currentDate = new Date()
        data['create_by'] = currentUser.name
        data['update_date'] = currentDate.toLocaleString()
        // console.log(data)
        sendMsg(data)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4b5cc4',
                },
            }}
        >
                    {contextHolder}
                    {/*<div className={"contentStyle"}>*/}
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ minWidth: 400,
                                maxWidth: 600,
                                display:"inline-block",
                                top: 50,
                                position: "relative"
                            }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="标题"
                                name="name"
                                hasFeedback
                                validateTrigger={['onFinish']}
                                rules={[
                                    {required: true, message: '请输入标题'},
                                    {max: 16, message: '标题过长'},
                                ]}
                            >
                                <Input placeholder="请输入电影名字"/>
                            </Form.Item>

                            <Form.Item
                                label="描述"
                                name="desc"
                                hasFeedback
                                rules={[{ required: true, message: '请输入简单描述!' }]}
                            >
                                <Input placeholder="请输入简单描述"/>
                            </Form.Item>

                            <Form.Item
                                label="内容"
                                name="content"
                            >
                                <TextArea rows={4} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    {/*</div>*/}
        </ConfigProvider>
    );
}