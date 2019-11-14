import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

export default class Button extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        className: PropTypes.string
    }

    static defaultProps = {
        
    }

    render() {
        const {children, className, ...props} = this.props;
        const btnClass = classNames('hy-button', {[className]: !!className});
        return (
            <button
                className={btnClass}
                {...props}
            >
                {children}
            </button>
        );
    }
}