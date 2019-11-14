/*
* @Author: zhangyujie
* @Date:   2017-11-17 16:38:47
 * @Last Modified by: Ma Liangliang
 * @Last Modified time: 2018-05-02 17:30:35
* @Email: zhangyujie3344521@163.com
* @FilePath: /Volumes/Work/gitlab/tueasy/tueasy-starter/config.js
* @Description:
*/
const development = {
    host: '0.0.0.0',
    port: 8020,
    apiHost: '192.168.94.85',
    apiPort: 6015
};
const production = {
    host: '192.168.94.156',
    port: 8020,
    apiHost: '192.168.94.85',
    apiPort: 6015
};

const config = (process.env.NODE_ENV === 'development' ? development : production);

module.exports = config;
