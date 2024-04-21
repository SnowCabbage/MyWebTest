import React, {useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import '../../styleCss/unitsStyle.css'
import {Avatar, Dropdown, type MenuProps} from "antd";
import GetUrl from "../Context/UrlSource";
import {
    PoweroffOutlined,
    UserOutlined,
    HomeOutlined,
    BarsOutlined,
    PlusOutlined, SmileOutlined, DownOutlined, SettingFilled
} from '@ant-design/icons';
import requests from "../handler/handleRequest";

const settingItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <NavLink to="/user/profile">
                个人信息
            </NavLink>
        ),
        icon: <SmileOutlined />
    },
    {
        key: '2',
        label: (
            <NavLink to="/setting">
                设置
            </NavLink>
        ),
        icon: <SettingFilled />,
    },
    {
        key: '3',
        danger: true,
        label: (
            <NavLink to="/logout">
                退出当前账号
            </NavLink>
        ),
        icon: <PoweroffOutlined/>
    },
];

interface AvatarPara{
    avatar_id: any;
    style?: any;
}

export default function UserAvatar({avatar_id, style={}}:AvatarPara){
        // console.log(Auth)
        return (
            <Dropdown menu={{ items:settingItems }}>
                <Avatar src={GetUrl("images/" + avatar_id)} alt="头像" size={60}
                        style={style}
                />
            </Dropdown>
        )
}