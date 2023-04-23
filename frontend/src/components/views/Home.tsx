import React, {useContext, useState} from "react";
import {UserContext} from "../Context/AuthContext";
import Header from "../Header";
import Footer from "../Footer";

export default function Home() {


    // const contextData = useContext(UserContext)
    // const [user, setUser] = useState(contextData.currentUser)
    // console.log(contextData.currentUser)
    // setUser(contextData.user)
    // let currentUser = contextData.user
    // setUser(currentUser)
    const user = useContext(UserContext)

    return (
        <>
            {/*<Header index={"home"}/>*/}
            <Header index={"home"}/>
                <div className='contentStyle'>
                    <p>
                        Hello!{user}
                    </p>
                </div>
            <Footer/>
        </>
    );
}