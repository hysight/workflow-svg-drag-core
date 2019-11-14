/**
 *@Author: hy-zhangb
 *Date: 2018/10/11 14:38
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/10/11 14:38
 *Email: lovewinders@163.com
 *File Path: jointable - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import Fetch from '@hysight/fetch';

// saga api
const Api = {
    fetchTableFieldList({dsId, tableName}, nodeId) {

        return Fetch('/hysightdata/dataSet/listField', {
            method: 'POST',
            params: {
                dsId,
                tableName,
                dataSetId: '',
                nodeId
            }
        })
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    },
    fetchSaveWfApi(data) {

        return Fetch('/api/{version}/strategy/create', {
            method: 'POST',
            data
        })
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    },
    fetchEditWfApi(dataSetId, data) {

        return Fetch(`/api/{version}/strategy/info/${dataSetId}`, {
            method: 'PUT',
            data
        })
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    },
    fetchIdUpdateWfApi(dataSetId, data) {

        return Fetch(`/api/{version}/strategy/${dataSetId}`, {
            method: 'PUT',
            data
        })
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    },
    fetchSaveWfCanvas(data) {

        return Fetch('/hysightdata/tDatasetTre/tDataSetJSON', {
            method: 'POST',
            data
        })
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    },
    fetchGetWfCanvas(id) {

        return Fetch(`/hysightdata/tDatasetTre/tDataSetJSON/${id}`)
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    },
    fetchGetWfDataPreview(mode, data) {

        return Fetch(`/api/{version}/strategy/${mode}/data`, {
            method: 'POST',
            data
        })
            .then(res => res)
            .catch(err => {

                console.log(err);

            });

    }
};

export default Api;
