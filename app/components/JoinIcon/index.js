/**
 *@Author: hy-zhangb
 *Date: 2018/10/22 18:33
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/22 18:33
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// component
// import WarnJoin from './WarnJoin';
// import LeftJoin from './LeftJoin';
import DataSet from './DataSet';

// containers

// css
import './style.scss';

// JoinIcon
class JoinIcon extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['warn-join', 'inner-join', 'left-join', 'right-join', 'full-join']),
        disabled: PropTypes.bool,
        title: PropTypes.string
    };
    static defaultProps = {
        type: 'warn-join',
        disabled: false,
        title: ''
    };
    toRenderIcon = () => {

        const {type} = this.props;
        const [Comp] = DataSet.filter(comp => comp['className'] === type);
        return <Comp />;

    };
    render() {

        const {disabled, title} = this.props;
        const cls = classNames(
            'hc-join-icon',
            {
                'join-disabled': disabled
            }
        );
        return (
            <span
                className={cls}
                title={title}
            >
                {this.toRenderIcon()}
            </span>
        );

    }
}

export default JoinIcon;
