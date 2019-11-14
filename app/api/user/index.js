/**
 *@Author: hy-zhangb
 *Date: 2018/10/15 14:33
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/15 14:33
 *Email: lovewinders@163.com
 *File Path: smartsight - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import Fetch from '@hysight/fetch';

// saga api
const Api = {
    fetchUserInfo() {

        return Fetch('/api/{version}/admin/info')
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    }

};

export default Api;
