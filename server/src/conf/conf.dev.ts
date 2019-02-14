/**
 * @description
 *    此配置文件继承conf.base.ts,并设置开发环境下的配置参数
 */

import BaseConf from './conf.base';

export default class DevConf extends BaseConf {
    constructor() {
        super();
    }
}
