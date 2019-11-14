/**
 *@Author: hy-zhangb
 *Date: 2018/10/15 14:34
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/15 14:34
 *Email: lovewinders@163.com
 *File Path: smartsight - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import Message from '@hysight/message';
import { push } from 'react-router-redux';
import { put, call, all, select, takeEvery, takeLatest } from 'redux-saga/effects';
import Api from 'app/api/user/index';
import {
    // 获取用户基本信息
    FETCH_USER_INFO_DATA,
    FETCH_USER_INFO_SUCCESS
} from 'app/constant/user';

// 获取数据源列表
export function * getUserInfo(action) {

    try {

        const {data} = yield call(Api.fetchUserInfo);
        yield put({
            type: FETCH_USER_INFO_SUCCESS,
            payload: data
        });

    } catch (err) {

        console.log(err);

    }

}

export function * watchFetchUser() {

    yield takeLatest(FETCH_USER_INFO_DATA, getUserInfo);

}
