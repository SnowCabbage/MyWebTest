import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Context/AuthContext";
import cookie from 'react-cookies';

export default function Home() {
    const {currentUser} = useContext(UserContext)
    const {setCurrentUser} = useContext(UserContext)
    const user = cookie.load("user")
    //TODO:Having Questions
    // useEffect(()=>{
    //     setCurrentUser({name: user})
    // })

    return (
        <>
                <div className='contentStyle'>
                    <p>
                        Hello!
                        {currentUser===null ? "" :currentUser.name}
                    </p>
                </div>
        </>
    );
}