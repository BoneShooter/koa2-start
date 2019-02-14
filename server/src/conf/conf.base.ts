// global isDev
import { join } from 'path';
// 应用的根目录
export default class BaseConf {
    rootPath: string = join(__dirname, '../../..');
    // 前端index.html,ico,fonts等资源目录
    clientAppPath: string = join(__dirname, '../../../client/app');
    // 前端静态资源的存放目录
    clientStaticPath: string = join(__dirname, '../../../client/mimg');
    // prefix
    appPrefix: string;
    xhrPrefix: string;
    // server监听端口
    port: number;
    constructor() {
        this.appPrefix = '/love';
        this.port = 9300;
        this.xhrPrefix = '/xhr';
    }
}
