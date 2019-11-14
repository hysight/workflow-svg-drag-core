/**
 *@Author: hy-zhangb
 *Date: 2018/10/8 15:07
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/8 15:07
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    FETCH_NODE_ADD_DATA,
    FETCH_UNION_ADD_DATA,
    FETCH_NODE_ADD_SUCCESS
} from 'app/constant/workFlow';

import Message from '@hysight/message';

// containers

// components
import Tree from './Tree';

import {getWorkFlowTreeData} from './utils';

// css
import './style.scss';

const {TreeNode} = Tree;

// WorkFlow
@connect()
class WorkFlow extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        nodes: PropTypes.object,
        connections: PropTypes.object,
        joins: PropTypes.object
    };
    dragOverNode = (event) => {

        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        event.dataTransfer.dropEffect = 'copyMove';
        console.log('dragOverNode');

    };
    onDrop = ({event, node, dragNode, dragNodesKeys, dropPosition, isUnion}) => {

        console.log('onDrop', event, node, dragNode, dragNodesKeys, dropPosition);

        const targetNode = JSON.parse(event.dataTransfer.getData('data'));
        console.log('onDrop-targetNode', node, dragNode, targetNode);
        // 判断上一个节点是否存在相同数据表
        if(node.props.tableName !== targetNode.tableName) {

            // FETCH_NODE_ADD_SUCCESS
            const {dispatch} = this.props;
            dispatch({
                type: isUnion ? FETCH_UNION_ADD_DATA : FETCH_NODE_ADD_DATA,
                payload: {
                    sourceId: dragNodesKeys,
                    targetNode
                }
            });

        } else {

            Message.error('当前禁止连接相同数据表');

        }

    };
    toRenderTreeNodes = (treeNodeData) => {

        const loop = data => data.map((item) => {

            const {children, dataSourceId, id, name, tableName, unions, join} = item;
            if(children && children.length) {

                // <TreeMore onClick={() => console.log(111)} />
                return (
                    <TreeNode
                        key={id}
                        title={name}
                        draggable={false}
                        // isLeaf={dataTreeType !== 'DIR'}
                        id={id}
                        iconDir={true}
                        // pid={parentId}
                        unions={unions}
                        join={join}
                        dataSourceId={dataSourceId}
                        tableName={tableName}
                    >
                        {loop(children)}
                    </TreeNode>
                );

            }
            return (
                <TreeNode
                    key={id}
                    title={name}
                    // isLeaf={dataTreeType !== 'DIR'}
                    draggable={false}
                    // icon={type}
                    id={id}
                    iconDir={true}
                    // pid={parentId}
                    unions={unions}
                    join={join}
                    dataSourceId={dataSourceId}
                    tableName={tableName}
                />
            );

        });
        if(!treeNodeData) return null;
        return (
            <Tree
                className='draggable-tree'
                autoExpandParent={true}
                // expandedKeys={['67']}
                // selectedKeys={['73']}
                draggable={false}
                disabledProviderEvents={true}
                isEye={false}
                onDrop={this.onDrop}
                onRightClick={() => console.log('onRightClick')}
                onExpand={() => console.log('onExpand')}
                // onSelect={this.onSelect}
                onDragStart={(info) => console.log('onDragStart', info)}
                onDragEnter={this.onDragEnter}
                onDragOver={({event}) => this.dragOverNode(event)}
                onDragLeave={() => console.log('onDragLeave')}
                onDragEnd={() => console.log('onDragEnd')}
                onMoreClick={() => console.log('onMoreClick')}
                onEyeChange={(selectedEyeKey, {selected, node}) => console.log(selectedEyeKey, selected, node)}
            >
                {loop([treeNodeData])}
            </Tree>
        );

    };
    render() {

        const {nodes, connections, joins} = this.props;
        console.log('treeNodes 数据', getWorkFlowTreeData(nodes, connections, joins));
        // 特殊事件
        const specialPointer =
                !(Object.prototype.toString.call(nodes) === '[object Object]' && JSON.stringify(nodes) !== '{}')
                    ? {
                        onDragOver: (event) => {

                            event.preventDefault();
                            event.dataTransfer.dropEffect = 'copyMove';
                            console.log('onDragOver');

                        },
                        onDrop: (event) => {

                            console.log('onDrop');

                            const {id, ...props} = JSON.parse(event.dataTransfer.getData('data'));
                            console.log(id);
                            // FETCH_NODE_ADD_SUCCESS
                            const {dispatch} = this.props;
                            dispatch({
                                type: FETCH_NODE_ADD_SUCCESS,
                                payload: {
                                    [id]: {
                                        id,
                                        ...props,
                                        lines: {
                                            in: [],
                                            out: []
                                        },
                                        unions: []
                                    }
                                }
                            });

                        }
                    } : {};
        return (
            <div
                className={'hm-work-flow'}
                {...specialPointer}
            >
                {this.toRenderTreeNodes(getWorkFlowTreeData(nodes, connections, joins))}
            </div>
        );

    }
}

export default WorkFlow;
