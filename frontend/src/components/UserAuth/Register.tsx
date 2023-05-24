import React, {useContext, useEffect, useState} from "react";
import { Button, ConfigProvider, Form, Input, message, Card} from "antd";
import { useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';
import GetUrl from "../Context/UrlSource";
import axios from "axios";
import {ContentWidthContext} from "../Context/ElementContext";
import {mainThemeColor} from "../Context/DefaultInfo";

export default function Register(){
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    // const [, forceUpdate] = useState({});
    const [isAble, setIsAble] = useState(true)

    // useEffect(() => {
    //     forceUpdate({});
    // }, []);

    const sendMsg=(data) => {
        let sendData = {}
        sendData["data"] = data
        axios.post(GetUrl("users"),sendData, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
            timeout: 6000
        })
            .then(response=>{
                success()
            })
            .catch(e=>{
                console.log('Error:', e)
                fail('连接超时')
            })
    };

    const success = () => {
        setLoading(false)
        messageApi.open({
            type: 'success',
            content: '注册成功',
        });
        setTimeout(()=>{
            // window.location.reload()
            navigate("/home/login");
        }, 2000)

    };

    const fail = (msg) => {
        setLoading(false)
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const onFinish = (values: any) => {
        // console.log(values)
        setLoading(true)
        sendMsg(values)
    };


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        // console.log(form.getFieldsError().filter(({errors})=>errors.length))
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: mainThemeColor,
                },
            }}
        >
            {contextHolder}
                <Card title="注册" bordered={false} style={{
                    width: '60vw',
                    maxWidth: 420,
                    margin: 'auto',
                    top: 30,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    background: '#ffffff',
                }}>
                    <Form
                        name="basic"
                        form={form}
                        style={{
                            // width: '42vw',
                            // maxWidth: 420,
                            width: '100%',
                            display:"inline-block",
                            position: "relative",
                            // right:'4vw'
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="账号"
                            name="username"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 17 }}
                            validateFirst={true}
                            validateTrigger={'onBlur'}
                            rules={[
                                {required: true, message: '请输入账号'},
                                {max: 16, message: '账号名称过长'},
                                {min: 4, message: '账号名称过短'},
                                { validator:  (rule, val, callback) => {
                                        let pattern = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]{4,20}$/);
                                        if (!pattern.test(val) && val){
                                            return callback('请输入正确账号,仅能由中文、英文、数字或下划线组成');
                                        }

                                        let sendData = {'username': val}
                                        axios.post(GetUrl("username_check"),sendData, {
                                            headers: {
                                                "Content-type": "application/json",
                                            },
                                            timeout: 6000
                                        })
                                            .then(response=>{
                                                if (response.data['code'] === 'Error'){
                                                    form.setFields([{name: 'username', errors: ['已存在该用户名']}])
                                                }else {
                                                    setIsAble(false)
                                                    callback()
                                                }
                                            })
                                            .catch(e=>{
                                                console.log('Error:', e)
                                                messageApi.open({
                                                    type: 'error',
                                                    content: '连接超时',
                                                });
                                            })

                                        callback();
                                    },
                                },
                            ]}
                        >
                            <Input placeholder="请输入账号"/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 17 }}
                            rules={[
                                { required: true, message: '请输入密码!' },
                                {min: 6, message: '密码过短'},
                            ]}
                        >
                            <Input.Password placeholder="请输入密码"/>
                        </Form.Item>

                        <Form.Item
                            label="确认密码"
                            name="vertifyPassword"
                            validateTrigger="onBlur"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 17 }}
                            rules={[
                                { required: true, message: '请输入密码!' },
                                ({getFieldValue})=>({
                                    validator(rule,value){
                                        if(!value || getFieldValue('password') === value){
                                            return Promise.resolve()
                                        }
                                        return Promise.reject("两次密码输入不一致")
                                    }
                                }) //二次校验密码
                            ]}
                        >
                            <Input.Password placeholder="请再次输入密码"/>
                        </Form.Item>



                        <Form.Item shouldUpdate>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    disabled={
                                        !form.isFieldsTouched(['username']) ||
                                        !!form.getFieldsError().filter(({errors}) => errors.length).length ||
                                        isAble
                                    }
                                    style={{
                                        height: 40,
                                        width: '100%'
                                    }}
                                >
                                    注册
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Card>
        </ConfigProvider>
    );
}