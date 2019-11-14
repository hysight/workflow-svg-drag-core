/*
 * @Author: Ma Liangliang
 * @Date: 2018-05-03 16:36:54
 * @Last Modified by: Ma Liangliang
 * @Last Modified time: 2018-05-10 17:49:44
 */
import cloneDeep from 'lodash.clonedeep';
import {_UUID} from './tools';

const isStr = (bool) => {

    return Object.prototype.toString.call(bool) === '[object String]';

};

/**
 * 将算子和数据源拼接成JSON
 * @param data
 * @param experimentId
 */
function combinData(data, experimentId) {

    return data.map(
        ({env, category, operatorType, id, parents = [], ports, url, username, password, tableName, operatorFields, operatorParams}) =>
            ({
                name: env ? `${env}.${category}.${operatorType}` : 'SparkEnv.DataProcess.ConnectDBViaURL',
                uuid: id,
                belong: experimentId,
                parents,
                ports,
                params: url ? {url, username, password, dbtable: tableName }
                    : operatorParams
                        .concat(operatorFields
                            .map(v =>
                                Object.assign({}, {...v}, {default: v.default ? v.default.map(w => w.name) : []})
                            )
                        )
                        .reduce((pre, y) => ({
                            ...pre,
                            [y.param]: (isStr(y.default) && !y.default) ? '' : y.default
                        }), {})
            }));

}

/**
 * 拼装数据格式
 * @param data
 * @param designerId
 * @param experimentId
 * @returns {{designerId: *, mode: string, experimentId: *, executeScheme: {apps: *[]}}}
 */
const returnedTemplate = (data, designerId, experimentId, expType) =>
    ({
        designerId,
        mode,
        experimentId,
        executeScheme: {
            apps: [
                {
                    name: 'ML-Platform 01',
                    uuid: experimentId,
                    parents: [],
                    belong: experimentId,
                    context: [
                        {
                            'name': 'SparkSession',
                            'params': {
                                'spark.master': 'local[*]',
                                'spark.app.name': 'factory root',
                                'spark.hive.support': expType === 'HiveOnSpark' ? 'true' : 'false'
                            }
                        }
                    ],
                    operators: data,
                    ports: {}
                }
            ]
        }
    });

/**
 * 拼接数据
 */
const mode = 'debug';
class JoinConfig {
    /**
     * 发送socket请求
     * @param store
     * @param experimentId
     * @returns {{designerId: string, mode: string, experimentId: *, executeScheme: {apps: *[]}}}
     */
    static joinExecuteScheme({store: {source, operators}, experimentId, expType}) {

        const designerId = window.location.pathname.split('/')[4];

        /**
         * 为分析服务拼接数据
         */
        const total = Object.values({...source, ...operators});
        const data = combinData(total, experimentId);

        return returnedTemplate(data, designerId, experimentId, expType);

    }

    /**
     * 保存设计器
     * @param store
     * @param experimentId
     * @param details
     * @returns {{} & {designerName: string, modifiedBy: string, description: string, reviewScheme: {}}}
     */
    static joinReviewScheme({store, experimentId}, details) {

        const executeScheme = JoinConfig.joinExecuteScheme({store, experimentId, expType: details.expType});
        delete executeScheme.experimentId;
        delete executeScheme.mode;

        return Object.assign(
            {...executeScheme},
            {
                designerName: details.name,
                description: details.description,
                reviewScheme: {...store}
            }
        );

    }

    /**
     * 小数据量 执行到此处
     * @param source
     * @param operators
     * @param experimentId
     * @returns {{designerId: string, mode: string, experimentId: *, executeScheme: {apps: *[]}}}
     */
    static runConfigToOperatorWithLessData({store: {source, operators}, experimentId, expType}) {

        const designerId = window.location.pathname.split('/')[4];
        const nOperators = Object.values(cloneDeep(operators));
        let prevOperators = [];
        // 1. 找到 初始算子(该算子是连表类型的算子)
        nOperators.forEach((v, i) => {

            // 该算子向上没有算子了
            if(!v.prev.length) {

                let o = nOperators.splice(i, 1);
                prevOperators.concat(o);

            }

        });

        // 2.1 根据初始算子、数据源生成 ReadOperatorDataFromRedis 虚拟算子
        // 2.2 更改初始算子、数据源下一级子算子的 parents & ports 中 uuid 信息

        let initData =
            prevOperators.concat(Object.values(source))
                .map(v => {

                    const uuid = _UUID();
                    // 更改初始算子、数据源下一级子算子的 parents & ports 中 uuid 信息
                    v.next.map(d => {

                        let operator = nOperators.reduce((t, j) => Object.assign({}, t, {[j.id]: j}), {})[d.id];
                        operator.parents.splice(operator.parents.findIndex(i => i === d.id), 1, uuid);

                        Object.entries(operator.ports).forEach(k => {

                            if(k[1].uuid === v.id) {

                                k[1].uuid = uuid;

                            }

                        });

                    });

                    return {
                        name: 'SparkEnv.System.ReadOperatorDataFromRedis',
                        uuid,
                        belong: experimentId,
                        parents: [],
                        params: {
                            key: `operator:${designerId}_${experimentId}_${v.id}_out` // 初始算子的 port 一定是 out
                        },
                        ports: {}
                    };

                });

        // 3. 拼装算子、数据源
        return returnedTemplate(combinData(nOperators, experimentId).concat(initData), designerId, experimentId, expType);

    }

    /**
     * 执行该节点：1. 正常执行 2. 小数据量执行
     * @param source
     * @param operators
     * @param experimentId
     */
    static runConfigForOperator({store: {source, operators}, experimentId, expType}) {

        const designerId = window.location.pathname.split('/')[4];
        const nOperators = cloneDeep(operators);
        const initData = nOperators.prev.map(v => {

            const uuid = _UUID();

            nOperators.parents.splice(nOperators.parents.findIndex(i => i === v.id), 1, uuid);
            Object.entries(nOperators.ports).forEach(k => {

                if(k[1].uuid === v.id) {

                    k[1].uuid = uuid;

                }

            });

            return {
                name: 'SparkEnv.System.ReadOperatorDataFromRedis',
                uuid,
                belong: experimentId,
                parents: [],
                params: {
                    key: `operator:${designerId}_${experimentId}_${v.id}_${v.port}`
                },
                ports: {}
            };

        });

        return returnedTemplate(combinData([nOperators], experimentId).concat(initData), designerId, experimentId, expType);

    }

    /**
     * 小数据量试运行 -> 全部执行
     * @param operators
     * @param source
     * @param experimentId
     * @returns {*}
     */
    static runConfigForAll({store: {operators, source}, experimentId, expType}) {

        const designerId = window.location.pathname.split('/')[4];
        const nOperators = cloneDeep(operators);
        // 过滤掉闲置的数据源和算子
        const filterSource = Object.values(cloneDeep(source)).filter(v => v.next.length);
        // prevOperators -> 连接表，读取csv等算子
        const prevOperators = Object.values(nOperators).filter(v => !v.prev.length);
        // 其他使用中的算子
        const restOperators = Object.values(nOperators).filter(v => v.prev.length);

        const initData =
            prevOperators.concat(filterSource)
                .map(v => {

                    const uuid = _UUID();

                    v.next.map(d => {

                        let operator = restOperators.reduce((t, i) => Object.assign({}, t, {[i.id]: i}), {})[d.id];

                        operator.parents.splice(operator.parents.findIndex(i => i === d.id), 1, uuid);

                        Object.entries(operator.ports).forEach(k => {

                            if(k[1].uuid === v.id) {

                                k[1].uuid = uuid;

                            }

                        });

                    });

                    return {
                        name: 'SparkEnv.System.ReadOperatorDataFromRedis',
                        uuid,
                        belong: experimentId,
                        parents: [],
                        params: {
                            key: `operator:${designerId}_${experimentId}_${v.id}_out`
                        },
                        ports: {}
                    };

                });

        return returnedTemplate(combinData(restOperators, experimentId).concat(initData), designerId, experimentId, expType);

    }

    /**
     * 从此处开始执行
     * @param operators
     * @param source
     * @param experimentId
     */
    static runConfigFromOperator({store: {operators, source}, experimentId, id, expType}) {

        const designerId = window.location.pathname.split('/')[4];
        const activeOperator = operators[id] || source[id];
        const nOperators = Object.values(cloneDeep(operators));
        let initData;

        // -> 当前算子没有父节点，则以当前算子为初始算子生成配置文件
        if(!activeOperator.prev.length) {

            const uuid = _UUID();
            initData = [{
                name: 'SparkEnv.System.ReadOperatorDataFromRedis',
                uuid,
                belong: experimentId,
                parents: [],
                params: {
                    key: `operator:${designerId}_${experimentId}_${id}_out`
                },
                ports: {}
            }];

            activeOperator.next.map(v => {

                let operator = nOperators.reduce((t, i) => Object.assign({}, t, {[i.id]: i}), {})[v.id];

                operator.parents.splice(operator.parents.findIndex(i => i === id), 1, uuid);

                Object.entries(operator.ports).forEach(k => {

                    if(k[1].uuid === id) {

                        k[1].uuid = uuid;

                    }

                });

            });

        } else {

            // -> 当前算子有父节点，则以当前算子的所有父节点为初始算子生成配置文件
            initData = activeOperator.prev.map(v => {

                const uuid = _UUID();
                const operator = nOperators.reduce((t, i) => Object.assign({}, t, {[i.id]: i}), {})[id];

                operator.parents.splice(operator.parents.findIndex(i => i === v.id), 1, uuid);
                Object.entries(operator.ports).forEach(k => {

                    if(k[1].uuid === v.id) {

                        k[1].uuid = uuid;

                    }

                });

                return {
                    name: 'SparkEnv.System.ReadOperatorDataFromRedis',
                    uuid,
                    belong: experimentId,
                    parents: [],
                    params: {
                        key: `operator:${designerId}_${experimentId}_${v.id}_${v.port}`
                    },
                    ports: {}
                };

            });

        }

        return returnedTemplate(combinData(nOperators, experimentId).concat(initData), designerId, experimentId, expType);

    }
}

export default JoinConfig;
