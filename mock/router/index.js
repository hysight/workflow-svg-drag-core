/**
 *@Author: hy-zhangb
 *Date: 2018/8/6 11:11
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/8/6 11:11
 *Email: lovewinders@163.com
 *File Path: data - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
// ROOT ROUTER
import MapRouter from './map.router';

class RootRouter {
    static routes(app) {

        MapRouter.routers(app);

    }
}

export default RootRouter;
