import {Modal} from "antd";
import { redirect } from "react-router-dom";
import cookie from 'react-cookies';

export default function handleTokenExpired () {
    // const navigate = useNavigate()

    Modal.warning({
        title: '登录已过期',
        content: '请重新登录',
        okText: '确定',
        onOk()  {
            cookie.remove("access_token", { path: '/' })
            cookie.remove("user", { path: '/' })

            //非常简陋
            window.history.go(-1)
            // window.location.href="/login"
            // return redirect('/login')
        }
    });
};