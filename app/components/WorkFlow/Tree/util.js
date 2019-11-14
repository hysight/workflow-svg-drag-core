/**
 *@Author: hy-zhangb
 *Date: 2018/7/26 13:43
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/26 13:43
 *Email: lovewinders@163.com
 *File Path: tree - util
 *@File Name: util
 *@Description: Description
 */
'use strict';

export function convertTreeToEntities(treeNodes) {

    const keyEntities = {};
    const loop = data => data.map((item) => {

        const {props: {children}, key} = item;
        keyEntities[key] = {
            key
        };
        if(children && children.length) {

            loop(children);

        }

    });
    if(Array.isArray(treeNodes)) {

        loop(treeNodes);
        return keyEntities;

    }
    return treeNodes;

}

// 在拖拽区域判断表是否存在数据源里
export const isTableInDataSources = (dataSources, dataSourceId, tableName) => {

    // 判断是否存在该数据表
    return !!(
        dataSources &&
        dataSourceId &&
        dataSources[dataSourceId] &&
        dataSources[dataSourceId].tableVo.some(item => item.tableName === tableName)
    );

};

// 在拖拽区域判断表下是否存在某字段
export const isColumnInTable = (dataSources, dataSourceId, tableName, columnsConnections, columnName) => {
    const {[dataSourceId]: {tableVo}} = dataSources;
    const [{tableColumnVos}] = tableVo.filter(v => v.tableName === tableName);
    return tableColumnVos && tableColumnVos.some(w => w.columnName === columnName);

};
