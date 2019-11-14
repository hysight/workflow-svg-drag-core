/*
* @Author: zhangyujie
* @Date:   2017-05-16 13:51:34
* @Last Modified by:   wangc
* @Last Modified time: 2018-04-02 15:15:13
* @Email: zhangyujie3344521@163.com
* @File Path: E:\item\robotStudy\robot-study\src\views\App\index.js
* @File Name: index.js
* @Descript:
*/
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// import { LocaleProvider } from 'antd';
// import zhCN from 'antd/lib/locale-provider/zh_CN';

// createHistory
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';

// storeFactory
import storeFactory from 'app/store';

// components
// import Header from '@hysight/header';
// import Header from 'app/components/Header';

// views
// import SelDataSource from 'app/views/SelDataSource';
import Layout from 'app/views/App/Layout';
// import Map from 'app/views/Map';

// css
import './style.scss';

// history
const history = createBrowserHistory({
    basename: __BASENAME__
});

// store
const initState = {};
const store = storeFactory.getInstantiate(initState, history);

class App extends Component {
    render() {

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Layout />
                </ConnectedRouter>
            </Provider>
        );

    }
}

export default App;
