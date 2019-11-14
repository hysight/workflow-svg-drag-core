/**
 *@Author: hy-zhangb
 *Date: 2018/10/15 14:37
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2018-12-06 17:13:56
 *Email: lovewinders@163.com
 *File Path: smartsight - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import createReducer from 'app/utils/createReducer';

import {
    // 获取用户基本信息
    FETCH_USER_INFO_SUCCESS
} from 'app/constant/user';

export default createReducer(
    {
        userInfo: {}
    },
    {
        [FETCH_USER_INFO_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                userInfo: payload
            });

        }

    }

);
