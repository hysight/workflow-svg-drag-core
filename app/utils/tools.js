/**
 *@Author: mll
 *Date: 2018/5/14 10:52
 *@Last Modified by: mll
 *@Last Modified time: 2018/5/14 10:52
 *Email: maliangliang@hiynn.com
 *File Path: Machine-Learning - tools
 *@File Name: tools
 *@Description: Description
 */

export const _UUID = () => {

    return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {

        let r, v;
        r = Math.random() * 16 | 0;
        v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);

    }));

};

export const flatten = (arr) => arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []
);

export const isEmptyObj = obj => Object.values(obj).length === 0;
