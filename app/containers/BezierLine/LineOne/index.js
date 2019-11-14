/**
 *@Author: hy-zhangb
 *Date: 2018/3/13 10:47
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-11-14 17:59:57
 *Email: lovewinders@163.com
 *File Path: bezier-line - LineOne
 *@File Name: LineOne
 *@Description: Description
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';


//css
import './style.scss';

//class
class LineOne extends Component {
    constructor(props) {

        super(props);

    }

    render() {

        return(
            <div className='hm-line-one'>
                <svg id='svg' width='1900' height='300'>
                    <desc>三次贝塞尔平滑曲线</desc>
                    <defs>
                    </defs>
                    <path d='M20 20 C90 40 130 40 180 20 S250 60 280 20' stroke='#000000' fill='none' style={{strokeWidth: '2px'}}>
                    </path>
                    <text x='90' y='60'>Axx</text>
                    <text x='230' y='60'>xxxxx</text>
                </svg>
            </div>
        );

    }
}

export default LineOne;