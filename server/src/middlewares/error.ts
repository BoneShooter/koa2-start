import Boom from 'boom';
import { Context } from 'koa';

export default async (ctx: Context, next: () => Promise<void>) => {
    try {
        await next();
    } catch (error) {
        const boomErr = new Boom(error);
        const { statusCode, headers, payload } = boomErr.output;
        ctx.status = statusCode;
        ctx.set(headers);
        ctx.body = {
            code: payload.statusCode,
            message: payload.message,
            data: undefined
        };
        console.error(boomErr);
    }
};
