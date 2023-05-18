import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import cookie from 'react-cookies';
import axios from "axios";
import GetUrl from "../Context/UrlSource";

export default function ArticleView() {
    const {currentUser} = useContext(UserContext)
    const params = useParams();
    const [loading, setLoading] = useState(true)
    const [contentInfo, setContentInfo] = useState({
        "desc": "",
        "title": "",
        "update_date": "",
        "create_by": "",
        "content": ""
    })
    // const {contentWidth} = useContext(ContentWidthContext)

    useEffect(()=>{
        axios.get(GetUrl("movies/" + params.id), {
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
    return (
        <>
            <h1>{contentInfo.title}</h1><br/>
            <p>Created by {contentInfo.create_by}</p>
            <p>{contentInfo.desc}</p>
            <br/><br/>
            <div className={'mainText'}>
                <p>{contentInfo.content}</p>
            </div>

        </>
    );
}