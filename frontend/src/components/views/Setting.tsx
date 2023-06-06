import { Button, Card, ConfigProvider, Form, Input, message} from "antd";
import React, {useContext, useState} from "react";
import axios from "axios";
import GetUrl from "../Context/UrlSource";
import {useNavigate} from "react-router-dom";
import cookie from 'react-cookies';
import { UserContext} from "../Context/AuthContext";
import requests from "../handler/handleRequest";
import ImageUploadUnit from "../Units/ImageUploadUnit";
import {mainThemeColor} from "../Context/DefaultInfo";
import { App } from 'antd';

export default function Setting() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const {currentUser} = useContext(UserContext)
    const {setCurrentUser} = useContext(UserContext)
    // const [newUser, setNewUser] = useState(null)

    const sendMsg=(data) => {
        let sendData = {}
        sendData["data"] = data
        requests.post(GetUrl("setting"),sendData, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
        })
            .then(response=>{
                //debug
                // console.log(response.data)

                success(response.data['data']['user_profile'])
            })
            .catch(e=>{
                fail(e.msg)
            })
    };

    const success = (updateUser) => {
        let expiredTime = new Date(new Date().getTime() + 2 * 3600 * 1000);//2h

        //debug
        // console.log(updateUser)

        setCurrentUser(updateUser)
        cookie.remove("user", { path: '/' })
        cookie.save('user', updateUser.user, {path:"/", expires: expiredTime});
        setLoading(false)
        message.success('更新成功');
        setTimeout(()=>{
            navigate("/home");
        }, 800)

    };

    const fail = (msg) => {
        setLoading(false)
        message.error(msg);
    };

    const onFinish = (values: any) => {
        // console.log(values)
        setLoading(true)
        values['user'] = currentUser.user
        // console.log(values)
        sendMsg(values)
    };


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // 更新头像
    const onUpdate = (value)=>{
        // debug
        // console.log(value)

        let user = currentUser.user
        setCurrentUser({user: user, user_avatar: value})
    }

    return (
        <App>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: mainThemeColor,
                },
            }}
        >
            <Card title="个人设置" bordered={false} style={{
                width: '80vw',
                maxWidth: 480,
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
                        width: '40vw',
                        maxWidth: 420,
                        display:"inline-block",
                        position: "relative",
                        textAlign: 'center'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="新账号"
                        name="new_username"
                        validateFirst={true}
                        initialValue={currentUser.user}
                        validateTrigger={'onBlur'}
                        rules={[
                            {required: true, message: '请输入新账号'},
                            {max: 16, message: '账号名称过长'},
                            {min: 4, message: '账号名称过短'},
                            { validator:  (rule, val, callback) => {
                                    let pattern = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]{4,20}$/);
                                    if (!pattern.test(val) && val){
                                        return callback('请输入正确账号,仅能由中文、英文、数字或下划线组成');
                                    }

                                    let sendData = {'username': val}
                                    requests.post(GetUrl("username_check"),sendData, {
                                        headers: {
                                            "Content-type": "application/json",
                                        }
                                    })
                                        .then(response=>{
                                            if (response.data['code'] === 'CHECK'){
                                                form.setFields([{name: 'new_username', errors: ['已存在该用户名']}])
                                                //假如我用这种的话会显示是错误的，但是页面上还是可以提交表单数据

                                                // console.log('1111')
                                                return callback('已存在该用户名')
                                                //如果使用这种的话页面上根本没有显示，但是上面的正则匹配那里是可以显示的，同时也可以阻塞表单提交
                                            }
                                        })
                                        .catch(e=>{
                                            console.log('Error:', e)
                                        })

                                    callback();
                                },
                            },
                        ]}
                    >
                        <Input defaultValue={currentUser.user}/>
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="new_password"
                        validateFirst={true}
                        validateTrigger={'onBlur'}
                        rules={[
                            {required: true, message: '请输入新密码'},
                            {min: 6, message: '密码过短'},
                            { validator:  (rule, val, callback) => {
                                    let pattern = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]{4,20}$/);
                                    if (!pattern.test(val) && val){
                                        return callback('密码仅能由中文、英文、数字或下划线组成');
                                    }

                                    let sendData = {
                                        'username': form.getFieldValue('new_username'),
                                        'password': val
                                    }
                                    requests.post(GetUrl("username_check"),sendData, {
                                        headers: {
                                            "Content-type": "application/json",
                                        }
                                    })
                                        .then(response=>{
                                            if (response.data['code'] === 'CHECK'){
                                                //TODO:try callback?
                                                form.setFields([{name: 'new_password', errors: ['不能使用重复的密码']}])
                                            }else {
                                                callback()
                                            }
                                        })
                                        .catch(e=>{
                                            console.log('Error:', e)
                                        })

                                    callback();
                                },
                            },
                        ]}
                    >
                        <Input placeholder={'请输入新密码'} type={'password'}/>
                    </Form.Item>

                    <Form.Item style={{display: 'inline-block'}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    height: 36,
                                    width: 100
                                }}
                            >
                                更新
                            </Button>
                    </Form.Item>
                </Form>

                <div>
                    <div style={{float: 'left'}} >修改头像(支持jpg,png):</div><br/>

                    <ImageUploadUnit
                        update ={onUpdate}
                        urlName={'avatar'}
                        mode={'user'}
                    />
                </div>
            </Card>

        </ConfigProvider>
        </App>
    );
}