/**
 *@Author: hy-zhangb
 *Date: 2018/10/23 18:54
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/23 18:54
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

// component
import ContextMenu from '@hysight/contextMenu';

// containers

import {
    FETCH_NODE_DEL_DATA
} from 'app/constant/workFlow';

import {isTableInDataSources} from '../util';

// css
import './style.scss';

const {MenuItem} = ContextMenu;

// Node
@connect(
    state => {

        const {
            edit: {
                dataSources
            }
        } = state;
        return {
            dataSources
        };

    }
)
class Node extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        id: PropTypes.string,
        prompt: PropTypes.string,
        title: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        tableName: PropTypes.string,
        dataSourceId: PropTypes.number,
        dataSources: PropTypes.object
    };
    deleteNode = () => {

        const {dispatch, id} = this.props;
        dispatch({
            type: FETCH_NODE_DEL_DATA,
            payload: id
        });

    };
    render() {

        const {
            title,
            prompt,
            selected,
            tableName,
            dataSourceId,
            dataSources
        } = this.props;
        const cls = classNames('tree-content-wrapper', {
            'tree-node-selected': selected
        });

        // 判断是否存在该数据表
        const isTableInDs = isTableInDataSources(dataSources, dataSourceId, tableName);
        const isTableCls = classNames({
            'icon-shujubiao': isTableInDs,
            'icon-yichang': !isTableInDs
        });

        return (
            <div className={'hc-node'}>
                <span
                    title={prompt || title}
                    className={cls}
                >
                    <span
                        className={isTableCls}
                        title={`${title}${isTableInDs ? '' : ' 表不存在'}`}
                    />
                    <span className='tree-title'>{title}</span>
                </span>
                <ContextMenu
                    eventTrigger={['onClick']}
                    isMaskLayer={true}
                    render={(props) => {

                        // console.log('编辑并集props---->', props);
                        return <i className={'node-ctrl icon-zhedie'} />;

                    }}
                >
                    {/* <MenuItem onClick={() => console.log('编辑并集')} >编辑并集</MenuItem>*/}
                    <MenuItem onClick={this.deleteNode} >删除</MenuItem>
                </ContextMenu>
            </div>
        );

    }
}

export default Node;
