/**
 * @description
 *    此配置文件继承conf.base.ts,并设置线上环境的配置参数
 */

import BaseConf from './conf.base';

export default class OnlineConf extends BaseConf {
    constructor() {
        super();
    }
}
