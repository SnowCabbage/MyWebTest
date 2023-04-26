import {Navigate} from "react-router-dom";

export default function GetUrl(type){

    let url0 = 'http://127.0.0.1:5000/api/'
    let url = 'http://lee666.sv1.k9s.run:2271/api/'
    let urlb = '/api/'

    return urlb + type
}