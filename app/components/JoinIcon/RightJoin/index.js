/**
 *@Author: hy-zhangb
 *Date: 2018/10/24 17:24
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/24 17:24
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

// component

// containers

// css
import './style.scss';

// RightJoin
class RightJoin extends PureComponent {
    static className = 'right-join';
    render() {

        return (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 85.5 51.5'>
                <title>右连接</title>
                <g>
                    <g>
                        <circle className='hc-right-join-1' cx='25.5' cy='25.5' r='25' />
                        <circle className='hc-right-join-2' cx='60' cy='26' r='25' />
                    </g>
                </g>
            </svg>
        );

    }
}

export default RightJoin;
