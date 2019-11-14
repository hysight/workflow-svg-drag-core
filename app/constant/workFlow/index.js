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
/* ---------------清空画布信息----------------*/
// 清空画布信息（包含节点/Union/线/合并条件/筛选器行/列/关系/基本预览数据）
export const FETCH_WORK_FLOW_CLEAR_SUCCESS = 'FETCH_WORK_FLOW_CLEAR_SUCCESS';

/* ------------节点类------------*/
// 节点类-新增
export const FETCH_NODE_ADD_DATA = 'FETCH_NODE_ADD_DATA';
export const FETCH_NODE_ADD_SUCCESS = 'FETCH_NODE_ADD_SUCCESS';

// 节点类-删除
export const FETCH_NODE_DEL_DATA = 'FETCH_NODE_DEL_DATA';
export const FETCH_NODE_DEL_SUCCESS = 'FETCH_NODE_DEL_SUCCESS';

// 节点类-修改
export const FETCH_NODE_UPDATE_SUCCESS = 'FETCH_NODE_UPDATE_SUCCESS';

// Union类-新增
export const FETCH_UNION_ADD_DATA = 'FETCH_UNION_ADD_DATA';
export const FETCH_UNION_ADD_SUCCESS = 'FETCH_UNION_ADD_SUCCESS';

// Union类-删除
export const FETCH_UNION_DEL_SUCCESS = 'FETCH_UNION_DEL_SUCCESS';

/* ------------线条类------------*/
// 线条类-新增
export const FETCH_LINE_ADD_SUCCESS = 'FETCH_LINE_ADD_SUCCESS';

// 线条类-删除
export const FETCH_LINE_DEL_SUCCESS = 'FETCH_LINE_DEL_SUCCESS';

/* ------------合并条件类------------*/
// 合并条件-新增
export const FETCH_JOIN_ADD_SUCCESS = 'FETCH_JOIN_ADD_SUCCESS';

// 合表条件-删除
export const FETCH_JOIN_DEL_SUCCESS = 'FETCH_JOIN_DEL_SUCCESS';

// 合表条件-修改
export const FETCH_JOIN_UPDATE_SUCCESS = 'FETCH_JOIN_UPDATE_SUCCESS';

/* ------------合表条件弹框处理类------------*/

// 合表条件弹框处理类-2表字段数据
// export const FETCH_TABLE_JOIN_COL_DATA = 'FETCH_TABLE_JOIN_COL_DATA';
// export const FETCH_TABLE_JOIN_COL_SUCCESS = 'FETCH_TABLE_JOIN_COL_SUCCESS';

/* ------------数据筛选器类------------*/

// 筛选器-行-新增
export const FETCH_FILTER_ROW_ADD_SUCCESS = 'FETCH_FILTER_ROW_ADD_SUCCESS';
// 筛选器-行-删除
export const FETCH_FILTER_ROW_DEL_SUCCESS = 'FETCH_FILTER_ROW_DEL_SUCCESS';
// 筛选器-行-修改
export const FETCH_FILTER_ROW_UPD_SUCCESS = 'FETCH_FILTER_ROW_UPD_SUCCESS';

// 筛选器-组-新增
export const FETCH_FILTER_GROUP_ADD_SUCCESS = 'FETCH_FILTER_GROUP_ADD_SUCCESS';
// 筛选器-组-删除
export const FETCH_FILTER_GROUP_DEL_SUCCESS = 'FETCH_FILTER_GROUP_DEL_SUCCESS';
// 筛选器-组-修改
export const FETCH_FILTER_GROUP_UPD_SUCCESS = 'FETCH_FILTER_GROUP_UPD_SUCCESS';

// 筛选器-关系-新增
export const FETCH_FILTER_LINE_ADD_SUCCESS = 'FETCH_FILTER_LINE_ADD_SUCCESS';
// 筛选器-关系-删除
export const FETCH_FILTER_LINE_DEL_SUCCESS = 'FETCH_FILTER_LINE_DEL_SUCCESS';
// 筛选器-关系-修改
export const FETCH_FILTER_LINE_UPD_SUCCESS = 'FETCH_FILTER_LINE_UPD_SUCCESS';

/* ------------执行运行类------------*/

// 是否切换到数据预览/tree模型
export const IS_WF_PREVIEW_SUCCESS = 'IS_WF_PREVIEW_SUCCESS';

// 是否正在请求数据预览接口
export const IS_LOADING_PREVIEW_SUCCESS = 'IS_LOADING_PREVIEW_SUCCESS';

// 数据预览最后更新时间戳
export const FETCH_WF_PREVIEW_LAST_TIME = 'FETCH_WF_PREVIEW_LAST_TIME';

// 运行流程-数据预览
export const FETCH_RUN_WF_DATA = 'FETCH_RUN_WF_DATA';
export const FETCH_RUN_WF_SUCCESS = 'FETCH_RUN_WF_SUCCESS';

// 是否保存流程弹框
export const IS_SAVE_WF_SUCCESS = 'IS_SAVE_WF_SUCCESS';

// 是否编辑流程弹框
export const IS_EDIT_WF_SUCCESS = 'IS_EDIT_WF_SUCCESS';

// 保存流程画布信息
export const FETCH_SAVE_WF_CANVAS_DATA = 'FETCH_SAVE_WF_CANVAS_DATA';

// 获取流程画布信息
export const FETCH_ID_WF_CANVAS_DATA = 'FETCH_ID_WF_CANVAS_DATA';
export const FETCH_ID_WF_CANVAS_SUCCESS = 'FETCH_ID_WF_CANVAS_SUCCESS';

// 保存流程后台信息
export const FETCH_SAVE_WF_API_DATA = 'FETCH_SAVE_WF_API_DATA';

// 修改流程基本信息
export const FETCH_EDIT_WF_API_DATA = 'FETCH_EDIT_WF_API_DATA';

// 修改某流程后台信息
export const FETCH_ID_UPDATE_WF_API_DATA = 'FETCH_ID_UPDATE_WF_API_DATA';
