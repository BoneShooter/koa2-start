import { Context } from 'koa';
import Router from 'koa-router';
import conf from '../../conf';

const router = new Router({
    prefix: `${conf.appPrefix}${conf.xhrPrefix}/user`
});

router.all('/get.json', async (ctx: Context) => {
    ctx.body = {
        code: 200,
        data: 'ok'
    };
});

export const userRoutes = router.routes();
