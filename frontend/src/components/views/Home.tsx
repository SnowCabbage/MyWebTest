import React, {useContext} from "react";
import {UserContext} from "../Context/AuthContext";
import { Card } from 'antd';
import {ContentHeightContext} from "../Context/ElementContext";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const {currentUser} = useContext(UserContext)
    const { Meta } = Card;

    const clickCard = (url)=>{
        const w=window.open('');
        w.location.href="http://www.baidu.com"
    }

    return (
        <>
            <div>
                <h3>
                    <Card
                        hoverable
                        style={{
                            width: '60vw',
                            maxWidth: 240,
                            margin: 'auto'
                        }}
                        cover={<img alt="example" src="https://i.pinimg.com/564x/a3/82/d9/a382d9e6dadd15df8ff262a687e7a25f.jpg" />}
                        onClick={()=>clickCard('http://baidu.com')}
                    >
                        <Meta title={currentUser===null ? "" :currentUser.user} />
                    </Card>
                </h3>
            </div>

        </>
    );
}