/**
 * @Author: zhangb
 * @Date: 2019-11-14 16:43:16
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-11-14 17:47:54
 * @Description: 
 */
// import '@hysight/icon/dist/style.scss';

// components
// import Message from '@hysight/message';
// 屏蔽掉公司内的私有源组件，便于demo跑通
// import Fetch from '@hysight/fetch';

// utils
import {host} from 'app/utils/api';

import 'app/styles/reset.scss';
import 'app/styles/index.scss';

// react
import React from 'react';
import { render } from 'react-dom';

// app
import App from 'app/views/App';

// Fetch config
// Fetch().default.credentials = 'omit'; // omit
// Fetch().default.minorUrl = (url) => {

//     return url.replace(/\{version\}/g, 'v1');

// };
// Fetch().default.baseUrl = (url) => {

//     // return 'http://192.168.1.207:4024';
//     return process.env.NODE_ENV === 'development'
//         ? Fetch().use([
//             Fetch().proxy(url)('^/tsts', {
//                 target: ''
//             })
//         ], host)
//         : host;

// };
// Fetch().default.headers['Content-Type'] = 'application/json';
// Fetch().default.headers['X-Token'] = localStorage.getItem('token');
// Fetch().interceptors.response = function(response) {

//     const {status, data: {code, message}} = response;
//     switch (status) {

//     case 401:
//         // Message.error(message);
//         window.location.href = '/smartsight/login';
//         localStorage.clearItem('token');
//         break;
//     default:
//         switch (code) {

//         case '400':
//             // Message.error(message);
//             break;
//         default:

//             return response;

//         }

//     }

// };

render(
    <App />,
    document.querySelector('#App')
);

// hot replace module
if(module.hot) {

    module.hot.accept();

}
