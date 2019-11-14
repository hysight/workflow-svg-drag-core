/*
* @Author: zhangyujie
* @Date:   2017-05-16 16:15:54
 * @Last Modified by:   wangc
 * @Last Modified time: 2018-03-28 10:57:04
* @Email: zhangyujie3344521@163.com
* @File Path: E:\item\robotStudy\robot-study\src\utils\fetch.js
* @File Name: fetch.js
* @Descript: 
*/

'use strict';

/**
 * 验证用户权限、需要根据项目自定义写
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function checkHttpStatus(response) {


    if (response.status >= 200 && response.status < 300) {

        return response;
    
    }

}

export function parseJSON(response) {

    return response.json();

}
export function authorization(response) {

    return response;

}

export function fetchProtect(url, param) {

    const  token = localStorage.getItem('token');
    !param && (param = {});
    !param.headers && (param.headers = {});
    param.headers = Object.assign(param.headers, {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    return  fetch(url, param)
        .then(checkHttpStatus, () => {

            console.log('验证出现问题');
        
        })
        .then(parseJSON)
        .then(authorization)
        .catch((error) => {

            console.info('%c后台数据返回失败: ' + error, 'background-color: #000; color: red; padding: 5px;');
        
        });

}

