import React, { useState} from "react";
import 'github-markdown-css';
import {App, Button, Card,  Form, Input, message} from "antd";
import axios from "axios";


export default function Test() {

    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    // const [newUser, setNewUser] = useState(null)

    const sendMsg=(data) => {
        let sendData = {}
        sendData["data"] = data
        axios.post('http://49.234.7.132/api/setting',sendData, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NjAxOTM3NSwianRpIjoiZmM2YmEwYTItZjE4OC00MTljLTg1YzUtYzBiNTBlZTNjMGQzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluIiwibmJmIjoxNjg2MDE5Mzc1LCJleHAiOjE2ODYwMjExNzUsInJvbGUiOiJBZG1pbiIsInVzZXIiOiJhZG1pbiJ9.uiT-jnJHKRxxzEUe2ymWHw2ZOryDNDpVkTocGNf0a6I",
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

        //debug
        // console.log(updateUser)

        setLoading(false)
        message.success('更新成功');
        // setTimeout(()=>{
        //     navigate("/home");
        // }, 800)

    };

    const fail = (msg) => {
        setLoading(false)
        message.error(msg);
    };

    const onFinish = (values: any) => {
        // console.log(values)
        setLoading(true)
        values['user'] = 'admin'
        // console.log(values)
        sendMsg(values)
    };


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <App>
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
                            validateTrigger={'onBlur'}
                            rules={[
                                {required: true, message: '请输入新账号'},
                                {max: 16, message: '账号名称过长'},
                                {min: 4, message: '账号名称过短'},
                                { validator: async (rule, val, callback) => {
                                        let pattern = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]{4,20}$/);
                                        if (!pattern.test(val) && val){
                                            return callback('请输入正确账号,仅能由中文、英文、数字或下划线组成');
                                        }

                                        let sendData = {'username': val, 'old_user': 'admin'}
                                        const response = await axios.post('http://49.234.7.132/api/username_check',sendData, {
                                            headers: {
                                                "Content-type": "application/json",
                                            }
                                        })
                                        if (response.data['code'] === 'CHECK'){
                                            // form.setFields([{name: 'new_username', errors: ['已存在该用户名']}])
                                            //假如我用这种的话会显示是错误的，但是页面上还是可以提交表单数据
                                            // throw new Error('已存在该用户名')
                                            console.log('1111')
                                            throw new Error('Wrong')
                                            // return callback('已存在该用户名')
                                            //如果使用这种的话页面上根本没有显示，但是上面的正则匹配那里是可以显示的，同时也可以阻塞表单提交
                                        }


                                        callback();
                                    },
                                },
                            ]}
                        >
                            <Input/>
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
                </Card>
        </App>
    );
}