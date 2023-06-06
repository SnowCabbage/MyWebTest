import {Modal} from "antd";
import cookie from 'react-cookies';
import history from '../Units/routerHistory';

export default function handleTokenExpired () {

    Modal.warning({
        title: '登录已过期',
        content: '请重新登录',
        okText: '确定',
        onOk()  {
            cookie.remove("access_token", { path: '/' })
            cookie.remove("user", { path: '/' })

            //非常简陋
            // window.history.go(-1)
            history.push('/home/login')
            // navigate('/login')
            // window.location.href="/login"
            // return redirect('/login')
        }
    });
};