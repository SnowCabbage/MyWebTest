import { Button, Card, ConfigProvider, Form, Input, message} from "antd";
import React, {useContext, useState} from "react";
import axios from "axios";
import GetUrl from "../Context/UrlSource";
import {useNavigate} from "react-router-dom";
import {ContentWidthContext} from "../Context/ElementContext";
import cookie from 'react-cookies';
import {UserContext} from "../Context/AuthContext";
import requests from "../handler/handleRequest";
import UploadImage from "../Units/UploadImage";
import {mainThemeColor} from "../Context/DefaultInfo";

export default function Setting() {
    const [messageApi, contextHolder] = message.useMessage();
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

    // useEffect(()=>{
    //     setCurrentUser({name: newUser})
    // },[newUser, setCurrentUser])

    const success = (updateUser) => {
        let inFifteenMinutes = new Date(new Date().getTime() + 0.25 * 3600 * 1000);//一天

        //debug
        // console.log(updateUser)

        setCurrentUser(updateUser)
        cookie.remove("user", { path: '/' })
        cookie.save('user', updateUser.user, {path:"/", expires: inFifteenMinutes});
        setLoading(false)
        messageApi.open({
            type: 'success',
            content: '更新成功',
        });
        setTimeout(()=>{
            navigate("/home");
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
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: mainThemeColor,
                },
            }}
        >
            {contextHolder}
            <Card title="修改信息" bordered={false} style={{
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
                        <Input placeholder="请输入新账号"/>
                    </Form.Item>

                    <Form.Item style={{display: 'inline-block'}} shouldUpdate>
                        {() => (
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
                        )}
                    </Form.Item>
                </Form>

                <div>
                    <div style={{float: 'left'}} >修改头像(暂时只支持jpg):</div><br/>

                    <UploadImage
                        update ={onUpdate}
                    />
                </div>

            </Card>

        </ConfigProvider>
    );
}