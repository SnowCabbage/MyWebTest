import React, {useContext, useState} from "react";
import {UserContext} from "../Context/AuthContext";
import Header from "../Index";
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
        <div style={{width:"100%",
            // height:"100%",
            display: "flex",
            flexDirection: "column",
        }}>
            {/*<Header index={"home"}/>*/}

                <div className='main-text'>
                    <p>
                        Hello!{user}
                    </p>
                </div>

            {/*<Footer/>*/}
        </div>
    );
}