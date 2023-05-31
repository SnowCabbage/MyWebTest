import axios from "axios";
import React, {useEffect, useState} from "react";
import '../../static/style.css'
import {Avatar, List, Card, ConfigProvider, Skeleton, PaginationProps, message, Space} from 'antd';
import cookie from 'react-cookies';
import GetUrl from "../Context/UrlSource";
import {NavLink} from "react-router-dom";
import requests from "../handler/handleRequest";
import {mainThemeColor} from "../Context/DefaultInfo";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";


export default function ListMovies()  {
    const [movies, setMovies] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [nums, setNums] = useState(0)
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(0)
    const showTotalConfig: PaginationProps['showTotal'] = (nums) => `总共 ${nums}`;

    useEffect(()=>{
        requests.get(GetUrl("movies"),{headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + cookie.load("access_token"),
                        }})
            .then(response=>{
                // setMovies(response['data']['movies'])
                // console.log(response.data)
                setLoading(false)
                setNums(response.data['data']['num'])
                setMovies(response.data['data']['movies'])

                //debug
                // console.log(response.data['data']['movies'])
        })
            .catch(e=>console.log('Error:', e))

        // console.log(moviesHeight.current.clientHeight)
    },[update])

    const Operate =(id)=>{
        return (event: React.MouseEvent) => {

            //debug
            // console.log(id)

            // let operateHandler = new ArticleAction('1', 'delete')
            requests.delete(GetUrl(`movies/` + id), {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + cookie.load("access_token"),
                },
            }).then((response)=>{
                //debug
                // console.log("response:", response)

                if(response.data.code === "No permission"){
                    //debug
                    // console.log("1111")

                    messageApi.open({
                        type: 'error',
                        content: '权限不足',
                    });
                }
                else{
                    messageApi.open({
                        type: 'success',
                        content: '删除成功',
                    });
                    let shouldUpdate = update + 1
                    setUpdate(shouldUpdate)
                }
            }).catch(e => {
                console.log("Error:", e)
            })
            event.preventDefault();
        }
        //debug
        // console.log('ans:',ans)
    }

    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
        // @ts-ignore
    return(
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: mainThemeColor,
                    },
                }}
            >
                {contextHolder}
                        <Card bordered={false} style={{
                            width: '80vw',
                            maxWidth: 800,
                            margin: 'auto',
                            // top: 36,
                            right: 0,
                            left: 0,
                            // bottom: 36,
                            background: '#ffffff',
                        }}>
                            {loading ? <List
                                itemLayout="vertical"
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
                                                <Skeleton loading={loading} active avatar>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={'../../../../dog.jpg'}/>}
                                                        title={<NavLink to={item.url}>{item.name}</NavLink>}
                                                        description={"Release" + item.year}
                                                    />
                                                    <div style={{display: "flex"}}>
                                                        简介:{item.desc}
                                                    </div>
                                                </Skeleton>
                                            </List.Item>
                                            )}
                            /> : <List
                                pagination={{
                                    position:"bottom",
                                    align:"center",
                                    pageSize:6,
                                    total:nums,
                                    showTotal: showTotalConfig
                                }}
                                style={{
                                    textAlign: 'initial'
                                }}
                                className={'list-wrapper'}
                                itemLayout="vertical"
                                dataSource={movies}
                                renderItem={(item) => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <IconText icon={StarOutlined} text="666" key="list-vertical-star-o" />,
                                            <IconText icon={LikeOutlined} text="666" key="list-vertical-like-o" />,
                                            <IconText icon={MessageOutlined} text="666" key="list-vertical-message" />,
                                            <a onClick={Operate(item.id)}>删除</a>
                                        ]}
                                        extra={
                                            <div style={{
                                                width: '100%',
                                                height: "100%",
                                                maxHeight: '134px',
                                                background: '#f6f6fa',
                                                textAlign: 'center'
                                            }}>
                                                <img
                                                    alt="logo"
                                                    src={GetUrl('images/' + item.avatar_id)}
                                                    style={{
                                                        width: '100%',
                                                        maxHeight: '100%',
                                                        // objectFit: 'contain'
                                                    }}
                                                />
                                            </div>
                                        }
                                    >
                                        <Skeleton loading={loading} active avatar>
                                            <List.Item.Meta
                                                avatar={<Avatar
                                                    src={GetUrl('images/' + item.avatar_id)}
                                                    size={50}
                                                />}
                                                title={<NavLink to={item.url} rel="noreferrer">{item.name}</NavLink>}
                                                description={"Last update:" + item.update_date}
                                            />
                                            <div style={{display: "flex"}}>
                                                简介:{item.desc}
                                            </div>
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                            }
                        </Card>
                    {/*</div>*/}
            </ConfigProvider>
        </>
    )
}


