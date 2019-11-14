/**
 *@Author: hy-zhangb
 *Date: 2018/10/9 11:21
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/9 11:21
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import createReducer from 'app/utils/createReducer';

import {
    // 清空画布信息（包含节点/Union/线/合并条件/筛选器行/列/关系/基本预览数据）
    FETCH_WORK_FLOW_CLEAR_SUCCESS,
    // 节点类-新增
    FETCH_NODE_ADD_SUCCESS,
    // 节点类-删除
    FETCH_NODE_DEL_SUCCESS,
    // 节点类-修改
    FETCH_NODE_UPDATE_SUCCESS,
    // Union类-新增
    FETCH_UNION_ADD_SUCCESS,
    // Union类-删除
    FETCH_UNION_DEL_SUCCESS,
    // 线条类-新增
    FETCH_LINE_ADD_SUCCESS,
    // 线条类-删除
    FETCH_LINE_DEL_SUCCESS,
    // 合并条件-新增
    FETCH_JOIN_ADD_SUCCESS,
    // 合并条件-删除
    FETCH_JOIN_DEL_SUCCESS,
    // 合表条件-修改
    FETCH_JOIN_UPDATE_SUCCESS,
    // 是否保存流程弹框
    IS_SAVE_WF_SUCCESS,
    // 是否编辑流程弹框
    IS_EDIT_WF_SUCCESS,
    // 获取流程画布信息
    FETCH_ID_WF_CANVAS_SUCCESS,
    /* ------------数据筛选器类------------*/
    // 筛选器-行-新增
    FETCH_FILTER_ROW_ADD_SUCCESS,
    // 筛选器-行-删除
    FETCH_FILTER_ROW_DEL_SUCCESS,
    // 筛选器-行-修改
    FETCH_FILTER_ROW_UPD_SUCCESS,
    // 筛选器-组-新增
    FETCH_FILTER_GROUP_ADD_SUCCESS,
    // 筛选器-组-删除
    FETCH_FILTER_GROUP_DEL_SUCCESS,
    // 筛选器-组-修改
    FETCH_FILTER_GROUP_UPD_SUCCESS,
    // 筛选器-关系-新增
    FETCH_FILTER_LINE_ADD_SUCCESS,
    // 筛选器-关系-删除
    FETCH_FILTER_LINE_DEL_SUCCESS,
    // 筛选器-关系-修改
    FETCH_FILTER_LINE_UPD_SUCCESS,
    /* ------------执行运行类------------*/
    // 是否切换到数据预览/tree模型
    IS_WF_PREVIEW_SUCCESS,
    // 是否正在请求数据预览接口
    IS_LOADING_PREVIEW_SUCCESS,
    // 数据预览
    FETCH_RUN_WF_SUCCESS,
    // 数据预览最后更新时间戳
    FETCH_WF_PREVIEW_LAST_TIME
} from 'app/constant/workFlow';

export default createReducer(
    {
        initNodeWidth: 200,
        initNodeHeight: 45,
        initConnectWidth: 200,
        nodes: null,
        unions: null,
        connections: null,
        joins: null,
        isSaveWfStatus: false,
        isEditWfStatus: false,
        /* ------------数据筛选器类------------*/
        filterRows: null,
        filterGroups: null,
        filterConnections: null,
        /* ----------------运行流程-数据预览----------------*/
        isWfPreviewStatus: false,
        // 是否正在请求数据预览接口
        isLoadingPreStatus: false,
        wfPreviewData: null,
        lastWfPreviewTime: 0
    }, {
        // 清空画布信息（包含节点/Union/线/合并条件/筛选器行/列/关系/基本预览数据）
        [FETCH_WORK_FLOW_CLEAR_SUCCESS]: (state, action) => {

            return Object.assign({}, {...state}, {
                nodes: null,
                unions: null,
                connections: null,
                joins: null,
                filterRows: null,
                filterGroups: null,
                filterConnections: null,
                wfPreviewData: null
            });

        },
        // 节点类-新增
        [FETCH_NODE_ADD_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                nodes: Object.assign({}, {...state.nodes}, {...payload})
            });

        },
        // 节点类-删除
        [FETCH_NODE_DEL_SUCCESS]: (state, action) => {

            const {payload} = action;
            // accept id -> string || array
            const delObjKey = (id, nodes) => {

                if(Array.isArray(id)) {

                    id.map(key => delete nodes[key]);

                } else {

                    delete nodes[id];

                }
                return nodes;

            };
            const nodes = delObjKey(payload, {...state.nodes});
            return Object.assign({}, {...state}, {
                nodes
            });

        },
        // 节点类-修改
        [FETCH_NODE_UPDATE_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                nodes: Object.assign({}, {...state.nodes}, {...payload})
            });

        },
        // Union类-新增
        [FETCH_UNION_ADD_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                unions: Object.assign({}, {...state.unions}, {...payload})
            });

        },
        // Union类-删除
        [FETCH_UNION_DEL_SUCCESS]: (state, action) => {

            const {payload} = action;
            // accept id -> string || array
            const delObjKey = (id, unions) => {

                if(Array.isArray(id)) {

                    id.map(key => delete unions[key]);

                } else {

                    delete unions[id];

                }
                return unions;

            };
            const unions = delObjKey(payload, {...state.unions});
            return Object.assign({}, {...state}, {
                unions
            });

        },
        // 线条类-新增
        [FETCH_LINE_ADD_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                connections: Object.assign({}, {...state.connections}, {...payload})
            });

        },
        // 线条类-删除
        [FETCH_LINE_DEL_SUCCESS]: (state, action) => {

            const {payload} = action;
            // accept id -> string || array
            const delObjKey = (id, connections) => {

                if(Array.isArray(id)) {

                    id.map(key => delete connections[key]);

                } else {

                    delete connections[id];

                }
                return connections;

            };
            const connections = delObjKey(payload, {...state.connections});
            return Object.assign({}, {...state}, {
                connections
            });

        },
        // 合并条件-新增
        [FETCH_JOIN_ADD_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                joins: Object.assign({}, {...state.joins}, {...payload})
            });

        },
        // 合并条件-删除
        [FETCH_JOIN_DEL_SUCCESS]: (state, action) => {

            const {payload} = action;
            // accept id -> string || array
            const delObjKey = (id, joins) => {

                if(Array.isArray(id)) {

                    id.map(key => delete joins[key]);

                } else {

                    delete joins[id];

                }
                return joins;

            };
            const joins = delObjKey(payload, {...state.joins});
            return Object.assign({}, {...state}, {
                joins
            });

        },
        // 合表条件-修改
        [FETCH_JOIN_UPDATE_SUCCESS]: (state, action) => {

            const {payload: {id, ...joinProps}} = action;
            return Object.assign({}, {...state}, {
                joins: Object.assign({}, {...state.joins}, {
                    [id]: Object.assign({}, {...state.joins[id]}, {...joinProps})
                })
            });

        },
        // 是否保存流程弹框
        [IS_SAVE_WF_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                isSaveWfStatus: payload
            });

        },
        // 是否编辑流程弹框
        [IS_EDIT_WF_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                isEditWfStatus: payload
            });

        },
        // 获取流程画布信息
        [FETCH_ID_WF_CANVAS_SUCCESS]: (state, action) => {

            const {
                payload: {
                    nodes,
                    unions,
                    connections,
                    joins,
                    filterRows,
                    filterGroups,
                    filterConnections
                }
            } = action;
            return Object.assign({}, {...state}, {
                nodes: nodes || null,
                unions: unions || null,
                connections: connections || null,
                joins: joins || null,
                filterRows: filterRows || null,
                filterGroups: filterGroups || null,
                filterConnections: filterConnections || null
            });

        },
        /* ------------数据筛选器类------------*/
        // 筛选器-行-新增
        [FETCH_FILTER_ROW_ADD_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                filterRows: Object.assign({}, {...state.filterRows}, {...payload})
            });

        },
        // 筛选器-行-删除
        [FETCH_FILTER_ROW_DEL_SUCCESS]: (state, action) => {

            const {payload} = action;
            // accept id -> string || array
            const delObjKey = (id, filterRows) => {

                if(Array.isArray(id)) {

                    id.map(key => delete filterRows[key]);

                } else {

                    delete filterRows[id];

                }
                return filterRows;

            };
            const filterRows = delObjKey(payload, {...state.filterRows});
            return Object.assign({}, {...state}, {
                filterRows
            });

        },
        // 筛选器-行-修改
        [FETCH_FILTER_ROW_UPD_SUCCESS]: (state, action) => {

            const {payload: {id, ...gProps}} = action;
            return Object.assign({}, {...state}, {
                filterRows: Object.assign({}, {...state.filterRows}, {
                    [id]: Object.assign({}, {...state.filterRows[id]}, {...gProps})
                })
            });

        },
        // 筛选器-组-新增
        [FETCH_FILTER_GROUP_ADD_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                filterGroups: Object.assign({}, {...state.filterGroups}, {...payload})
            });

        },
        // 筛选器-组-删除
        [FETCH_FILTER_GROUP_DEL_SUCCESS]: (state, action) => {

            const {payload} = action;
            // accept id -> string || array
            const delObjKey = (id, filterGroups) => {

                if(Array.isArray(id)) {

                    id.map(key => delete filterGroups[key]);

                } else {

                    delete filterGroups[id];

                }
                return filterGroups;

            };
            const filterGroups = delObjKey(payload, {...state.filterGroups});
            return Object.assign({}, {...state}, {
                filterGroups
            });

        },
        // 筛选器-组-修改
        [FETCH_FILTER_GROUP_UPD_SUCCESS]: (state, action) => {

            const {payload: {id, ...gProps}} = action;
            return Object.assign({}, {...state}, {
                filterGroups: Object.assign({}, {...state.filterGroups}, {
                    [id]: Object.assign({}, {...state.filterGroups[id]}, {...gProps})
                })
            });

        },
        // 筛选器-关系-新增
        [FETCH_FILTER_LINE_ADD_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                filterConnections: Object.assign({}, {...state.filterConnections}, {...payload})
            });

        },
        // 筛选器-关系-删除
        [FETCH_FILTER_LINE_DEL_SUCCESS]: (state, action) => {

            const {payload} = action;
            // accept id -> string || array
            const delObjKey = (id, filterConnections) => {

                if(Array.isArray(id)) {

                    id.map(key => delete filterConnections[key]);

                } else {

                    delete filterConnections[id];

                }
                return filterConnections;

            };
            const filterConnections = delObjKey(payload, {...state.filterConnections});
            return Object.assign({}, {...state}, {
                filterConnections
            });

        },
        // 筛选器-关系-修改
        [FETCH_FILTER_LINE_UPD_SUCCESS]: (state, action) => {

            const {payload: {id, ...gProps}} = action;
            return Object.assign({}, {...state}, {
                filterConnections: Object.assign({}, {...state.filterConnections}, {
                    [id]: Object.assign({}, {...state.filterConnections[id]}, {...gProps})
                })
            });

        },
        /* ------------执行运行类------------*/
        // 是否切换到数据预览/tree模型
        [IS_WF_PREVIEW_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                isWfPreviewStatus: payload // true -> preview， false -> tree
            });

        },
        // 是否正在请求数据预览接口
        [IS_LOADING_PREVIEW_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                isLoadingPreStatus: payload
            });

        },
        // 运行流程-数据预览
        [FETCH_RUN_WF_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                wfPreviewData: payload
            });

        },
        // 数据预览最后更新时间戳
        [FETCH_WF_PREVIEW_LAST_TIME]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                lastWfPreviewTime: payload
            });

        }
    }
);
