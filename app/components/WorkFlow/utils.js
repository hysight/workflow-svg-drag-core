/**
 *@Author: hy-zhangb
 *Date: 2018/11/15 16:14
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/11/15 16:14
 *Email: lovewinders@163.com
 *File Path: jointable - utils
 *@File Name: utils
 *@Description: Description
 */
'use strict';
// import {isDataFilterSuccess} from 'app/containers/Edit/EditPanel/BtnDataFilter/utils';
import {isTableInDataSources, isColumnInTable} from 'app/components/WorkFlow/Tree/util';
// 获取第一个节点

// 获取整个画布上TreeData
export const getWorkFlowTreeData = (nodes, connections, joins) => {

    // 没有节点
    if(!nodes) return null;
    const loop = (treeNodes) => {

        console.log(treeNodes);
        const {lines: {in: ins, out}, props} = treeNodes;
        // console.log(112);
        // console.log(112);
        // console.log(112);
        // console.log(112);
        return Object.assign({},
            {...treeNodes},
            {
                children: out.length ? out.map(v => loop(nodes[connections[v].targetId])) : []
            },
            (ins.length ? {join: joins[connections[ins[0]].joinId]} : {})
        );

    };
    const [firstNode] = Object.values(nodes).filter((v, i) => v.lines.in.length === 0);
    return firstNode ? loop(firstNode) : null;

};

// 校验拖拽工作区是否正常
export const isWFValidateSuccess = (dataSources, nodes, connections, joins) => {

    return Object.values(nodes || {}).every(v => isTableInDataSources(dataSources, v.dataSourceId, v.tableName)) &&
        Object.values(joins || {}).every(w => {

            const {
                [w.linesId]: {
                    sourceId,
                    targetId
                }
            } = connections;
            return [sourceId, targetId].every((x, i) =>
                w.columnsConnections.every(y => isColumnInTable(
                    dataSources,
                    nodes[x].dataSourceId,
                    nodes[x].tableName,
                    w.columnsConnections,
                    i ? y.rightColumn : y.leftColumn
                ))
            );

        });

};
