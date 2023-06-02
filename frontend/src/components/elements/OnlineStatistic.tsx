import React, {useContext, useState} from 'react';
import { Card, Statistic } from 'antd';
import {socket} from "../Context/UrlSource";
import {OnlineContext} from "../Context/AuthContext";

export default function OnlineStatistic(){
    const {currentOnline} = useContext(OnlineContext)

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