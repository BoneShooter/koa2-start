import Koa from 'koa';
import bodyParser from 'koa-body';
import logger from 'koa-logger';
import conf from '../conf';
import assetsRoutes from '../middlewares/assets';
import errorHandler from '../middlewares/error';
import xhrRoutes from '../module';

function bootstrap(): void {
    const app = new Koa();

    // 允许代理模式
    app.proxy = true;

    // 异常集中处理。业务中的异常推荐都抛到这边，由这个中间件集中处理
    app.use(errorHandler);

    // 日志中间件
    app.use(logger());

    // 处理前端的资源html、js、css等资源的中间件
    app.use(assetsRoutes);

    app.use(
        bodyParser({ textLimit: '200mb', jsonLimit: '200mb', formLimit: '200mb' }) // 设置 body 大小限制
    );

    // 业务模块
    app.use(xhrRoutes);

    app.listen(conf.port)
        .addListener('listening', () => {
            console.log('server is started on port: ' + conf.port);
        });
}
export { bootstrap };
