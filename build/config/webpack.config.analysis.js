/**
 *@Author: hy-zhangb
 *Date: 2018/5/7 10:41
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-08-09 15:11:45
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - webpack.config
 *@File Name: webpack.config
 *@Description: Description
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = require('./webpack.config');

webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        // Host that will be used in `server` mode to start HTTP server.
        analyzerHost: '127.0.0.1',
        // Port that will be used in `server` mode to start HTTP server.
        analyzerPort: 8888,
        // Path to bundle report file that will be generated in `static` mode.
        // Relative to bundles output directory.
        reportFilename: 'report.html',
        // Module sizes to show in report by default.
        // Should be one of `stat`, `parsed` or `gzip`.
        // See "Definitions" section for more information.
        defaultSizes: 'stat',
        // Automatically open report in default browser
        openAnalyzer: true,
        // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        generateStatsFile: false,
        // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
        // Relative to bundles output directory.
        statsFilename: 'stats.json',
        // Options for `stats.toJson()` method.
        // For example you can exclude sources of your modules from stats file with `source: false` option.
        // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: 'source: false',
        // Log level. Can be 'info', 'warn', 'error' or 'silent'.
        logLevel: 'info'
    })
)

module.exports = webpackConfig;
