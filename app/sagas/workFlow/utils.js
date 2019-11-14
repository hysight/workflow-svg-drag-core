/**
 *@Author: hy-zhangb
 *Date: 2018/11/6 10:49
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/11/6 10:49
 *Email: lovewinders@163.com
 *File Path: jointable - untils
 *@File Name: untils
 *@Description: Description
 */
'use strict';

// 递归某id节点后所有node/union/line/join信息，按需开启/关闭
export const getNodeAfterAllInfo = (node = true, union = false, line = false, join = false) => {

    const fn = (nodes, connections, id, level = 0) => {

        const {lines: {in: ins, out}, unions} = nodes[id];
        return out.reduce((pre, lineId) => {

            const {targetId: targetNodeId, joinId} = connections[lineId];
            const {unions: targetNodeUns} = nodes[targetNodeId];
            return Object.assign(
                {},
                {
                    nodes:
                        pre.nodes.concat(targetNodeId).concat(fn(nodes, connections, targetNodeId, level + 1).nodes)
                },
                (union ? {
                    unions:
                        pre.unions.concat(targetNodeUns).concat(fn(nodes, connections, targetNodeId, level + 1).unions)
                } : null),
                (line ? {
                    lines: pre.lines.concat(lineId).concat(fn(nodes, connections, targetNodeId, level + 1).lines)
                } : null),
                (join ? {
                    joins: pre.joins.concat(joinId).concat(fn(nodes, connections, targetNodeId, level + 1).joins)
                } : null)
            );

        }, {
            nodes: level ? [] : [id],
            unions: level ? [] : [...unions],
            lines: level ? [] : [...ins],
            joins: level ? [] : [...ins.map(v => connections[v].joinId)]
        });

    };
    return fn;

};

// 获取节点应该index
export const getNodeRepeatTimes = (nodes, nodeName) => {

    if(!nodes) return 0;
    const repeatNodes = Object.values(nodes)
        .filter(({tableName}) => tableName === nodeName)
        .map(v => {

            const res = v.name.match(/(?!_)(\d)+$/g);
            return res ? +res[0] : 0;

        })
        // 插入新节点以便于后续计算
        .concat(-1);
    console.log('计算repeatNodes', repeatNodes);
    // 计算节点index
    let insertIndex = 0;
    repeatNodes.some((n, i, arr) => {

        if(!arr.includes(i)) {

            insertIndex = i;
            return i;

        }

    });
    console.log('计算repeatNodes AAAA', insertIndex);
    return insertIndex;

};

/* -------------------------拖拉拽工作区--------------------------*/
// 获取第一个节点
export const getFirstNode = nodes => {

    if(!nodes || !Object.values(nodes).length) return null;
    const [startNode] = Object.values(nodes).filter((v, i) => v.lines.in.length === 0);
    return startNode;

};
// 获取2表连接关系数组-(按照等级传递数组)
export const getWorkFlowConnectionsLevelArr = (nodes, connections, joins) => {

    const startNode = getFirstNode(nodes);
    const loop = (treeNodes, consArr = []) => {

        const {lines: {out}} = treeNodes;

        return out.concat(
            out.reduce((pre, lineId) => {

                const {targetId} = connections[lineId];
                return pre.concat(
                    loop(
                        nodes[targetId],
                        pre
                    )
                );

            }, [])
        );

    };
    return startNode ? loop(startNode) : [];

};
// 获取2表连接关系数组-(按照上面整条线传递完毕再换第二行传递数组)
export const getWorkFlowConnectionsRowArr = (nodes, connections, joins) => {

    const startNode = getFirstNode(nodes);
    const loop = (treeNodes, consArr = []) => {

        const {lines: {out}} = treeNodes;

        return out.reduce((pre, lineId) => {

            const {targetId} = connections[lineId];
            return pre.concat(lineId).concat(
                loop(
                    nodes[targetId],
                    pre.concat(lineId)
                )
            );

        }, []);

    };
    return startNode ? loop(startNode) : [];

};
// 获取数据预览的结构，集合2表连接关系与数据筛选器关系
export const getWorkFlowPreviewData = (nodes, connections, joins) => {

    console.log('方式一Level', getWorkFlowConnectionsLevelArr(nodes, connections, joins));
    console.log('方式二Row', getWorkFlowConnectionsRowArr(nodes, connections, joins));
    const connectionIds = getWorkFlowConnectionsLevelArr(nodes, connections, joins);
    // 如果只有一个表节点的话
    if(!connectionIds.length && nodes && Object.values(nodes).length) {

        const startNode = getFirstNode(nodes);
        const {
            name: sourceTableAliasName,
            tableName,
            dataSourceEnum: sDataSourceEnum
        } = startNode;
        return [{
            // table_left: sDataSourceEnum === 'FILE' ? sAliasTn : sourceTableName, // 文件类型/基本类型数据库
            table_left: tableName, // 文件类型/基本类型数据库
            table_left_alis: sDataSourceEnum === 'FILE' ? tableName : sourceTableAliasName
        }];

    }
    return connectionIds && connectionIds.map(lineId => {

        const {sourceId, targetId, joinId} = connections[lineId];
        const {
            [sourceId]: {
                name: sourceTableAliasName,
                tableName: sourceTableName,
                dataSourceEnum: sDataSourceEnum
                // props: {tableName: sourceTableName, aliasTableName: sAliasTn, dataSourceEnum: sDataSourceEnum}
            },
            [targetId]: {
                name: targetTableAliasName,
                tableName: targetTableName,
                dataSourceEnum: tDataSourceEnum
                // props: {tableName: targetTableName, aliasTableName: tAliasTn, dataSourceEnum: tDataSourceEnum}
            }
        } = nodes;
        const {[joinId]: {type, columnsConnections}} = joins;
        return {
            // table_left: sourceTableName,
            // table_left: sDataSourceEnum === 'FILE' ? sAliasTn : sourceTableName,
            table_left: sourceTableName,
            table_left_alis: sDataSourceEnum === 'FILE' ? sourceTableName : sourceTableAliasName,
            // table_right: targetTableName,
            // table_right: tDataSourceEnum === 'FILE' ? tAliasTn : targetTableName,
            table_right: targetTableName,
            table_right_alis: tDataSourceEnum === 'FILE' ? targetTableName : targetTableAliasName,
            opt: type.split('-')[0].toUpperCase(),
            columns: columnsConnections.map(v => ({
                table_left: v.leftColumn,
                table_right: v.rightColumn,
                opt: 'EQ'
            }))
        };

    });

};

/* ------------------------------数据筛选------------------------------*/
// 获取数据过滤器第一个Group
export const getFirstGroup = filterGroups => {

    if(!filterGroups || !Object.values(filterGroups).length) return null;
    const [startGroup] = Object.values(filterGroups).filter((v, i) => v.lines.in.length === 0);
    return startGroup;

};
// 获取数据过滤器关系数据
export const getFilterConnectionsArr = (filterRows, filterGroups, filterConnections) => {

    const startGroup = getFirstGroup(filterGroups);
    const loop = (treeGroups, isLevel = 0) => {

        const {lines: {out}} = treeGroups;

        return out.reduce((pre, lineId) => {

            const {targetGroupId} = filterConnections[lineId];
            return pre.concat(targetGroupId).concat(
                // return pre.concat(
                loop(
                    filterGroups[targetGroupId],
                    isLevel + 1
                )
            );

        }, isLevel ? [] : [treeGroups.uuid]);

    };
    return startGroup ? loop(startGroup) : [];

};
// 拼装后台需要的数据筛选器的json
export const getWorkFlowPreviewData2 = (filterRows, filterGroups, filterConnections, nodes, dataSources) => {

    console.log('测试撒旦发链接', getFilterConnectionsArr(filterRows, filterGroups, filterConnections));
    const filterGroupIds = getFilterConnectionsArr(filterRows, filterGroups, filterConnections);
    return filterGroupIds && filterGroupIds.map(gid => {

        const {rowsId, lines: {in: ins}} = filterGroups[gid];
        return {
            specification: ins.length ? filterConnections[ins[0]].connectionType : 'AND',
            wheres: rowsId.map(rowId => {

                const {[rowId]: {charNodeId, charColumnName, character, characterVal}} = filterRows;
                // const {[charNodeId]: {name, props: {tableName, dataSourceEnum}}} = nodes;
                const {[charNodeId]: {name, dataSourceId, tableName}} = nodes;
                const {[dataSourceId]: {tableVo}} = dataSources;
                const [{dataSourceEnum}] = tableVo.filter(v => v.tableName === tableName);
                // const {aliasColumnName} = getTableColumnKey(tableColumnKeys, column);
                return {
                    table: tableName,
                    tableAlis: dataSourceEnum === 'FILE' ? tableName : name,
                    name: charColumnName,
                    operator: character,
                    value: characterVal
                };

            })
        };

    });

};
