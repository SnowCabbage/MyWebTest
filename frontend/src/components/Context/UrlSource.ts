import {io} from "socket.io-client";
export default function GetUrl(type){

    let url = 'http://127.0.0.1:8080/api/' // for test
    let urlb = '/api/'

    return url + type
}

const socket = io("http://127.0.0.1:8080/"); // for test
// const socket = io("http://49.234.7.132/");

export {socket}