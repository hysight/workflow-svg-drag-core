/**
 *@Author: hy-zhangb
 *Date: 2018/5/21 18:14
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/5/21 18:14
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - app
 *@File Name: app
 *@Description: Description
 */

// const configs = require('./build/config/product.config');
const path = require('path');
const express = require('express');
// const proxy = require('http-proxy-middleware');
const compression = require('compression');

const app = express();

// gzip
app.use(compression());

// server static resource
app.use(
    express.static(path.join(__dirname, 'server'), {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        setHeaders: (res, path, stat) => {

            res.set('Access-Control-Allow-Origin', '*');

        }
    })
);

// Unmatched static resource, redirect to index.html ->  router
app.use('*', (req, res) => res.sendFile(path.join(__dirname, 'server', 'dashboard', 'index.html')));

// compiler
app.listen(3034, function(err) {

    if(err) {

        console.log(err);
        return;

    }
    console.log(
        '--====> 💻 start data Listening at Open http://localhost:3034 <====----'
    );

});
