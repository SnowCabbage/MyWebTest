import React from "react";
import {useNavigate} from "react-router-dom";



export default function BackIcon({path}){
    const navigate = useNavigate();

    const back = (path)=>{
        navigate(path)
    }
    return (
        <div style={{
            background: '#ecf2ff',
            borderRadius: 50
        }}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 width="32"
                 height="32"
                 onClick={()=>back(path)}
                 cursor='pointer' //鼠标放上去变成小手
                 style={{
                     display: 'block'
                 }}
            >
                <path
                    d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
                    fill="rgba(85,85,255,1)"
                >
                </path>
            </svg>
        </div>
    )
}