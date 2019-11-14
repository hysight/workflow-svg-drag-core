/**
 *@Author: hy-zhangb
 *Date: 2018/10/8 15:56
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/8 15:56
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import Message from '@hysight/message';
import {put, call, all, select, fork, takeEvery, takeLatest} from 'redux-saga/effects';
import Api from 'app/api/edit/index';

import {
    FETCH_DATA_SET_MODE_SUCCESS,
    FETCH_SQL_VALUE_SUCCESS,
    FETCH_DS_ITEM_DATA,
    FETCH_DS_ITEM_SUCCESS,
    FETCH_DIR_TREE_DATA,
    FETCH_DIR_TREE_SUCCESS,
    FETCH_DATA_SET_DATA,
    FETCH_DATA_SET_SUCCESS
} from 'app/constant/edit';

import {
    FETCH_ID_WF_CANVAS_SUCCESS
} from 'app/constant/workFlow';

// 查询某数据源基本信息与字段列表
export function * getDsItemData(action) {

    console.log('测试sages------查询');
    const {payload} = action;
    try {

        const {data} = yield call(Api.fetchDsItem, payload); // payload -> id
        yield put({
            type: FETCH_DS_ITEM_SUCCESS,
            payload: {
                [data.id]: data
            }
        });

    } catch (err) {

        console.log(err);

    }

}

// 查询文件tree列表
export function * getDirTreeData(action) {

    const {payload: {spaceId, resourceful}} = action;
    try {

        const {data} = yield call(Api.fetchDirTreeData, {
            spaceId,
            parentId: null,
            resourceful,
            dirIds: []
        });
        yield put({
            type: FETCH_DIR_TREE_SUCCESS,
            payload: data
        });

    } catch (err) {

        console.log(err);

    }

}

// 获取数据集详情信息
export function * getDataSetInfo(action) {

    console.log('测试sages------查询');
    const {payload:{spaceId, dataSetId}} = action;
    try {

        const {
            data: {relHtml, relJson, jsonSql, dataSourceBean, admin, ...dataSetProps}
        } = yield call(Api.fetchDataSetInfo, dataSetId); // payload -> id
        const {nodes, unions, connections, joins, filterRows, filterGroups, filterConnections} = JSON.parse(relHtml);
        console.log('获取数据集信息');
        console.log('获取数据集信息');
        console.log('获取数据集信息');
        // 设置基本信息
        yield put({
            type: FETCH_DATA_SET_SUCCESS,
            payload: dataSetProps
        });
        // 设置mode类型
        yield put({
            type: FETCH_DATA_SET_MODE_SUCCESS,
            payload: dataSetProps.sqlType
        });
        // 设置sql语句
        yield put({
            type: FETCH_SQL_VALUE_SUCCESS,
            payload: jsonSql
        });
        // 设置某数据源下数据表列表
        const [firstDataSource] = dataSourceBean;
        yield fork(getDsItemData, {payload: firstDataSource.id});
        // 设置文件夹tree列表
        yield fork(getDirTreeData, {payload: {spaceId, resourceful: dataSetProps.resourceful}});
        // 设置画布流程信息
        yield put({
            type: FETCH_ID_WF_CANVAS_SUCCESS,
            payload: {
                nodes,
                unions,
                connections,
                joins,
                filterRows,
                filterGroups,
                filterConnections
            }
        });

    } catch (err) {

        console.log(err);

    }

}

export function * watchFetchEdit() {

    yield takeEvery(FETCH_DS_ITEM_DATA, getDsItemData);
    yield takeEvery(FETCH_DIR_TREE_DATA, getDirTreeData);
    yield takeEvery(FETCH_DATA_SET_DATA, getDataSetInfo);

}
