/**
 *@Author: hy-zhangb
 *Date: 2018/10/8 16:31
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/8 16:31
 *Email: lovewinders@163.com
 *File Path: jointable - edit.router
 *@File Name: edit.router
 *@Description: Description
 */
'use strict';
import Router from 'koa-router';
import EditController from './../api/map.controller';

//
class MapRouter {
    static routers(app) {

        const router = new Router();
        router.get('/jsst-wgh/getMapList', EditController.getDataConnection);

        app.use(router.routes());

    }
}

export default MapRouter;
