import React, {useContext, useEffect, useState} from "react";
import { Button, Checkbox, ConfigProvider, Form, Input, Menu, MenuProps, message, Card} from "antd";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import cookie from 'react-cookies';
import GetUrl from "../Context/UrlSource";
import {UserContext} from "../Context/AuthContext";
import requests from "../handler/handleRequest";
import {defaultUserInfo, mainThemeColor} from "../Context/DefaultInfo";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import BackIcon from "../Units/BackIcon";

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
                    let expiredTime = new Date(new Date().getTime() + 2 * 3600 * 1000);//2h
                    cookie.save('user', response.data['user_profile']['user'],{path:"/", expires: expiredTime});
                    cookie.save('access_token',response.data['access_token'],{path:"/", expires: expiredTime})
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
        }, 800)

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
                    colorPrimary: mainThemeColor,
                },
            }}
        >
                {contextHolder}
            {/*<div className={"contentStyle"}>*/}
                    <Card title="登录"
                          bordered={false}
                          extra={
                              <BackIcon path={'/home'}/>
                          }
                          style={{
                        width: '70vw',
                        maxWidth: 420,
                        margin: 'auto',
                        right: 0,
                        left: 0,
                        bottom: 0,
                        top: 30,
                        background: '#ffffff',
                    }}>
                        <Form
                            name="basic"
                            form={form}
                            // labelCol={{ span: 8 }}
                            // wrapperCol={{ span: 16 }}
                            style={{
                                width: '42vw',
                                maxWidth: 360,
                                display:"inline-block",
                                position: "relative",
                                // right:'4vw'
                            }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                // label="账号"
                                name="username"
                                rules={[
                                    {required: true, message: '请输入账号'},
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined/>}
                                    style={{height: 50, borderRadius: 16}}
                                    placeholder="请输入账号"
                                />
                            </Form.Item>

                            <Form.Item
                                // label="密码"
                                name="password"
                                rules={[
                                    { required: true, message: '请输入密码!' },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined/>}
                                    style={{height: 50, borderRadius: 16}}
                                    placeholder="请输入密码"
                                />
                            </Form.Item>

                            {/*<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>*/}
                            {/*    <Checkbox>Remember me</Checkbox>*/}
                            {/*</Form.Item>*/}

                            <Form.Item shouldUpdate>
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
                                            width: '100%',
                                            height: 40,
                                            borderRadius: 16
                                        }}
                                    >
                                        登录
                                    </Button>
                                        <NavLink to="/home/register" style={{
                                            color: mainThemeColor,
                                            // position: 'absolute',
                                            fontSize: 14,
                                            display: 'flex',
                                            flexDirection: 'row-reverse'
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