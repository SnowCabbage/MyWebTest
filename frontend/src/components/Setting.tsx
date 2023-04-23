import {Avatar, Menu} from "antd";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Setting() {
    return (
        <>
            <Header index="setting"/>
                {/*<Header index={"setting"}/>*/}
                <div className={"contentStyle"}>
                    <p>this is setting</p>
                </div>
            <Footer/>
        </>
    );
}