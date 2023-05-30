import { Navigate } from 'react-router-dom';
import cookie from 'react-cookies';

export default function RequireAuth({ children }){

    let authed
    authed = !!cookie.load("access_token")

    return authed === true ? (
        children
    ) : (
        //使用location.state来保留之前的位置，这样你就可以在用户认证后把他们送到那里。
        //replace: true 来替换历史栈中的/login路由，这样用户在登录后点击返回按钮时就不会返回到登录页面。
        // <Redirect to={{ pathname: '/login' }} />
        <Navigate to="/home/login" state={{ path: window.location.pathname }} />
    )
}