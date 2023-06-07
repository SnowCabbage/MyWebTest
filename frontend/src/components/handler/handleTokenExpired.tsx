import {Modal} from "antd";
import cookie from 'react-cookies';
import history from '../Units/routerHistory';

export function handleTokenExpired () {

    Modal.warning({
        title: '登录已过期',
        content: '请重新登录',
        okText: '确定',
        onOk()  {
            cookie.remove("access_token", { path: '/' })
            cookie.remove("user", { path: '/' })
            history.push('/home/login')
        }
    });
}

export function freshToken(token){
    let expiredTime = new Date(new Date().getTime() + 36 * 3600 * 1000);//2h
    cookie.remove("access_token", { path: '/' })
    cookie.save('access_token',token,{path:"/", expires: expiredTime})
}