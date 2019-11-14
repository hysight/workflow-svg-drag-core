/**
 *@Author: hy-zhangb
 *Date: 2018/11/7 13:56
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/11/7 13:56
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// css
import './style.scss';

// Modal
class Modal extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.array
        ]),
        closeContextMenu: PropTypes.func
    };
    static defaultProps = {
        title: '',
        width: 500
    };

    render() {

        const {
            title,
            width,
            children,
            closeContextMenu
        } = this.props;
        return (
            <div
                className={'hc-modal'}
                style={{width}}
            >
                <div className={'modal-header'}>
                    <span className={'modal-title'}>{title}</span>
                    <span className={'icon-guanbi'} onClick={closeContextMenu} />
                </div>
                <div className={'modal-body'}>
                    {children}
                </div>
            </div>
        );

    }
}

export default Modal;
