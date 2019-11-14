/**
 *@Author: hy-zhangb
 *Date: 2018/10/8 14:59
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/8 14:59
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// containers

// components

// css
import './style.scss';

// DataPreview
class DataPreview extends Component {
    render() {

        return (
            <div className='hm-data-preview'>
                DataPreview
            </div>
        );

    }
}

export default DataPreview;
