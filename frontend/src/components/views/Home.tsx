import React, {useContext, useEffect} from "react";
import {UserContext} from "../Context/AuthContext";
import { Card } from 'antd';
import {HomeCoverContext} from "../Context/ElementContext";
import GetUrl from "../Context/UrlSource";
import requests from "../handler/handleRequest";

export default function Home() {
    const {currentUser} = useContext(UserContext)
    const {currentHomeCover} = useContext(HomeCoverContext)
    const {setCurrentHomeCover} = useContext(HomeCoverContext)
    const { Meta } = Card;

    const clickCard = (url)=>{
        const w=window.open('');
        w.location.href="http://www.baidu.com"
    }

    useEffect(()=>{
        requests.get(GetUrl("home_cover"), {
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(response=>{
                setCurrentHomeCover(response.data['covers']['cover'])
            })
            .catch(e=>{
                console.log("Error:", e)
            })
    },[])

    return (
        <>
            <div style={{display: "flex"}}>
                <Card
                    hoverable
                    style={{
                        width: '60vw',
                        maxWidth: 240,
                        margin: 'auto'
                    }}
                    cover={<img alt={currentHomeCover[0].cover_name} src={GetUrl("images/" + currentHomeCover[0].cover_id)} />}
                    onClick={()=>clickCard('http://baidu.com')}
                >
                    <Meta title={currentHomeCover[0].cover_name} />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: '60vw',
                        maxWidth: 240,
                        margin: 'auto'
                    }}
                    cover={<img alt={currentHomeCover[1].cover_name} src={GetUrl("images/" + currentHomeCover[1].cover_id)} />}
                    onClick={()=>clickCard('http://baidu.com')}
                >
                    <Meta title={currentHomeCover[1].cover_name} />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: '60vw',
                        maxWidth: 240,
                        margin: 'auto'
                    }}
                    cover={<img alt={currentHomeCover[2].cover_name} src={GetUrl("images/" + currentHomeCover[2].cover_id)} />}
                    onClick={()=>clickCard('http://baidu.com')}
                >
                    <Meta title={currentHomeCover[2].cover_name} />
                </Card>
            </div>

        </>
    );
}