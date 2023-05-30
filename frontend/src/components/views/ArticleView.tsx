import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Context/AuthContext";
import { useParams} from "react-router-dom";
import cookie from 'react-cookies';
import GetUrl from "../Context/UrlSource";
import {Avatar, Button, ConfigProvider, Form, Input, List, message, Skeleton} from "antd";
import requests from "../handler/handleRequest";
import {mainThemeColor} from "../Context/DefaultInfo";
import '../../styleCss/commentsStyle.css'
import '../../styleCss/markdownStyle.css'
import 'github-markdown-css';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {CustomizeCommentsEmpty} from '../config/CustomizeRenderEmpty'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dark} from "react-syntax-highlighter/dist/esm/styles/prism";


export default function ArticleView() {
    const {currentUser} = useContext(UserContext)
    const params = useParams();
    const [form] = Form.useForm();
    const [refreshComments, setRefreshComments] = useState(0)
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
        requests.get(GetUrl("comments/" + params.id),{headers: {
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
    },[refreshComments])

    const onFinish = (values: any) => {
        setLoading(true)
        let data = values
        let currentDate = new Date()
        data['author'] = currentUser.user
        data['update_time'] = currentDate.toLocaleString()
        data['avatar_id'] = currentUser.user_avatar
        data['movie_id'] = params.id
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
        let refresh = refreshComments + 1
        setRefreshComments(refresh)
        resetAll()
    };

    const resetAll = ()=>{
        form.resetFields()
    }

    const sendMsg=(data) => {
        data = {
            "data": data,
        }
        requests.post(GetUrl("comments/" + params.id),data, {
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
            <ReactMarkdown
                children={contentInfo.content}
                remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                rehypePlugins={[rehypeRaw]}
                className="markdown-body"
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
            />
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
                            rows={2}
                            style={{whiteSpace:'pre-wrap'}}
                            onKeyDown={e=>add(e)}
                            required
                        />
                    </Form.Item>

                    <Form.Item
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

            <ConfigProvider renderEmpty={CustomizeCommentsEmpty}>

            <div className={'comments'}>
                {
                    commentLoading ? <List
                    itemLayout="vertical"
                    pagination={{
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
                            align: 'center'
                        }}
                        className={'my-wrapper'}
                        dataSource={comments}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={GetUrl('images/' + item.avatar_id)}/>}
                                    title={item.author}
                                />
                                <div className={'comment-text'} style={{display: "flex"}}>
                                    {item.content}
                                </div>


                            </List.Item>
                        )}
                    />
                }
            </div>
                </ConfigProvider>
        </ConfigProvider>
    );
}