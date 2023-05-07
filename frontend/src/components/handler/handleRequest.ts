import axios from 'axios';
//创建一个axios实例
const requests = axios.create({
    timeout: 5 * 1000, //请求超时时间（5秒后还未接收到数据，就需要再次发送请求）
    retry: 1, //设置全局重试请求次数（最多重试几次请求）
    retryDelay: 500, //设置全局请求间隔
});

//响应拦截器
requests.interceptors.response.use((res) => {
    return Promise.resolve(res.data);
}, (error) => {
    //console.log(error);
    //超时处理 error.config是一个对象，包含上方create中设置的三个参数
    let config = error.config;
    if (!config || !config.retry) return Promise.reject(error);

    //如果有返回值直接返回错误信息
    if('response' in error){
        return Promise.reject({type: "error", msg: error.response.data});
    }

    // __retryCount用来记录当前是第几次发送请求
    config.__retryCount = config.__retryCount || 0;

    // 如果当前发送的请求大于等于设置好的请求次数时，不再发送请求，返回最终的错误信息
    if (config.__retryCount >= config.retry) {
        if (error.message === "Network Error") {
            //message为"Network Error"代表断网了
            return Promise.reject({type: "warning",msg: "连接错误"});
        } else if (error.message === "timeout of 5000ms exceeded") {
            //网太慢了，5秒内没有接收到数据，这里的5000ms对应上方timeout设置的值
            return Promise.reject({type: "warning",msg: "请求超时"});
        } else {
            //除以上两种以外的所有错误，包括接口报错 400 500 之类的
            return Promise.reject({type: "error",msg: "出现错误，请稍后再试"});

        }
    }
    // 记录请求次数+1
    config.__retryCount += 1;

    // 设置请求间隔 在发送下一次请求之前停留一段时间，时间为上方设置好的请求间隔时间
    let backoff = new Promise<void>(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    // 再次发送请求
    return backoff.then(function () {
        return requests(config);
    });
})

export default requests;
