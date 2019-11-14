/**
 *@Author: hy-zhangb
 *Date: 2017/12/2 14:47
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2017/12/2 14:47
 *Email: lovewinders@163.com
 *File Path: fe - bundle
 *@File Name: bundle
 *@Description: Description
 */
import React, { Component } from 'react';

/*
 *  代码分割模型，调用该模型的方式如下。
 *  import SearchContainer from 'bundle-loader?lazy!./containers/Search/searchContainer';
 *
 *  const Search = () => (
 *      <Bundle load={SearchContainer}>
 *          {(Search) => <Search />}
 *      </Bundle>
 *  )
 */

export default class Bundle extends Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };

    componentWillMount() {

        this.load(this.props);

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.load !== this.props.load) {

            this.load(nextProps);

        }

    }

    load(props) {

        this.setState({
            mod: null
        });
        props.load((mod) => {

            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            });

        });

    }

    render() {

        if (!this.state.mod) return false;
        return this.props.children(this.state.mod);

    }
}