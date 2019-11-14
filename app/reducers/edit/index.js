/**
 *@Author: hy-zhangb
 *Date: 2018/10/8 16:04
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/8 16:04
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import createReducer from 'app/utils/createReducer';

import {
    // 查询某数据源基本信息与字段列表
    FETCH_DS_ITEM_SUCCESS,
    // 查询文件tree列表
    FETCH_DIR_TREE_SUCCESS,
    // 获取数据集基本信息
    FETCH_DATA_SET_SUCCESS,
    // 创建数据集模式（sql/拖拉拽）
    FETCH_DATA_SET_MODE_SUCCESS,
    // 设置sql语句
    FETCH_SQL_VALUE_SUCCESS,
    // 这是sql语句最后更新时间戳
    FETCH_SQL_LAST_TIME_SUCCESS
} from 'app/constant/edit';

export default createReducer(
    {
        mode: '',
        dataSources: null,
        dirTreeList: [],
        dataSetItem: null,
        sql: '',
        lastUpdateSqlTime: 0
    }, {
        // 创建数据集模式（sql/拖拉拽）
        [FETCH_DATA_SET_MODE_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                mode: payload
            });

        },
        // 查询某数据源基本信息与字段列表
        [FETCH_DS_ITEM_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                dataSources: payload
            });

        },
        // 查询文件tree列表
        [FETCH_DIR_TREE_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                dirTreeList: payload
            });

        },
        // 获取数据集基本信息
        [FETCH_DATA_SET_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                dataSetItem: payload
            });

        },
        // 设置sql语句
        [FETCH_SQL_VALUE_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                sql: payload
            });

        },
        // 这是sql语句最后更新时间戳
        [FETCH_SQL_LAST_TIME_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                lastUpdateSqlTime: payload
            });

        }
    }
);
