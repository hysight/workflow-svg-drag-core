/**
 *@Author: hy-zhangb
 *Date: 2018/10/19 14:29
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/19 14:29
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// containers

// components

// css
import './style.scss';

// UnionSelect
class UnionSelect extends PureComponent {
    render() {

        return (
            <div
                className={'hm-union-select'}
            >
                <div className={'union-mark union-mark-1'} />
                <div className={'union-mark union-mark-2'} />
            </div>
        );

    }
}

export default UnionSelect;
