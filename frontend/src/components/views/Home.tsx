import React, {useContext} from "react";
import {UserContext} from "../Context/AuthContext";
import { Carousel } from 'antd';
import {ContentHeightContext} from "../Context/ElementContext";

export default function Home() {
    const {currentUser} = useContext(UserContext)
    const {contentHeight} = useContext(ContentHeightContext)
    let h = contentHeight

    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: h - 116 - 1 + 'px',
        color: '#fff',
        lineHeight: h - 116 - 1 + 'px',
        textAlign: 'center',
        background: '#364d79',
        fontSize: '32px',
    };

    return (
        <>
            <Carousel >
                <div>
                    <h3 style={contentStyle}>
                        Hello!
                        {currentUser===null ? "" :currentUser.name}
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        NM
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        S
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        L
                    </h3>
                </div>
            </Carousel>
        </>
    );
}