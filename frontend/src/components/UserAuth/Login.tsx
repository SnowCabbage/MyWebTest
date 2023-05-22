import React, {useContext, useEffect, useState} from "react";
import { Button, Checkbox, ConfigProvider, Form, Input, Menu, MenuProps, message, Card} from "antd";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';
import GetUrl from "../Context/UrlSource";
import {UserContext} from "../Context/AuthContext";
import requests from "../handler/handleRequest";
import {defaultUserInfo} from "../Context/DefaultInfo";

export default function Login(){
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(defaultUserInfo)
    // const [ready, setReady] = useState(0)
    const {setCurrentUser} = useContext(UserContext)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState({});

    // 及其简陋的屏幕适配
    // const cardWidth = contentWidth * 0.36
    // const formWidth = contentWidth * 0.24

    useEffect(() => {
        forceUpdate({});
    }, []);

    const sendMsg=(data) => {
        requests.post(GetUrl("login"),data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
        })
            .then(response=>{
                if('access_token' in response.data){
                    // console.log(response.data['user'])
                    setUser(response.data['user_profile'])
                    let inFifteenMinutes = new Date(new Date().getTime() + 0.25 * 3600 * 1000);//一天
                    cookie.save('user', response.data['user_profile']['user'],{path:"/", expires: inFifteenMinutes});
                    cookie.save('access_token',response.data['access_token'],{path:"/", expires: inFifteenMinutes})
                    success()
                }
                else fail('密码或用户名错误')
            })
            .catch(e=>{
                fail(e.msg)
                console.log("Error:", e)
            })
    };

    useEffect(()=>{
        setCurrentUser(user)
    },[setCurrentUser, user])

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
                    colorPrimary: '#177cb0',
                },
            }}
        >
                {contextHolder}
            {/*<div className={"contentStyle"}>*/}
                    <Card title="登录" bordered={false} style={{
                        width: '50vw',
                        maxWidth: 420,
                        margin: 'auto',
                        // top: 50,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        top: 36,
                        background: '#ffffff',
                    }}>
                        <Form
                            name="basic"
                            form={form}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ width: '42vw',
                                maxWidth: 425,
                                display:"inline-block",
                                position: "relative",
                                right:'4vw'
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

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }} shouldUpdate>
                                {()=>(
                                    <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        disabled={
                                            !form.isFieldsTouched(['username', 'password']) ||
                                            !!form.getFieldsError().filter(({errors}) => errors.length).length
                                        }
                                        style={{
                                            right:'2.5vw'
                                        }}
                                    >
                                        登录
                                    </Button>
                                        <NavLink to="/home/register" style={{
                                            color:'#0eb840',
                                            display: 'inline-block',
                                            // position: 'absolute',
                                            top: '1vh',
                                            right: '5vw',
                                            fontSize: 14
                                        }}>立即注册</NavLink>
                                    </div>
                                )}
                            </Form.Item>
                        </Form>
                    </Card>
            {/*</div>*/}
        </ConfigProvider>
    );
}