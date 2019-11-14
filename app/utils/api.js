/**
 * @Author: zhangb
 * @Date: 2019-06-27 10:17:04
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-08-09 14:21:12
 * @Description: 
 */
// api请求地址
// const base = '192.168.94.210';
// const base = 'b248cb91.ngrok.io';
const base = 'localhost';
// const base = '192.168.1.207';
// const base = '192.168.4.50';
// const base = '192.168.3.81';

const hostIp = process.env.NODE_ENV === 'development' ? base : '50.73.67.37';
const httpPort = process.env.NODE_ENV === 'development' ? '3004' : '6080'; // 8089 / 9001 / 59773
const wsPort = process.env.NODE_ENV === 'development' ? '9082' : '';

export const host = hostIp ? `http://${hostIp}:${httpPort}` : '';

export const ws = hostIp ? `http://${hostIp}:${wsPort}` : '';
