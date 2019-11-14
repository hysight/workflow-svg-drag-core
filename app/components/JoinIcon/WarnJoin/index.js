/**
 *@Author: hy-zhangb
 *Date: 2018/10/23 17:09
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/23 17:09
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

// WarnJoin
class WarnJoin extends PureComponent {
    static className = 'warn-join';
    render() {

        return (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 85.5 51.5'>
                {/*<title>警告</title>*/}
                <g>
                    <g>
                        <circle className='hc-warn-join-1' cx='25.5' cy='25.5' r='25' />
                        <circle className='hc-warn-join-1' cx='60' cy='26' r='25' />
                        <circle className='hc-warn-join-2' cx='72' cy='39' r='2.5' />
                        <rect className='hc-warn-join-2' x='69.5' y='11' width='5' height='24' rx='2.5' ry='2.5' />
                    </g>
                </g>
            </svg>
        );

    }
}

export default WarnJoin;
