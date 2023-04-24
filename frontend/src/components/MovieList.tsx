// import React from "react";
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import '../static/style.css'
import {Avatar, List, Card, ConfigProvider, Switch, Skeleton, PaginationProps} from 'antd';
import cookie from 'react-cookies';
import GetUrl from "./Context/UrlSource";


export default function ListMovies()  {
    const [movies, setMovies] = useState([]);
    const [nums, setNums] = useState(0)
    const moviesHeight = useRef(null)
    const [loading, setLoading] = useState(true);
    const showTotalConfig: PaginationProps['showTotal'] = (nums) => `总共 ${nums}`;

    const onChange = (checked: boolean) => {
        setLoading(!checked);
    };

    useEffect(()=>{
        axios.get(GetUrl("movies"),{headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + cookie.load("access_token"),
                        }})
            .then(response=>{
                // setMovies(response['data']['movies'])
                console.log(response)
                setLoading(false)
                setNums(response.data['data']['num'])
                setMovies(response.data['data']['movies'])
        })
            .catch(e=>console.log('Error:', e))

        // console.log(moviesHeight.current.clientHeight)
    },[])
        // @ts-ignore
    return(
        <>
            {/*<Header index={"movies"}/>*/}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#4b5cc4',
                    },
                }}
            >
                {/*<Header index={"movies"}/>*/}
                    <div className={"contentStyle"}>
                        {/*<Switch checked={!loading} onChange={onChange} style={{ marginBottom: 16 }} />*/}
                        <Card title="名单" bordered={false} style={{
                            width: 500,
                            margin: 'auto',
                            // top: 50,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            background: '#519a73',
                            // position:"static",
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
                                                        title={<a href={item.url} target={"_blank"}
                                                                  rel="noreferrer">{item.name}</a>}
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
                                itemLayout="vertical"
                                dataSource={movies}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <Skeleton loading={loading} active avatar>
                                            <List.Item.Meta
                                                avatar={<Avatar src={'../../../../dog.jpg'}/>}
                                                title={<a href={item.url} target={"_blank"}
                                                          rel="noreferrer">{item.name}</a>}
                                                description={"Release" + item.year}
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
                    </div>
            </ConfigProvider>
        </>
    )
}


