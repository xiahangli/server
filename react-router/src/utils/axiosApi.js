import axios from 'axios';
import 'es6-promise';
import qs from 'qs';

let baseURL = '';

const successCode = 200;
function axiosRequest(method, url, params, type){
    switch (method) {
        case 'get':
            return new Promise((resolve, reject)=>{
                axios({
                    url: baseURL + url,
                    method: 'get',
                    params: {
                        ...params,
                        t: new Date().getTime()
                    },
                    withCredentials: true,
                    timeout: 10000,
                    headers: {'x-requested-with': 'XMLHttpRequest'}
                }).then((json)=>{
                    if (json.status === successCode) {
                        resolve(json.data);
                    } else {
                        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': json.data.message}]); 
                    }
                }).catch((error) => {
                    if (error.message.includes('timeout')) {
                        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '请求超时'}]);
                    } 
                });
            });
            break;
        case 'post':
            return new Promise((resolve, reject)=>{
                axios({
                    url: baseURL + url,
                    method: 'post',
                    data: type === 'form' ? qs.stringify(params) : params,
                    withCredentials: true,
                    headers: {'x-requested-with': 'XMLHttpRequest'}
                }).then((json)=>{
                    if (json.status === successCode) {
                        resolve(json.data);
                    } else {
                        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': json.data.message}]); 
                    }
                    // json.status === successCode && 
                }).catch((error) => {
                    if (error.message.includes('timeout')) {
                        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '请求超时'}]);
                    }
                });
            });
            break;
        default:
            return "";
            break;
    }
}


export default axiosRequest;