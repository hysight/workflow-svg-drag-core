/**
 *@Author: hy-zhangb
 *Date: 2018/10/24 17:23
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/24 17:23
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

// FullJoin
class FullJoin extends PureComponent {
    static className = 'full-join';
    render() {

        return (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 85.5 51.5'>
                <title>全连接</title>
                <g>
                    <g>
                        <circle className='hc-full-join-1' cx='25.5' cy='25.5' r='25' />
                        <circle className='hc-full-join-1' cx='60' cy='26' r='25' />
                        <path
                            className='hc-full-join-2'
                            d='M50.5,25.5A24.92,24.92,0,0,0,43,7.66a25,25,0,0,0-.52,36.17A24.93,24.93,0,0,0,50.5,25.5Z'
                        />
                    </g>
                </g>
            </svg>
        );

    }
}

export default FullJoin;
