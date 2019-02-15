/**
 * @description
 *   此中间件的作用是处理index.html、前端静态资源的请求
 */
import { Context } from 'koa';
import Router from 'koa-router';
import send from 'koa-send';
import conf from '../conf';

const router = new Router({
    prefix: conf.appPrefix
});

// 处理index.html
router.get('/', async (ctx: Context) => {
    await send(ctx, 'index.html', {
        root: conf.clientAppPath
    });
});

router.get('/*.html', async (ctx: Context) => {
    const contextPathReg = new RegExp(`^${conf.appPrefix}/`);
    const reqPath = ctx.path.replace(contextPathReg, '');
    await send(ctx, reqPath, {
        root: conf.clientAppPath
    });
});

// 处理静态资源，css、js、img。
router.get('/(css|img|js)/*', async (ctx: Context) => {
    const contextPathReg = new RegExp(`^${conf.appPrefix}/`);
    const reqPath = ctx.path.replace(contextPathReg, '');
    const assetsPath = conf.clientStaticPath;
    await send(ctx, reqPath, {
        root: assetsPath
    });
});

router.get('/favicon.ico', async (ctx: Context) => {
    const clientAppPath = conf.clientAppPath;
    await send(ctx, 'favicon.ico', {
        root: clientAppPath
    });
});

router.get('/fonts/*', async (ctx: Context) => {
    const contextPathReg = new RegExp(`^${conf.appPrefix}/`);
    const reqPath = ctx.path.replace(contextPathReg, '');
    const clientAppPath = conf.clientAppPath;
    await send(ctx, reqPath, {
        root: clientAppPath
    });
});

export default router.routes();
