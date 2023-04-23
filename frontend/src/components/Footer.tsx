import React from "react";
import {NavLink} from "react-router-dom";
import "../static/style.css"

export default function Footer() {
    return (
        <>
            <footer>
                {/*<p style={{textAlign: 'center',lineHeight:'30px'}}>123</p>*/}
                <small style={{textAlign: 'center',lineHeight:'1'}}>
                    <div style={{color: '#758a99', display: 'inline'}}>
                        &copy; 1453 snow White
                    </div>
                    {/*<a href="https://v.qq.com/x/cover/mzc00200cgo4wcc/r00454x3b5p.html" target="_blank" rel="noreferrer">Click Me</a>*/}
                </small>
            </footer>
        </>
    );
}