/**
 *@Author: hy-zhangb
 *Date: 2018/10/8 16:07
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/8 16:07
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import Fetch from '@hysight/fetch';

// saga api
const Api = {
    fetchDsItem(id) {

        return Fetch(`/api/{version}/datasource/strategy_left/one_table/${id}`)
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    },
    fetchDirTreeData(data) {

        return Fetch('/api/{version}/dir/move/list', {
            method: 'POST',
            data
        })
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    },
    fetchDataSetInfo(id) {

        return Fetch(`/api/{version}/strategy/${id}`)
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    }
};

export default Api;
