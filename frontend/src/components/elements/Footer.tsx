import React from "react";
import {NavLink} from "react-router-dom";
import "../../static/style.css"
import {Avatar} from "antd";

export default function Footer() {
    return (
        <>
            <div className={"footerStyle"}>
                <small style={{
                    textAlign: 'center',
                    // position: 'relative',
                    top: 80}}>
                    <div style={{color: '#758a99', display: 'inline'}}>
                        &copy; 1453 snow White
                    </div>
                    {/*<a href="https://v.qq.com/x/cover/mzc00200cgo4wcc/r00454x3b5p.html" target="_blank" rel="noreferrer">Click Me</a>*/}
                </small>
                {/*<Avatar src={"../../dog.jpg"} style={{display:"block"}} alt="A dog" size={60}/>*/}
            </div>
        </>
    );
}