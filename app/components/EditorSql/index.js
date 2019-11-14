/**
 *@Author: hy-zhangb
 *Date: 2018/11/27 15:50
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/11/27 15:50
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import brace from 'brace';
import AceEditor from 'react-ace';

import {
    FETCH_SQL_VALUE_SUCCESS,
    FETCH_SQL_LAST_TIME_SUCCESS
} from 'app/constant/edit';

import Message from '@hysight/message';

// containers

// components

import 'brace/mode/mysql';
import 'brace/theme/xcode';

// css
import './style.scss';

// WorkFlow
@connect(
    state => {

        const {
            edit: {
                sql
            }
        } = state;
        return {
            sql
        };

    }
)
class EditorSql extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        sql: PropTypes.string
    };
    onChange = (val) => {

        console.log('当前sql输入值', val);
        const {dispatch} = this.props;
        // 设置sql语句
        dispatch({
            type: FETCH_SQL_VALUE_SUCCESS,
            payload: val
        });
        // 这是sql语句最后更新时间戳
        dispatch({
            type: FETCH_SQL_LAST_TIME_SUCCESS,
            payload: new Date().getTime()
        });

    };
    render() {

        const {sql} = this.props;
        return (
            <div
                className={'hc-editor-sql'}
            >
                <AceEditor
                    value={sql}
                    width={'100%'}
                    mode='mysql'
                    theme='xcode'
                    onChange={this.onChange}
                    name='UNIQUE_ID_OF_DIV'
                    editorProps={{$blockScrolling: true}}
                />
            </div>
        );

    }
}

export default EditorSql;
