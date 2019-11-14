/*
* @Author: zhangyujie
* @Date:   2017-05-16 10:51:28
 * @Last Modified by:   wangc
 * @Last Modified time: 2018-03-28 10:57:05
* @Email: zhangyujie3344521@163.com
* @File Path: E:\item\robotStudy\robot-study\src\utils\createReducer.js
* @File Name: createReducer.js
* @Descript: 
*/

'use strict';
export  default function (initialState, reducerMap) {

    return (state = initialState, action) => {

        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action) : state;
    
    };

}