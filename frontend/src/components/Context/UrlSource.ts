import {Navigate} from "react-router-dom";

export default function GetUrl(type){

    let url0 = 'http://127.0.0.1:5000/api/'
    let urlb = '/api/'

    return url0 + type
}