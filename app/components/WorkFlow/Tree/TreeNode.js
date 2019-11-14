/**
 *@Author: hy-zhangb
 *Date: 2018/10/17 16:48
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/17 16:48
 *Email: lovewinders@163.com
 *File Path: jointable - TreeNode
 *@File Name: TreeNode
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import UnionAdd from './Union/UnionAdd';
import UnionSelect from './Union/UnionSelect';
import Node from './Node';
import Join from './Join';

// css
import './style.scss';

// TreeNode
class TreeNode extends Component {
    static propTypes = {
        unions: PropTypes.array,
        join: PropTypes.object,
        prompt: PropTypes.string,
        title: PropTypes.string.isRequired,
        isLeaf: PropTypes.bool,
        isMore: PropTypes.bool,
        moreComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.node
        ]),
        isPrefixIcon: PropTypes.bool,
        prefixIconComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.node
        ]),
        selectedEye: PropTypes.bool,
        selectedEyeParents: PropTypes.bool,
        eventKey: PropTypes.string,
        _level: PropTypes.number,
        root: PropTypes.object,
        icon: PropTypes.string,
        expanded: PropTypes.bool,
        selected: PropTypes.bool,
        mouseOver: PropTypes.bool,
        dragOver: PropTypes.bool,
        dragOverGapTop: PropTypes.bool,
        dragOverGapBottom: PropTypes.bool,
        draggable: PropTypes.bool,
        disabledProviderEvents: PropTypes.bool,
        isEye: PropTypes.bool,
        defaultExpandAll: PropTypes.bool,
        children: PropTypes.array,
        onDrop: PropTypes.func,
        onExpand: PropTypes.func,
        onSelect: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragOver: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDragEnd: PropTypes.func,
        onEyeChange: PropTypes.func,
        onRightClick: PropTypes.func,
        updateExpandedKeys: PropTypes.func,
        updateSelectedKeys: PropTypes.func,
        updateSelectedEyeKeys: PropTypes.func,
        updateDragNodesKeys: PropTypes.func,
        updateDragOverNodeKey: PropTypes.func,
        clearDragOverNodeKey: PropTypes.func,
        setDropPosition: PropTypes.func,
        updateMouseEnterKeys: PropTypes.func
    };
    static defaultProps = {
        title: '---',
        isLeaf: false,
        isMore: false,
        moreComponent: '---',
        isPrefixIcon: false,
        prefixIconComponent: '-'
    };
    constructor(props, context) {

        super(props, context);
        this.toRenderChildren = this.toRenderChildren.bind(this);
        this.toRenderContent = this.toRenderContent.bind(this);
        this.toRenderRowsContent = this.toRenderRowsContent.bind(this);
        this.dragEnter = this.dragEnter.bind(this);
        this.drop = this.drop.bind(this);
        this.filterBlackListEvents = this.filterBlackListEvents.bind(this);

    }

    stopEventDefault = (event) => {

        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

    };

    dragEnter(e) {

        const {
            onDragEnter,
            root: {
                state: {expandedKeys}
            }
        } = this.props;

        // console.log('this.props', this.props, e);
        const data = Object.assign({}, {event: e, node: this, expandedKeys});

        // props
        onDragEnter && onDragEnter(data);

    }

    drop = (event, isUnion = false) => {

        const {
            onDrop,
            eventKey,
            isLeaf,
            root: {
                dragNode,
                dropPosition
            },
            dragOver,
            dragOverGapTop,
            dragOverGapBottom
        } = this.props;
        // if folder no draggable
        if(dragOver && isLeaf) { // isLeaf

            return;

        }
        // filter drag & drop is one node
        if(dragNode && eventKey === dragNode.props.eventKey) {

            console.warn('can not drop to dragNode(include it\'s children node)');
            return;

        }
        const data = Object.assign(
            {},
            {
                event,
                isUnion,
                dropPosition,
                node: this,
                dragNode: dragNode,
                dragNodesKeys: eventKey
            },
            (dragOverGapTop ? {dragOverGapTop: true} : {}),
            (dragOverGapBottom ? {dragOverGapBottom: true} : {})
        );
        onDrop(data);

    };

    filterBlackListEvents(eventPointers) {

        return (disabledPointersArr) => {

            return Object.entries(eventPointers)
                .filter(([key]) => !disabledPointersArr.some(v => v === key))
                .reduce((pre, [k, y]) => Object.assign({}, pre, {[k]: y}), {});

        };

    }

    toRenderChildren() {

        const {children, root, ...props} = this.props;
        const {state: {expandedKeys, selectedKeys, selectedEyeKeys, dragOverNodeKey, mouseEnterKeys}, dropPosition} = root;
        const {autoExpandParent, expanded} = props;
        // debugger;
        if(expanded && children) {

            return (
                <ul className='tree-child-tree'>
                    {
                        React.Children.map(children, child => {

                            // debugger;
                            /* console.log(
                                'dragOverNodeKey === child.key=>',
                                dragOverNodeKey,
                                child.key,
                                dragOverNodeKey === child.key,
                                'dropPosition=>',
                                dropPosition
                            );*/
                            const {key: eventKey, props: {children, ...prop}} = child;
                            return React.cloneElement(child, {
                                ...props,
                                ...prop,
                                root,
                                eventKey,
                                _level: props._level + 1,
                                dragOver: dragOverNodeKey === eventKey && dropPosition === 0,
                                dragOverGapTop: dragOverNodeKey === eventKey && dropPosition === -1,
                                dragOverGapBottom: dragOverNodeKey === eventKey && dropPosition === 1,
                                expanded: autoExpandParent || expandedKeys.includes(eventKey),
                                selected: selectedKeys.includes(eventKey),
                                selectedEye: selectedEyeKeys.includes(eventKey) || props.selectedEye,
                                selectedEyeParents: props.selectedEyeParents || props.selectedEye,
                                mouseOver: mouseEnterKeys.includes(eventKey)
                            });

                        })
                    }
                </ul>
            );

        }
        return null;

    }
    toRenderJoin = () => {

        const {_level, join} = this.props;
        // console.log('撒反对据了解按时灯笼裤飞机啊老师', this.props);
        return _level ? <Join {...join} /> : null;

    };
    toRenderUnionSelect = () => {

        const {unions} = this.props;
        return unions.length ? <UnionSelect /> : null;

    };
    toRenderUnionAdd = () => {

        const {clearDragOverNodeKey} = this.props;
        const basePointer =
            {
                onDrop: (event) => {

                    clearDragOverNodeKey();
                    this.drop(event, true);

                }
            };
        return (
            <UnionAdd {...basePointer} />
        );

    };
    toRenderContent() {

        const {
            title,
            prompt,
            selected,
            draggable,
            clearDragOverNodeKey
        } = this.props;

        // className
        // const cls = classNames('tree-content-wrapper', {
        //     'tree-node-selected': selected
        // });

        const basePointer =
            {
                onDragOver: (event) => {

                    // this.stopEventDefault(event);

                },
                onDragLeave: (event) => {

                    // clearDragOverNodeKey();
                    // this.stopEventDefault(event);

                },
                onDrop: (event) => {

                    clearDragOverNodeKey();
                    this.drop(event);

                }
            };

        return (
            <div
                className={'tree-node'}
                // ref={'selectHandle'}
                draggable={draggable}
                {...basePointer}
            >
                <Node {...this.props} />
            </div>
        );

    }
    toRenderRowsContent() {

        const {
            isLeaf,
            isMore,
            root: {
                state: {expandedKeys}
            },
            onExpand,
            selected,
            draggable,
            eventKey,
            dragOver,
            disabledProviderEvents,
            updateSelectedKeys,
            updateExpandedKeys,
            updateDragNodesKeys,
            updateDragOverNodeKey,
            clearDragOverNodeKey,
            updateMouseEnterKeys,
            onRightClick,
            onSelect,
            onDragStart,
            // onDragEnter,
            onDragOver,
            onDragLeave,
            onDragEnd
            // onDrop
        } = this.props;

        // 基础事件
        const basePointer =
            {
                onDragOver: (event) => {

                    // this.stopEventDefault(event);
                    console.log('disabledProviderEvents', disabledProviderEvents);

                    event.dataTransfer.dropEffect = dragOver && isLeaf ? 'none' : 'copyMove';
                    // props
                    updateDragOverNodeKey(event, this);
                    onDragOver && onDragOver({event: event, node: this});

                },
                onDragEnd: (event) => {

                    clearDragOverNodeKey();
                    // props
                    onDragEnd && onDragEnd({event: event, node: this});

                },
                onDragEnter: (event) => {

                    // this.stopEventDefault(event);
                    // updateDragOverNodeKey(event, this);
                    console.log('父级Enter');

                },
                onDragLeave: (event) => {

                    // this.stopEventDefault(event);
                    clearDragOverNodeKey();
                    // props
                    onDragLeave && onDragLeave({event: event, node: this});
                    console.log('父级Leave');

                },
                onMouseEnter: (event) => {

                    isMore && updateMouseEnterKeys && updateMouseEnterKeys(event, this, true);

                },
                onMouseLeave: (event) => {

                    isMore && updateMouseEnterKeys && updateMouseEnterKeys(event, this, false);

                },
                onContextMenu: (event) => {

                    onRightClick && onRightClick({event: event, node: this});

                }
            };

        // 特殊事件
        const specialPointer = !isLeaf
            ? {
                onClick: (event) => {

                    updateSelectedKeys(eventKey);
                    updateExpandedKeys(eventKey);
                    onExpand &&
                    onExpand(expandedKeys, {expanded: !expandedKeys.includes(eventKey), node: this});
                    onSelect &&
                    onSelect(
                        eventKey,
                        {
                            selected: true,
                            event: event,
                            selectedNodes: [this],
                            node: this
                        }
                    );

                },
                onDragStart: (event) => {

                    if(!disabledProviderEvents) {

                        event.dataTransfer.effectAllowed = 'copyMove';
                        updateDragNodesKeys(this);

                    }
                    onDragStart && onDragStart({event: event, node: this});

                }
            }
            : {
                onClick: (event) => {

                    updateSelectedKeys(eventKey);
                    onSelect &&
                    onSelect(
                        eventKey,
                        {
                            selected: true,
                            event: event,
                            selectedNodes: [this],
                            node: this
                        }
                    );

                },
                onDragStart: (event) => {

                    if(!disabledProviderEvents) {

                        event.dataTransfer.effectAllowed = 'copyMove';
                        updateDragNodesKeys(this);

                    }
                    // props
                    onDragStart && onDragStart({event: event, node: this});

                }
            };

        const blackEventsList = []; // 'onDragStart', 'onDragOver', 'onDragEnd', 'onDrop'
        const groupPointer = {...basePointer, ...specialPointer};
        const nodePointer = disabledProviderEvents
            ? this.filterBlackListEvents(groupPointer)(blackEventsList) : groupPointer;

        const cls = classNames('tree-parent-tree');

        return (
            <div
                ref={'selectHandle'}
                className={cls}
                // draggable={draggable}
                {...nodePointer}
            >
                {this.toRenderJoin()}
                {this.toRenderContent()}
                {this.toRenderUnionSelect()}
                {/* ---------并集临时注释掉，后期会放开（css还有一处地方）---------*/}
                 {/*{this.toRenderUnionAdd()}*/}
            </div>
        );

    }
    render() {

        const {children, selected, expanded, dragOver, dragOverGapTop, dragOverGapBottom} = this.props;
        const cls = classNames({
            'tree-node-selected': selected, //  && !children
            'tree-node-expanded': expanded,
            'tree-drag-over': dragOver,
            'tree-drag-top': dragOverGapTop,
            'tree-drag-bottom': dragOverGapBottom
        });
        return (
            <li
                className={cls}
                onDragEnter={(event) => {

                    this.dragEnter(event);

                }}
                onDragOver={(event) => {

                    this.stopEventDefault(event);

                }}
                onContextMenu={(event) => {

                    // this.stopEventDefault(event);

                }}
            >
                {this.toRenderRowsContent()}
                {this.toRenderChildren()}
            </li>
        );

    }
}

export default TreeNode;
