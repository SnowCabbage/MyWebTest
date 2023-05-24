import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Context/AuthContext";
import {NavLink, useParams} from "react-router-dom";
import cookie from 'react-cookies';
import axios from "axios";
import GetUrl from "../Context/UrlSource";
import {Avatar, Button, ConfigProvider, Form, Input, List, message, Skeleton} from "antd";
import requests from "../handler/handleRequest";
import {mainThemeColor} from "../Context/DefaultInfo";

export default function ArticleView() {
    const {currentUser} = useContext(UserContext)
    const params = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)
    const { TextArea } = Input;
    const [contentInfo, setContentInfo] = useState({
        "desc": "",
        "title": "",
        "update_date": "",
        "create_by": "",
        "content": ""
    })
    const [nums, setNums] = useState(0)
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(true)
    // const {contentWidth} = useContext(ContentWidthContext)

    useEffect(()=>{
        requests.get(GetUrl("movies/" + params.id), {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            }})
            .then(response=>{
                setLoading(false)
                setContentInfo(response.data['data'])
            })
            .catch(e=>console.log('Error:', e))
    },[])

    useEffect(()=>{
        requests.get(GetUrl("comments"),{headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            }})
            .then(response=>{
                // setMovies(response['data']['movies'])
                // console.log(response.data)
                setCommentLoading(false)
                setNums(response.data['data']['num'])
                setComments(response.data['data']['comments'])

                //debug
                // console.log(response.data['data']['movies'])
            })
            .catch(e=>console.log('Error:', e.message))
    },[loading])

    const onFinish = (values: any) => {
        setLoading(true)
        let data = values
        let currentDate = new Date()
        data['author'] = currentUser.user
        data['update_time'] = currentDate.toLocaleString()
        data['avatar_id'] = currentUser.user_avatar
        // if (data['content'] == null) data['content'] = 'To be update'
        //debug
        // console.log(data['content'])
        // console.log(data)
        sendMsg(data)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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

    const success = () => {
        setLoading(false)
        message.success('评论成功');
        resetAll()
    };

    const resetAll = ()=>{
        form.resetFields()
    }

    const sendMsg=(data) => {
        data = {
            "data": data,
        }
        requests.post(GetUrl("comments"),data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            },
        })
            .then(response=>{
                // console.log(response.data)
                success()
            })
            .catch(e=>{
                fail(e.msg)
                console.log("Error:", e)
            })
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: mainThemeColor,
                },
            }}
        >
            <h1>{contentInfo.title}</h1>
            <p>Created by {contentInfo.create_by}</p>
            <p>{contentInfo.desc}</p>
            <div className={'mainText'}>
                <p>{contentInfo.content}</p>
            </div>
            <div style={{
                paddingTop: '20vh',
            }}>
                <Form
                    form={form}
                    name="basic"
                    style={{
                        width: '80vw',
                        maxWidth: 720,
                        display:"inline-block",
                        position: "relative"
                    }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="评论"
                        name="content"
                    >
                        <TextArea
                            rows={6}
                            style={{whiteSpace:'pre-wrap'}}
                            onKeyDown={e=>add(e)}
                            required
                        />
                    </Form.Item>

                    <Form.Item
                        // wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div>
                {
                    commentLoading ? <List
                    itemLayout="vertical"
                    pagination={{
                        // onChange: (page) => {
                        //     console.log(page);
                        // },
                        pageSize: 6,
                    }}
                    dataSource={[
                        {
                            "desc": "This is a test",
                            "id": 1,
                            "name": "My Neighbor Totoro",
                            "url": "https://flappybird.io/",
                            "year": "1988"
                        },
                        {
                            "desc": "Ran is a girl",
                            "id": 2,
                            "name": "Ran",
                            "url": "https://flappybird.io/",
                            "year": "1997"
                        },
                        {
                            "desc": "666",
                            "id": 3,
                            "name": "666",
                            "url": "666",
                            "year": "666"
                        }]}
                    renderItem={(item, index) => (
                        <List.Item>
                            <Skeleton loading={commentLoading} active avatar>
                                <List.Item.Meta
                                    avatar={<Avatar src={'../../../../dog.jpg'}/>}
                                />
                                    <div className={'comment-text'} style={{display: "flex"}}>
                                        {item.desc}
                                    </div>

                                    <div className={'comment-author'} style={{display: "flex", flexDirection: "row-reverse"}}>
                                        by me
                                    </div>
                            </Skeleton>
                        </List.Item>
                    )}
                /> : <List
                        itemLayout="vertical"
                        pagination={{
                            pageSize: 6,
                        }}
                        dataSource={comments}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={GetUrl('images/' + item.avatar_id)}/>}
                                />
                                <div className={'comment-text'} style={{display: "flex"}}>
                                    {item.content}
                                </div>

                                <div className={'comment-author'} style={{display: "flex", flexDirection: "row-reverse"}}>
                                    by {item.author}
                                </div>
                            </List.Item>
                        )}
                    />
                }
            </div>
        </ConfigProvider>
    );
}