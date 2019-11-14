/**
 *@Author: hy-zhangb
 *Date: 2018/8/24 13:05
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/8/24 13:05
 *Email: lovewinders@163.com
 *File Path: data - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import {_UUID} from 'app/utils/tools';

// fetch
class Fetch {
    static defaultConfig = {
        baseUrl: '',
        headers: {
            Authorization: null,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    static createInstance = () => {

        return Array.from(arguments).length ? fetchInstance.request(...Array.from(arguments)) : fetchInstance;
        /* let context = new Fetch();
        let instance = Object.assign(
            {},
            {
                context: context
            },
            {
                default: Fetch.defaultConfig
            }
        );
        console.log(111);
        console.log(111);
        console.log(111);
        console.log(111);
        console.log(111);
        return instance.context.request;*/

    };
    constructor() {

        this.default = Fetch.defaultConfig || {};
        this.interceptors = {
            request: (config) => {

                return config;

            },
            response: (result) => {

                return result;

            }
        };

    }
    // check is formData
    isFormData = (headers) => {

        // WorkbenchContainer-Type -> null || multipart/form-data -> formData文件格式
        return !headers['Content-Type'] || !headers['Content-Type'].indexOf('multipart/form-data') < 0;

    };
    // single name || multi name file upload
    createFormData = (pars) => {

        let formData = new FormData();
        Object.entries(pars).forEach(([key, val]) => {

            formData.append(key, val);

        });
        return formData;

    };
    // set Authorization
    setHeaders = (headers) => {

        const Authorization = localStorage.getItem('token');
        // const  authorization = 'admin_8ca563d10af84754a51d49e10e2d1096';
        return Object.assign({}, {...headers}, {
            Authorization
        });

    };
    // 对象转换url拼接参数
    transformParsToUrl = (url, par) => {

        const parArr = Object.entries(par).map(([key, v]) => {

            return `${key}=${v}`;

        });
        return parArr.length ? `?${parArr.join('&')}` : '';

    };
    // 判断url是否传递过来参数
    checkUrlPars = (url) => {

        const reg = /\?/g;
        return reg.test(url);

    };
    // 拦截get请求，后缀加上请求hash，避免get缓存机制导致数据异常
    setUrlHash = (url) => (method) => { // url -> is new transform url

        return method === 'GET'
            ? `${url + (this.checkUrlPars(url) ? '&' : '?')}version=${_UUID()}`
            : url;

    };
    // 请求
    request = (url, config) => {

        return fetch(url)
            .then((res) => {

                if(res.status >= 200 && res.status < 300) {

                    return res.json();

                }
                // 401 token无效
                if(res.status === 401) {

                // window.location.href = '/main/tianjinPersonLogin.html';
                // window.location.href = 'http://' + location.hostname + ':8090/tianjin-qingbao.html';

                }
                throw new Error(url, res.statusText);

            });

    }
}

// const _fetch = Fetch.createInstance();
var fetchInstance = new Fetch();

export default Fetch.createInstance;
