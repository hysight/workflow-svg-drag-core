/**
 *@Author: hy-zhangb
 *Date: 2018/10/8 14:21
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2019-03-15 14:34:10
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import classNames from 'classnames';
// import Fetch from '@hysight/fetch';

import Message from '@hysight/message';

import { IS_SAVE_WF_SUCCESS, IS_EDIT_WF_SUCCESS, FETCH_ID_UPDATE_WF_API_DATA } from 'app/constant/workFlow';

// component

// containers

// css
import './style.scss';

// Header
@withRouter
@connect(state => {

    const {
        edit: { dataSetItem, mode, sql, lastUpdateSqlTime },
        workFlow: { lastWfPreviewTime, joins, connections }
    } = state;
    return {
        dataSetItem,
        mode,
        sql,
        lastUpdateSqlTime,
        lastWfPreviewTime,
        joins,
        connections
    };

})
class Header extends Component {
    static propTypes = {
        match: PropTypes.object,
        dispatch: PropTypes.func,
        isEditPage: PropTypes.bool.isRequired,
        dataSetItem: PropTypes.object,
        mode: PropTypes.string,
        sql: PropTypes.string,
        lastUpdateSqlTime: PropTypes.number,
        lastWfPreviewTime: PropTypes.number
    };
    saveWorkFlow = () => {
        // debugger;
        const {
            dispatch,
            match: {
                params: { dataSetId, wId }
            },
            isEditPage,
            mode,
            sql,
            lastUpdateSqlTime,
            lastWfPreviewTime
        } = this.props;
        // SQL模式需要检验
        if(mode === 'SQL') {

            if(!sql) {

                Message.error('请填写sql语句！');
                return;

            }
            if(!lastWfPreviewTime || lastUpdateSqlTime > lastWfPreviewTime) {

                Message.error(`${mode}模式时，必须先预览数据！`);
                return;

            }

        }
        if(isEditPage) {

            // 更新脱拉拽部分中WYX20190315添加空间id
            dispatch({
                type: FETCH_ID_UPDATE_WF_API_DATA,
                payload: { dataSetId, spaceId: wId }
            });

        } else {

            dispatch({
                type: IS_SAVE_WF_SUCCESS,
                payload: true
            });

        }

    };
    updateWorkFlow = () => {

        const { dispatch } = this.props;
        dispatch({
            type: IS_EDIT_WF_SUCCESS,
            payload: true
        });

    };
    // 吕建楠 -- 2019-03-19修改
    makeSaveFlowStatus = () => {
      let status = false;
      const { joins, connections } = this.props;
      connections && Object.keys(connections).length > 0 && Object.values(connections).map(item => {
        if(joins && joins[item['joinId']]['columnsConnections'].length > 0) status = true;
      });
      if(connections && Object.keys(connections).length === 0 || joins && Object.keys(joins).length === 0 || connections === null || joins === null) status = true;
      return status;
    }
    render() {

        const {
            match: {
                params: { wId }
            },
            dataSetItem
        } = this.props;
        const saveFlowStatus = this.makeSaveFlowStatus();
        return (
            <header className={'hc-header'}>
                <div className={'header-name'}>
                    <a className={'icon-fanhui'} href={`/smartsight/${wId}/data/dataset`} />
                    &nbsp;&nbsp;
                    <span>{dataSetItem ? dataSetItem.name : '未命名'}</span>
                </div>
                <div className={'header-panel'}>
                    {dataSetItem ? (
                        <i title={'修改基本信息'} className={'icon-xiugaixinxi'} onClick={this.updateWorkFlow} />
                    ) : null}
                    &nbsp;&nbsp;
                    {/* <i className={'icon-lingcunwei'} />&nbsp;&nbsp;*/}
                    <i className={'icon-baocun'} onClick={saveFlowStatus ? this.saveWorkFlow : null} title={'保存'} />
                </div>
            </header>
        );

    }
}

export default Header;
