import React, {useState} from 'react';
import { Card, Statistic } from 'antd';
import {socket} from "../Units/socketUnit";

export default function OnlineStatistic(){
    const [currentOnline, setCurrentOnline] = useState(0)


    socket.on('online', (data) => {
        console.log(data)
        let onlineCnt = data['online']
        setCurrentOnline(onlineCnt)
    });

    return(
                <Card bordered={false} style={{
                    display: "inline-flex",
                    position: "absolute",
                    right: "12vw",
                    top: "0px"
                    // height: '30px'
                }}>
                    <Statistic
                        title="当前在线"
                        value={currentOnline}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        suffix={'人'}
                    />
                </Card>

        )
}