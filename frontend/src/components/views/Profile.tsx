import React, {useContext, useEffect, useState} from "react";
import requests from "../handler/handleRequest";
import GetUrl from "../Context/UrlSource";
import cookie from 'react-cookies';
import {UserContext} from "../Context/AuthContext";

export default function Profile() {
    const {currentUser} = useContext(UserContext)
    const [userProfile, setUserProfile] = useState({})
    useEffect(()=>{
            // console.log(currentUser.user)
            requests.get(GetUrl("user"), {
                params:{
                    "user": currentUser.user
                },
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + cookie.load("access_token"),
                },
            })
                .then(response=>{
                    // console.log(response.data)
                    setUserProfile(response.data['data'])
                })
                .catch(e=>{
                    console.log("Error:", e)
                })

    },[])
    return (
        <>
            <div>
                <h3>
                    111
                    用户名：{userProfile['username']}
                </h3>
            </div>
        </>
    );
}