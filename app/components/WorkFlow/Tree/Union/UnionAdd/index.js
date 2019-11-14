/**
 *@Author: hy-zhangb
 *Date: 2018/10/19 14:09
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/19 14:09
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

// UnionAdd
class UnionAdd extends PureComponent {
    render() {

        return (
            <div
                className={'hm-union-add'}
                {...this.props}
            >
                将表拖至并集
            </div>
        );

    }
}

export default UnionAdd;
