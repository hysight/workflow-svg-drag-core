/**
 *@Author: hy-zhangb
 *Date: 2018/10/24 16:12
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/24 16:12
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Select, Button } from 'antd';

// component
import JoinIcon from 'app/components/JoinIcon';

import {
    FETCH_JOIN_UPDATE_SUCCESS
} from 'app/constant/workFlow';

import {getTableColumnKey} from 'app/containers/Edit/EditDataModel/EditDataAxis/DataAxisTree/utils';
import {isColumnInTable} from '../util';

// css
import './style.scss';

const Option = Select.Option;

// JoinTable
@connect(
    state => {

        const {
            edit: {
                dataSources
            },
            workFlow: {
                nodes,
                connections
                // joins
            }
        } = state;
        return {
            dataSources,
            nodes,
            connections
            // joins
        };

    }
)
class JoinTable extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        linesId: PropTypes.string.isRequired,
        columnsConnections: PropTypes.array.isRequired,
        dataSources: PropTypes.object.isRequired,
        nodes: PropTypes.object.isRequired,
        connections: PropTypes.object.isRequired
    };
    componentWillMount() {

        const {dispatch, id, columnsConnections} = this.props;
        // 如果无字段关联关系的话，则默认增加一条
        if(!columnsConnections.length) {

            dispatch({
                type: FETCH_JOIN_UPDATE_SUCCESS,
                payload: {
                    id,
                    columnsConnections: columnsConnections.concat({
                        leftColumn: null,
                        rightColumn: null
                    })
                }
            });

        }

    }
    componentWillUnmount() {

        const {dispatch, id, columnsConnections} = this.props;
        // 过滤掉条件未选择的关联关系
        dispatch({
            type: FETCH_JOIN_UPDATE_SUCCESS,
            payload: {
                id,
                columnsConnections: columnsConnections.filter(v => v.leftColumn && v.rightColumn)
            }
        });

    }
    changeJoinType = ({key}) => {

        // console.log('key', key);
        const {dispatch, id} = this.props;
        dispatch({
            type: FETCH_JOIN_UPDATE_SUCCESS,
            payload: {
                id,
                type: key
            }
        });

    };
    addRow = () => {

        const {dispatch, id, columnsConnections} = this.props;
        dispatch({
            type: FETCH_JOIN_UPDATE_SUCCESS,
            payload: {
                id,
                columnsConnections: columnsConnections.concat({
                    leftColumn: null,
                    rightColumn: null
                })
            }
        });

    };
    delRow = (rowIndex) => {

        const {dispatch, id, columnsConnections} = this.props;
        dispatch({
            type: FETCH_JOIN_UPDATE_SUCCESS,
            payload: {
                id,
                columnsConnections: columnsConnections.filter((w, j) => j !== rowIndex)
            }
        });

    };
    updateRowCol = (rowIndex, colKey, colVal) => {

        const {dispatch, id, columnsConnections} = this.props;
        dispatch({
            type: FETCH_JOIN_UPDATE_SUCCESS,
            payload: {
                id,
                columnsConnections:
                    columnsConnections.map((v, i) => i === rowIndex ? Object.assign({}, {...v}, {[colKey]: colVal}) : v)
            }
        });

    };
    getSourceTargetNode = () => {

        const {linesId, nodes, connections} = this.props;
        const {sourceId, targetId} = connections[linesId];
        const {[sourceId]: sourceNode, [targetId]: targetNode} = nodes;
        return {
            sourceNode,
            targetNode
        };

    };
    toRenderIcon = () => {

        const {type, dataSources, nodes, connections, linesId} = this.props;
        const {[linesId]: {sourceId, targetId}} = connections;
        const {
            [sourceId]: {dataSourceId: sDsId},
            [targetId]: {dataSourceId: tDsId}
        } = nodes;
        // const sChildType = dataSources[sDsId].childType;
        const {
            [sDsId]: {childType: sChildType},
            [tDsId]: {childType: tChildType}
        } = dataSources;
        const joinTypes = [
            {key: 'inner-join', name: '内连接'},
            {key: 'left-join', name: '左连接'},
            {key: 'right-join', name: '右连接'},
            {key: 'full-join', name: '全连接'}
        ];
        return joinTypes.map(v => {

            const isMysql = v.key === 'full-join' && sChildType === 'MYSQL' && tChildType === 'MYSQL';
            const cls = classNames(
                'join-type-item',
                {
                    'item-selected': type === v.key,
                    // 此处业务后续会根据直连或抽取进行变动
                    'item-disabled': isMysql
                }
            );
            const specialPointer = !isMysql ? {
                onClick: () => this.changeJoinType(v)
            } : null;
            return (
                <div
                    key={v.key}
                    className={cls}
                    {...specialPointer}
                >
                    <JoinIcon type={v.key} />
                    <p>{v.name}</p>
                </div>
            );

        });

    };
    toRenderTableName = (sourceTargetNode) => {

        const {sourceNode: {name: sourceName}, targetNode: {name: targetName}} = sourceTargetNode;
        return (
            <div>
                <span className={'table-col'}>[{sourceName}]</span>
                <span className={'table-col'}>[{targetName}]</span>
            </div>
        );

    };
    toRenderOptions = (sourceTargetNode, node) => {

        const {dataSources} = this.props;
        const {
            [node]: {dataSourceId, tableName, tableColumnKeys}
        } = sourceTargetNode;
        const {
            [dataSourceId]: {tableVo}
        } = dataSources;
        const [{tableColumnVos}] = tableVo.filter(v => v.tableName === tableName);
        // getTableColumnKey
        return tableColumnVos &&
            tableColumnVos.map((column) => {

                const {aliasColumnName} = getTableColumnKey(tableColumnKeys, column);
                return <Option key={column.columnName} value={column.columnName}>{aliasColumnName}</Option>;

            });

    };
    toRenderFieldRow = (sourceTargetNode) => {

        const {dataSources, columnsConnections} = this.props;
        const {
            sourceNode: {
                dataSourceId: sDataSourceId,
                tableName: sTableName
            },
            targetNode: {
                dataSourceId: tDataSourceId,
                tableName: tTableName
            }
        } = sourceTargetNode;
        return columnsConnections && columnsConnections.map((v, i) => {

            const isLeftColInTable = isColumnInTable(
                dataSources,
                sDataSourceId,
                sTableName,
                columnsConnections,
                v.leftColumn
            );
            const isRightColInTable = isColumnInTable(
                dataSources,
                tDataSourceId,
                tTableName,
                columnsConnections,
                v.rightColumn
            );
            console.log('当前存在', v.leftColumn, isLeftColInTable);
            const clsLeft = classNames({
                'has-error': !isLeftColInTable
            });
            const clsRight = classNames({
                'has-error': !isRightColInTable
            });
            return (
                <div
                    key={`field-row-${i}`}
                    className={'field-row'}
                >
                    <div className={'field-col'}>
                        <Select
                            className={clsLeft}
                            value={v.leftColumn || ''}
                            style={{ width: '100%' }}
                            onChange={(val) => this.updateRowCol(i, 'leftColumn', val)}
                        >
                            {this.toRenderOptions(sourceTargetNode, 'sourceNode')}
                        </Select>
                    </div>
                    <div className={'field-symbol'}>=</div>
                    <div className={'field-col'}>
                        <Select
                            className={clsRight}
                            value={v.rightColumn || ''}
                            style={{ width: '100%' }}
                            onChange={(val) => this.updateRowCol(i, 'rightColumn', val)}
                        >
                            {this.toRenderOptions(sourceTargetNode, 'targetNode')}
                        </Select>
                    </div>
                    <div
                        className={'field-opera'}
                        onClick={() => this.delRow(i)}
                    >
                        <i className={'icon-shanchu'} />
                    </div>
                </div>
            );

        });

    };
    render() {

        console.log('渲染jointable', this.props);
        const sourceTargetNode = this.getSourceTargetNode();
        return (
            <div className={'hm-join-table'}>
                <div className={'join-type-con'}>{this.toRenderIcon()}</div>
                <div className={'join-table-con'}>{this.toRenderTableName(sourceTargetNode)}</div>
                <div className={'join-field-con'}>{this.toRenderFieldRow(sourceTargetNode)}</div>
                <div className={'join-add-con'}>
                    <Button
                        type='dashed'
                        style={{ width: '100%' }}
                        onClick={this.addRow}
                    >
                        <i className={'icon-xinjian'} /> 添加
                    </Button>
                </div>
            </div>
        );

    }
}

export default JoinTable;
