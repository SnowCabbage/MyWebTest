import React, {useState} from "react";
import {Avatar, Button, Checkbox, ConfigProvider, Form, Input, Menu, MenuProps, message, Card} from "antd";
import Header from "../Index";
import Footer from "../Footer";
import {useLocation, useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';
import GetUrl from "../Context/UrlSource";

export default function Register(){
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const sendMsg=(data) => {
        // console.log(data)
        let sendData = {}
        sendData["data"] = data
        fetch(
            // 'http://lee666.sv1.k9s.run:2271/api/login'
            // 'http://127.0.0.1:5000/api/login'
            GetUrl("users")
            ,{
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    // "Authorization": "Basic QWVyaXRoOjEyMzQ1Njc4"
                },
                body: JSON.stringify(sendData),
                // mode: "no-cors",
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                success()
                // if('access_token' in data){
                //     success()
                //     cookie.save('access_token',data['access_token'],{path:"/"})
                //     console.log(cookie.load('access_token'))
                // }
                // else fail()
            })
            .catch(e=>console.log('Error:',e))
    };

    const success = () => {
        setLoading(false)
        messageApi.open({
            type: 'success',
            content: '注册成功',
        });
        setTimeout(()=>{
            // window.location.reload()
            navigate("/login");
        }, 2000)

    };

    const fail = () => {
        setLoading(false)
        messageApi.open({
            type: 'error',
            content: '密码或用户名错误',
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
            {/*<Header index={"register"}/>*/}
            {contextHolder}
            {/*<main>*/}
                <Card title="注册" bordered={false} style={{
                    width: 500,
                    margin: 'auto',
                    top: 50,
                    right: 0,
                    left: 0,
                    bottom: 0,
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

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            {/*</main>*/}
            {/*<Footer/>*/}
        </ConfigProvider>
    );
}