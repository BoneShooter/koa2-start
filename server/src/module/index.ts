import Boom from 'boom';
import compose from 'koa-compose';
import Router from 'koa-router';
import { userRoutes } from './user/user.api';

const router = new Router();

router.use(userRoutes);

export default compose([
    router.routes(),
    router.allowedMethods({
        throw: true,
        notImplemented: () => Boom.notImplemented(),
        methodNotAllowed: () => Boom.methodNotAllowed()
    })
]);
