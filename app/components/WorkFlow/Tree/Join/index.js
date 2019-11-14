/**
 *@Author: hy-zhangb
 *Date: 2018/10/24 15:49
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/24 15:49
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classNames from 'classnames';

// component
import ContextMenu from '@hysight/contextMenu';
import JoinIcon from 'app/components/JoinIcon';
import Modal from 'app/components/Modal';
import JoinTable from '../JoinTable';

// containers

import {isTableInDataSources, isColumnInTable} from '../util';

// css
import './style.scss';

// Join
@connect(
    state => {

        const {
            edit: {
                dataSources
            },
            workFlow: {
                nodes,
                connections
            }
        } = state;
        return {
            dataSources,
            nodes,
            connections
        };

    }
)
class Join extends Component {
    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.string
    };
    stopEventDefault = (event) => {

        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

    };
    render() {

        const {
            dataSources,
            nodes,
            connections,
            columnsConnections,
            linesId,
            type
        } = this.props;
        console.log(columnsConnections, 'columnsConnections');
        const {[linesId]: {sourceId, targetId}} = connections;
        const isTableInDs = [sourceId, targetId].every(v =>
            isTableInDataSources(dataSources, nodes[v].dataSourceId, nodes[v].tableName)
        );

        // 判断是否存在该数据表
        // const isTableError = isTableInDataSources(dataSources, dataSourceId);
        console.log('显示join数据props', this.props);

        const basePointer =
            {
                onDragOver: (event) => {

                    this.stopEventDefault(event);

                },
                onDragLeave: (event) => {

                    this.stopEventDefault(event);

                },
                onClick: (event) => {

                    this.stopEventDefault(event);

                }
            };
        return (
            <span
                className={'hm-join'}
                {...basePointer}
            >
                {
                    isTableInDs
                        ? <ContextMenu
                            eventTrigger={['onClick']}
                            isMaskLayer={true}
                            position={'under'}
                            render={(props) => {

                                const isColInTable = columnsConnections.length > 0 ? [sourceId, targetId].every((v, i) =>
                                    columnsConnections.every(w => isColumnInTable(
                                        dataSources,
                                        nodes[v].dataSourceId,
                                        nodes[v].tableName,
                                        columnsConnections,
                                        i ? w.rightColumn : w.leftColumn
                                    ))
                                ) : false;
                                return <JoinIcon
                                    type={isColInTable ? type : 'warn-join'}
                                    title={isColInTable ? '' : '字段不存在'}
                                />;

                            }}
                        >
                            <Modal
                                title={'表连接'}
                            >
                                <JoinTable {...this.props} />
                            </Modal>
                        </ContextMenu>
                        : <JoinIcon
                            type={'warn-join'}
                            disabled={true}
                            title={'请先处理表不存在问题'}
                        />
                }
            </span>
        );

    }
}

export default Join;
