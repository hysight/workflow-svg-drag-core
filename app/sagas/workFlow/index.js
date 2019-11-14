/**
 *@Author: hy-zhangb
 *Date: 2018/10/9 11:22
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2019-03-15 14:43:38
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */

'use strict';
import Message from '@hysight/message';
import { put, call, all, select, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Api from 'app/api/workFlow/index';
import { _UUID } from 'app/utils/tools';

import {
    FETCH_NODE_ADD_DATA,
    FETCH_NODE_ADD_SUCCESS,
    FETCH_UNION_ADD_DATA,
    FETCH_NODE_DEL_DATA,
    FETCH_NODE_DEL_SUCCESS,
    FETCH_NODE_UPDATE_SUCCESS,
    FETCH_UNION_ADD_SUCCESS,
    FETCH_UNION_DEL_SUCCESS,
    FETCH_LINE_ADD_SUCCESS,
    FETCH_LINE_DEL_SUCCESS,
    FETCH_JOIN_ADD_SUCCESS,
    FETCH_JOIN_DEL_SUCCESS,
    IS_WF_PREVIEW_SUCCESS,
    FETCH_ID_WF_CANVAS_SUCCESS,
    FETCH_SAVE_WF_API_DATA,
    FETCH_EDIT_WF_API_DATA,
    FETCH_ID_UPDATE_WF_API_DATA,
    IS_LOADING_PREVIEW_SUCCESS,
    IS_SAVE_WF_SUCCESS,
    IS_EDIT_WF_SUCCESS,
    FETCH_RUN_WF_DATA,
    FETCH_RUN_WF_SUCCESS,
    FETCH_WF_PREVIEW_LAST_TIME
} from 'app/constant/workFlow';

import { FETCH_DATA_SET_SUCCESS } from 'app/constant/edit';

// utils
import { getTableColumnKey } from 'app/containers/Edit/EditDataModel/EditDataAxis/DataAxisTree/utils';
import { isDataFilterSuccess } from 'app/containers/Edit/EditPanel/BtnDataFilter/utils';
import { isWFValidateSuccess } from 'app/components/WorkFlow/utils';
import { getNodeAfterAllInfo, getNodeRepeatTimes, getWorkFlowPreviewData, getWorkFlowPreviewData2 } from './utils';

// 节点类-新增
export function * insertNode(action) {

    const {
        payload: {
            sourceId,
            targetNode: { id: targetId, ...targetProps }
        }
    } = action;
    // 获取sourceId的基本数据
    const { nodes } = yield select(state => state.workFlow);

    // 获取sourceId中的位置
    const { [sourceId]: sourceNode } = nodes;
    console.log('sourceId', sourceId, { targetId, ...targetProps });
    // 新增线条id
    const lineId = _UUID();
    // 新增合表条件id
    const joinId = _UUID();
    // 新增节点索引
    const insertIndex = getNodeRepeatTimes(nodes, targetProps.name);
    yield all([
        // 新增节点
        put({
            type: FETCH_NODE_ADD_SUCCESS,
            payload: {
                [targetId]: Object.assign(
                    {},
                    {
                        id: targetId,
                        ...targetProps
                    },
                    {
                        lines: {
                            in: [lineId],
                            out: []
                        },
                        unions: []
                    },
                    {
                        name: `${targetProps.name}${insertIndex ? `_${insertIndex}` : ''}`
                    }
                )
            }
        }),
        // 新增线条
        put({
            type: FETCH_LINE_ADD_SUCCESS,
            payload: {
                [lineId]: {
                    sourceId,
                    targetId,
                    joinId: joinId
                }
            }
        }),
        // 新增线条上的合表条件
        put({
            type: FETCH_JOIN_ADD_SUCCESS,
            payload: {
                [joinId]: {
                    id: joinId,
                    linesId: lineId,
                    type: 'inner-join',
                    columnsConnections: [],
                    joinCols: []
                }
            }
        }),
        // 修改线条起始端节点信息
        put({
            type: FETCH_NODE_UPDATE_SUCCESS,
            payload: {
                [sourceId]: Object.assign(
                    {},
                    { ...sourceNode },
                    {
                        lines: Object.assign(
                            {},
                            { ...sourceNode.lines },
                            {
                                // out: [lineId]
                                out: [...sourceNode.lines.out, lineId]
                            }
                        )
                    }
                )
            }
        })
    ]);

}

// Union类-新增
export function * insertUnion(action) {

    const {
        payload: {
            sourceId,
            targetNode: { id: targetId, ...targetProps }
        }
    } = action;
    // 获取sourceId的基本数据
    const {
        nodes: { [sourceId]: sourceNode }
    } = yield select(state => state.workFlow);

    console.log('sourceId', sourceId, sourceNode);
    console.log(1);
    console.log(1);
    console.log(1);
    console.log(1);
    console.log(1);
    yield all([
        // 修改节点Union
        put({
            type: FETCH_NODE_UPDATE_SUCCESS,
            payload: {
                [sourceId]: Object.assign(
                    {},
                    { ...sourceNode },
                    {
                        unions: sourceNode.unions ? [...sourceNode.unions, targetId] : []
                        // union: [targetId]
                    }
                )
            }
        }),
        // 新增节点
        put({
            type: FETCH_UNION_ADD_SUCCESS,
            payload: {
                [targetId]: Object.assign(
                    {},
                    {
                        id: targetId,
                        ...targetProps
                    }
                    // {
                    // lines: {
                    //     in: [],
                    //     out: []
                    // },
                    // unions: []
                    // }
                )
            }
        })
    ]);

}

// 节点类-删除(附带删除节点上线条)
export function * deleteNode(action) {

    const { payload: id } = action;
    // 获取节点以及线
    const { nodes, connections } = yield select(state => state.workFlow);
    // 递归删除下面的节点以及线条
    const lp = getNodeAfterAllInfo(true, true, true, true); // node | union | line | join 开启4项数据
    const { nodes: _nodes, unions: _unions, lines: _lines, joins: _joins } = lp(nodes, connections, id);
    console.log('============', {
        _nodes,
        _unions,
        _lines,
        _joins
    });
    // const a = nodes[id].lines.in.length;
    // const sourceId = connections[nodes[id].lines.in].sourceId;
    const {
        lines: { in: ins }
    } = nodes[id];
    // const ab = ins.map(v => nodes[connections[v].sourceId]);
    const _sourceNode = ins.reduce((pre, lineId) => {

        const node = nodes[connections[lineId].sourceId];
        const {
            id,
            lines: { in: ins, out }
        } = node;
        let _out = [...out];
        _out.splice(_out.indexOf(lineId), 1);
        return Object.assign(
            {},
            { ...pre },
            {
                [id]: Object.assign(
                    {},
                    { ...node },
                    {
                        lines: {
                            in: ins,
                            out: _out
                        }
                    }
                )
            }
        );

    }, {});
    console.log('3333333333', _sourceNode);
    yield all([
        // 删除节点
        put({
            type: FETCH_NODE_DEL_SUCCESS,
            payload: _nodes
        }),
        // Union类-删除
        put({
            type: FETCH_UNION_DEL_SUCCESS,
            payload: _unions
        }),
        // 修改线条起始端节点信息
        put({
            type: FETCH_NODE_UPDATE_SUCCESS,
            payload: _sourceNode
        }),
        // 删除线
        put({
            type: FETCH_LINE_DEL_SUCCESS,
            payload: _lines
        }),
        // 删除合表条件
        put({
            type: FETCH_JOIN_DEL_SUCCESS,
            payload: _joins
        })
    ]);

}

// 执行获取json结构
export function * getWorkFlowApi() {

    // 获取数据源基本数据
    const { dataSources } = yield select(state => state.edit);
    // 获取节点以及线
    const { nodes, connections, joins, filterRows, filterGroups, filterConnections } = yield select(
        state => state.workFlow
    );
    const data = getWorkFlowPreviewData(nodes, connections, joins);
    const operators = getWorkFlowPreviewData2(filterRows, filterGroups, filterConnections, nodes, dataSources);
    return {
        data,
        operators
    };

}

// 获取数据模型中tree结构JSON结构
export function * getWorkFlowTreeApi() {

    const { dataSources } = yield select(state => state.edit);
    const { nodes } = yield select(state => state.workFlow);

    const columns = nodes
        ? Object.values(nodes).reduce((pre, node) => {

            const { dataSourceId, tableName, name, tableColumnKeys } = node;
            const {
                [dataSourceId]: { tableVo }
            } = dataSources;
            const [{ tableColumnVos }] = tableVo.filter(v => v.tableName === tableName);

            return pre.concat(
                tableColumnVos.map(column => {

                    const { columnName, dataType, dataSourceEnum } = column;
                    const { aliasColumnName, axis, isVisible } = getTableColumnKey(tableColumnKeys, column);
                    // 文件类型/基本类型数据源name与columnName传递参数正好相反
                    return {
                        name: aliasColumnName,
                        columnName,
                        dataType,
                        tableName,
                        tableAliasName: dataSourceEnum === 'FILE' ? tableName : name,
                        selectedType: isVisible ? 'SELECTED' : 'UNSELECTED',
                        type: 'NORMAL',
                        latitude: axis
                    };

                })
            );

        }, [])
        : [];
    return {
        columns
    };

}

// 获取sql型columns数据
export function * getWorkFlowColumnsApi() {

    const { wfPreviewData } = yield select(state => state.workFlow);
    const columns = wfPreviewData
        ? wfPreviewData.tableColumns.map(({ tableName, columnName, comments, dataType, _AxisType }) => {

            return {
                name: columnName,
                columnName,
                dataType,
                tableName: tableName,
                tableAliasName: tableName,
                selectedType: 'SELECTED',
                type: 'NORMAL',
                latitude: _AxisType
            };

        })
        : [];
    return {
        columns
    };

}

// 执行运行类-运行流程 runWorkFlow
export function * runWorkFlow(action) {

    const { mode, sql, dataSources } = yield select(state => state.edit);
    const { nodes, connections, joins, filterRows } = yield select(state => state.workFlow);
    // 拖拽模式
    if(mode === 'PULL') {

        // 拖拽区验证
        const isWFSuccess = isWFValidateSuccess(dataSources, nodes, connections, joins);
        // 数据筛选器区验证
        const isDFSuccess = isDataFilterSuccess(dataSources, nodes, filterRows);
        // 校验
        if(!nodes || !Object.values(nodes).length) {

            Message.error('请先拖拽左侧数据表，再去数据预览');
            return;

        }
        // 校验
        if(!isDFSuccess || !isWFSuccess) {

            Message.error('请先处理警告，才能数据预览');
            return;

        }

    } else {

        // 校验sql
        if(!sql) {

            Message.error('请先填写sql语句，再去数据预览');
            return;

        }

    }
    // 切换到预览模块
    yield put({
        type: IS_WF_PREVIEW_SUCCESS,
        payload: true
    });
    const workFlowData = yield call(getWorkFlowApi);
    const workFlowTreeData = yield call(getWorkFlowTreeApi);
    // console.log('-=-=-=>>', workFlowData);
    // 测试
    try {

        yield put({
            type: IS_LOADING_PREVIEW_SUCCESS,
            payload: true
        });
        const baseData = {
            dataSourceIds: Object.keys(dataSources)
        };
        const totalData =
            mode === 'SQL'
                ? Object.assign(
                    {},
                    {
                        ...baseData
                    },
                    {
                        sql: sql
                    }
                )
                : Object.assign(
                    {},
                    {
                        ...baseData
                    },
                    {
                        ...workFlowData
                    },
                    {
                        ...workFlowTreeData
                    }
                );

        const { data } = yield call(Api.fetchGetWfDataPreview, mode.toLowerCase(), totalData);
        yield all([
            put({
                type: FETCH_RUN_WF_SUCCESS,
                payload: Object.assign(
                    {},
                    { ...data },
                    {
                        tableColumns: data.tableColumns.map(v =>
                            Object.assign(
                                {},
                                { ...v },
                                {
                                    _AxisType: ['INT', 'FLOAT', 'DOUBLE', 'NUMBER', 'LONG'].includes(v.dataType) ? 'Y' : 'X'
                                }
                            )
                        )
                    }
                )
            }),
            put({
                type: IS_LOADING_PREVIEW_SUCCESS,
                payload: false
            }),
            put({
                type: FETCH_WF_PREVIEW_LAST_TIME,
                payload: new Date().getTime()
            })
        ]);
        Message.success('数据预览成功');

    } catch (err) {

        Message.error('数据预览失败');
        // 清空上一次数据
        yield all([
            put({
                type: FETCH_RUN_WF_SUCCESS,
                payload: null
            }),
            put({
                type: IS_LOADING_PREVIEW_SUCCESS,
                payload: false
            })
        ]);

    }

}

// 获取流程画布信息
export function * getWorkFlowCanvas(action) {

    const { payload: dataSetId } = action;
    try {

        const {
            result: { config, ...props }
        } = yield call(Api.fetchGetWfCanvas, dataSetId);
        const payload = JSON.parse(config);
        if(payload) {

            yield put({
                type: FETCH_ID_WF_CANVAS_SUCCESS,
                payload
            });
            // 设置数据集基本信息
            yield put({
                type: FETCH_DATA_SET_SUCCESS,
                payload: props
            });
            console.log('-=-获取流程画布信息=-=>>', props);

        }

    } catch (err) {

        console.log(err);

    }

}

// 保存流程后台信息-（第一次新增）
export function * saveWorkFlowApi(action) {

    const {
        payload: { spaceId, ...otherProps }
    } = action;
    // const workFlowBaseData = yield call(getWorkFlowApi);
    // const workFlowTreeData = yield call(getWorkFlowTreeApi);
    // 获取节点以及线
    const {
        nodes,
        unions,
        connections,
        joins,
        filterRows,
        filterGroups,
        filterConnections,
        lastWfPreviewTime
    } = yield select(state => state.workFlow);
    const { mode, sql, lastUpdateSqlTime, dataSources } = yield select(state => state.edit);
    if(mode === 'SQL' && lastWfPreviewTime && lastUpdateSqlTime && lastUpdateSqlTime > lastWfPreviewTime) {

        Message.error('sql模式时，必须先预览数据！');
        return;

    }
    const workFlowBaseData = yield call(getWorkFlowApi);
    const workFlowTreeData = mode === 'SQL' ? yield call(getWorkFlowColumnsApi) : yield call(getWorkFlowTreeApi);
    console.log('sldfjlkajflkjaf', workFlowBaseData, workFlowTreeData);
    const workFlowData = Object.assign(
        {},
        { ...otherProps },
        { ...workFlowTreeData },
        {
            dataSourceIds: Object.keys(dataSources),
            jsonSql: workFlowBaseData,
            relHtml: JSON.stringify({
                nodes,
                unions,
                connections,
                joins,
                filterRows,
                filterGroups,
                filterConnections
            }),
            sqlType: mode,
            strategyType: 'BASIC',
            sql: sql,
            // WYX20190306添加空间id
            spaceId: spaceId
        }
    );
    console.log('保存数据', workFlowData);
    try {

        const {
            data: { relHtml, relJson, jsonSql, dataSourceBean, admin, ...dataSetProps }
        } = yield call(Api.fetchSaveWfApi, workFlowData);
        yield put({
            type: IS_SAVE_WF_SUCCESS,
            payload: false
        });
        // 更新数据集基本信息
        yield put({
            type: FETCH_DATA_SET_SUCCESS,
            payload: dataSetProps
        });
        // 获取数据集信息
        // yield put({
        //     type: FETCH_ID_WF_CANVAS_DATA,
        //     payload: dataSetId
        // });
        // yield fork(put({
        //     type: FETCH_ID_WF_CANVAS_DATA,
        //     payload: dataSetId
        // }));
        yield put(push(`/edit/${spaceId}/${dataSetProps.id}`));
        Message.success('创建成功');

    } catch (err) {

        console.log(err);

    }

}

// 编辑流程基本信息
export function * editWorkFlowApi(action) {

    const { payload } = action;
    console.log(payload, '<0000000');
    const {
        dataSetItem: { id: dataSetId }
    } = yield select(state => state.edit);
    const workFlowData = Object.assign({}, { ...payload });
    try {

        const {
            data: { relHtml, relJson, jsonSql, dataSourceBean, admin, ...dataSetProps }
        } = yield call(Api.fetchEditWfApi, dataSetId, workFlowData);
        yield put({
            type: IS_EDIT_WF_SUCCESS,
            payload: false
        });
        // 更新数据集基本信息
        yield put({
            type: FETCH_DATA_SET_SUCCESS,
            payload: dataSetProps
        });
        Message.success('修改基本信息成功');

    } catch (err) {

        console.log(err);

    }

}

// 数据集流程更新保存动作
export function * updateIdWorkFlowApi(action) {

    const {
        payload: { dataSetId, spaceId }
    } = action;

    // 获取节点以及线
    const { nodes, unions, connections, joins, filterRows, filterGroups, filterConnections } = yield select(
        state => state.workFlow
    );
    const {
        sql,
        mode,
        dataSources,
        dataSetItem: { name, directory, sqlType, description, strategyLabels, strategyType }
    } = yield select(state => state.edit);
    // 拖拽模式
    if(mode === 'PULL') {

        // 拖拽区验证
        const isWFSuccess = isWFValidateSuccess(dataSources, nodes, connections, joins);
        // 数据筛选器区验证
        const isDFSuccess = isDataFilterSuccess(dataSources, nodes, filterRows);
        if(!isDFSuccess || !isWFSuccess) {

            Message.error('请先处理警告，才能保存');
            return;

        }

    }
    const workFlowBaseData = yield call(getWorkFlowApi);
    const workFlowTreeData = sqlType === 'SQL' ? yield call(getWorkFlowColumnsApi) : yield call(getWorkFlowTreeApi);
    console.log('sldfjlkajflkjaf', workFlowBaseData, workFlowTreeData);
    const workFlowData = Object.assign(
        {},
        { ...workFlowTreeData },
        {
            dataSourceIds: Object.keys(dataSources),
            jsonSql: workFlowBaseData,
            relHtml: JSON.stringify({
                nodes,
                unions,
                connections,
                joins,
                filterRows,
                filterGroups,
                filterConnections
            }),
            name,
            sqlType,
            description,
            strategyType,
            directoryId: directory.id,
            labels: strategyLabels.map(v => v.name),
            sql: sql,
            // WYX20190315添加空间id
            spaceId
        }
    );
    console.log('更新保存数据', workFlowData);
    try {

        // 执行保存画面
        const { data } = yield call(Api.fetchIdUpdateWfApi, dataSetId, workFlowData);
        Message.success('保存成功');
        console.log('-=-result=-=>>', data);

    } catch (err) {

        console.log(err);

    }

}

export function * watchFetchWorkFlow() {

    yield takeEvery(FETCH_NODE_ADD_DATA, insertNode);
    yield takeEvery(FETCH_UNION_ADD_DATA, insertUnion);
    yield takeEvery(FETCH_NODE_DEL_DATA, deleteNode);
    yield takeEvery(FETCH_RUN_WF_DATA, runWorkFlow);
    yield takeEvery(FETCH_SAVE_WF_API_DATA, saveWorkFlowApi);
    yield takeEvery(FETCH_EDIT_WF_API_DATA, editWorkFlowApi);
    yield takeEvery(FETCH_ID_UPDATE_WF_API_DATA, updateIdWorkFlowApi);

}
