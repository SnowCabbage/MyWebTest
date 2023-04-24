import React, {useContext, useEffect, useState} from "react";
import {Avatar, Button, Checkbox, ConfigProvider, Form, Input, Menu, MenuProps, message, Card} from "antd";
import Header from "../Header";
import Footer from "../Footer";
import {useLocation, useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';
import GetUrl from "../Context/UrlSource";
import {UserContext} from "../Context/AuthContext";
import axios from "axios";

export default function Login(){
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState("")
    // const [ready, setReady] = useState(0)
    const {setCurrentUser} = useContext(UserContext)

    const sendMsg=(data) => {
        // fetch(
        //     // 'http://lee666.sv1.k9s.run:2271/api/login'
        //     // 'http://127.0.0.1:5000/api/login'
        //     GetUrl("login")
        //     ,{
        //         method: 'POST',
        //         headers: {
        //             "Content-type": "application/json",
        //             // "Authorization": "Basic QWVyaXRoOjEyMzQ1Njc4"
        //         },
        //         body: JSON.stringify(data),
        //         // mode: "no-cors",
        //     })
        //     .then(res=>res.json())
        //     .then(data=>{
        //         console.log(data)
        //         // console.log(data['user'])
        //         if('access_token' in data){
        //             console.log(data['user'])
        //             setUser(data['user'])
        //             cookie.save('access_token',data['access_token'],{path:"/"})
        //             success(data)
        //         }
        //         else fail()
        //     })
        //     .catch(e=>console.log('Error:',e))
        axios.post(GetUrl("login"),data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
            timeout: 2000
        })
            .then(response=>{
                // console.log(data)
                if('access_token' in response.data){
                    console.log(response.data['user'])
                    setUser(response.data['user'])
                    cookie.save('access_token',response.data['access_token'],{path:"/"})
                    success()
                }
                else fail('密码或用户名错误')
            })
            .catch(e=>{
                fail('请求超时')
                console.log("Error:", e)
            })
    };

    useEffect(()=>{
        setCurrentUser({name: user})
    },[user])

    const toHome = ()=>{
        navigate(state?.path || "/home", {replace:true,state:{username: user}});
        // navigate(0);
    }

    const { state } = useLocation();
    const success = () => {

        setLoading(false)
        messageApi.open({
            type: 'success',
            content: '登录成功',
        });
        setTimeout(()=>{
            // window.location.reload()
            toHome()
        }, 2000)

    };

    const fail = (msg) => {
        setLoading(false)
        messageApi.open({
            type: 'error',
            content: msg,
        });
        // setTimeout(()=>{
        //     return navigate('/addentry')
        // }, 2000)

    };

    const onFinish = (values: any) => {
        setLoading(true)
        sendMsg(values)
        // console.log(result)
        // redirect('/movies')
        // console.log('Success:', values);
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
                {/*<Header index={"login"}/>*/}
                {contextHolder}
            {/*<Header index="logIn"/>*/}
            <div className={"contentStyle"}>
                    <Card title="登录" bordered={false} style={{
                        width: 500,
                        margin: 'auto',
                        // top: 50,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        top: 36,
                        background: '#e0f0e9',
                    }}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ minWidth: 400,
                                maxWidth: 600,
                                display:"inline-block",
                                position: "relative",
                                right:54
                            }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="账号"
                                name="username"
                                rules={[
                                    {required: true, message: '请输入账号'},
                                ]}
                            >
                                <Input placeholder="请输入账号"/>
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[
                                    { required: true, message: '请输入密码!' },
                                ]}
                            >
                                <Input.Password placeholder="请输入密码"/>
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
            </div>
        </ConfigProvider>
    );
}