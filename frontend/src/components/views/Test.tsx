import React, {useEffect, useState} from "react";
import 'github-markdown-css';
import {Button, Input, Space} from "antd";
import {socket} from '../Context/UrlSource'


export default function Test() {

    const [currentOnline, setCurrentOnline] = useState(0)
    const onSubmit = (e)=>{
        console.log(document.getElementById("data").getAttribute('value'))
        let value = document.getElementById("data").getAttribute('value')
        socket.emit('message',{'data': value})
    }

    socket.on('connect', function() {
        socket.emit('connected', {data: 'I\'m connected!'});
    });

    socket.on('online', (data) => {
        console.log(data)
        let onlineCnt = data['online']
        setCurrentOnline(onlineCnt)
    });

    return (
        <div>
            <Space.Compact style={{ width: '100%' }}>
                <Input id={'data'} defaultValue="Combine input and button" />
                <Button type="primary" onClick={onSubmit}>Submit</Button>
                <p>
                    当前在线:{currentOnline}
                </p>
            </Space.Compact>
        </div>
    );
}