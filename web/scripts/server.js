const fs = require('fs');
const opn = require('opn');
const argv = require('yargs').argv;
const chalk = require('chalk');
const getPort = require('get-port');
//webpack 配置
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('../webpack.dev.config');
//use koa
const koa = require('koa');
const koaSend = require('koa-send');
const koaWebpackMiddleware = require('koa-webpack-middleware');
const koaProxies = require('koa-proxies');
const app = new koa();

let devMiddleware;
if (argv.target === 'build') {
    app.use(async (ctx, next) => {
        const reqPath = ctx.path;
        const omitContextPath = reqPath.replace(`${config.contextPath}`, '');
        if (fs.existsSync(config.buildStatics + omitContextPath)) {
            await koaSend(ctx, omitContextPath, {
                root: config.buildStatics
            });
        } else if (fs.existsSync(config.buildWebapp + omitContextPath)) {
            await koaSend(ctx, omitContextPath, {
                root: config.buildWebapp
            });
        } else {
            await next();
        }
    });
} else {
    let compiler = webpack(webpackConfig);
    devMiddleware = koaWebpackMiddleware.devMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        logTime: true,
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            cachedAssets: false
        }
    });
    app.use(devMiddleware);
    app.use(koaWebpackMiddleware.hotMiddleware(compiler));
}

//根据host区分转发
app.use(koaProxies(`${config.contextPath}${config.xhrPrefix}`, {
    target: config.remoteUrl,
    changeOrigin: true,
    logs: true
}));

//not found
app.use(async (ctx) => {
    ctx.status = 404;
    ctx.body = {
        code: 404
    };
});

//open url
getPort({ port: config.port }).then((port) => {
    console.log(chalk.green('port is :' + port));
    const clientUrl = `http://localhost:${port}${config.contextPath}/index.html`;
    if (devMiddleware) {
        devMiddleware.waitUntilValid(() => {
            console.log(chalk.green('\nLive Development Server is listening on '), chalk.blue.underline(clientUrl));
            opn(clientUrl);
        })
    } else {
        console.log(chalk.green('\nStatic Build Server is starting on '), chalk.blue.underline(clientUrl));
        opn(clientUrl);
    }
    app.listen(port);
}).catch((err) => {
    console.error(err);
});