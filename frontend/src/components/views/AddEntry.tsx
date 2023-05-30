import React, {useContext, useEffect, useRef, useState} from "react";
import {ConfigProvider, Card} from "antd";
import { Button, Form, Input ,message} from 'antd';
import GetUrl from "../Context/UrlSource";
import cookie from 'react-cookies';
import {UserContext} from "../Context/AuthContext";
import requests from "../handler/handleRequest";
import {mainThemeColor} from "../Context/DefaultInfo";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import '../../styleCss/markdownStyle.css'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'// 解析标签，支持html语法

export default function AddEntry() {

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const {currentUser} = useContext(UserContext)
    const mdEditor = useRef(null);
    const [value, setValue] = useState("xxx");

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

    const onFinish = (values) => {
        //debug
        // console.log(values)

        setLoading(true)
        let data = values
        let currentDate = new Date()
        data['create_by'] = currentUser.user
        data['update_date'] = currentDate.toLocaleString()
        data['avatar_id'] = currentUser.user_avatar
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

    const handleEditorChange = (text) => {
        // const newValue = text.replace(/\d/g, "");
        // console.log(text);
        setValue(text);
        // console.log(text);
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
            <Card title="增加条目" bordered={false} style={{
                width: '80vw',
                maxWidth: 900,
                margin: 'auto',
                right: 0,
                left: 0,
                background: '#ffffff',
            }}>
                        <Form
                            form={form}
                            name="basic"
                            style={{
                                width: '75vw',
                                maxWidth: 800,
                                display:"inline-block",
                                position: "relative",
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="标题"
                                labelCol={{ span: 3 }}
                                name="name"
                                rules={[
                                    {required: true, message: '请输入标题'},
                                    {max: 16, message: '标题过长'},
                                ]}
                            >
                                <Input placeholder="请输入文章标题"
                                       style={{
                                           width: '40vw',
                                           maxWidth: 420,
                                           display: 'flex'
                                       }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="描述"
                                labelCol={{ span: 3 }}
                                name="desc"
                                rules={[{ required: true, message: '请输入简单描述!' }]}
                            >
                                <Input placeholder="请输入简单描述"
                                       style={{
                                           width: '40vw',
                                           maxWidth: 420,
                                           display: 'flex'
                                       }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="正文"
                                labelCol={{ span: 3 }}
                                name="content"
                                getValueFromEvent={(value)=> value.text}
                            >
                            <Editor
                                ref={mdEditor}
                                value={value}
                                style={{
                                    height: "500px",
                                    textAlign: 'initial'
                                }}
                                onChange={(value)=>handleEditorChange(value.text)}
                                className={'my-editor'}
                                renderHTML={text => <ReactMarkdown
                                                                children={text}
                                                                className={'markdown-body'}
                                                                remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                                                                rehypePlugins={[rehypeRaw]}
                                                                components={{
                                                                    img(props){
                                                                        return <img {...props} style={{height: 320, width: 320, marginLeft: "50%"}}  alt={'img'}/>
                                                                    },
                                                                    code({node, inline, className, children, ...props}) {
                                                                        const match = /language-(\w+)/.exec(className || '')
                                                                        return !inline && match ? (
                                                                            <SyntaxHighlighter
                                                                                {...props}
                                                                                children={String(children).replace(/\n$/, '')}
                                                                                style={dark}
                                                                                language={match[1]}
                                                                                PreTag="div"
                                                                            />
                                                                        ) : (
                                                                            <code {...props} className={className}>
                                                                                {children}
                                                                            </code>
                                                                        )
                                                                    }
                                                                }}
                                                            />}
                            />
                            </Form.Item>
                            <Form.Item
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    style={{
                                        width: 100,
                                        height: 36
                                    }}
                                >
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
            </Card>
        </ConfigProvider>
    );
}