const path = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');
const webpackconf = require('../webpack.build.config');
const config = require('../config');
fse.emptyDirSync(config.buildClient);
fse.emptyDirSync(path.join(config.buildClient));
webpack(webpackconf, function (err, states) {
    if (err) {
        throw err;
    }
    //webpack info
    process.stdout.write(states.toString({
        bail: true,
        colors: true,
        modules: true,
        children: false,
        chunks: true,
        chunkModules: false,
        timings: true
    }) + '\n');

    fse.copySync(path.join(config.buildClient, 'index.html'), path.join(config.buildClient, 'app', 'index.html'));
    fse.copySync(path.join(config.buildClient, 'favicon.ico'), path.join(config.buildClient, 'app', 'favicon.ico'));
    fse.removeSync(path.join(config.buildClient, 'index.html'));
    fse.removeSync(path.join(config.buildClient, 'favicon.ico'));
    if (fse.existsSync(path.join(config.buildClient, 'js'))) {
        fse.copySync(path.join(config.buildClient, 'js'), path.join(config.buildClient, 'mimg', 'js'));
        fse.emptyDirSync(path.join(config.buildClient, 'js'));
        fse.rmdirSync(path.join(config.buildClient, 'js'));
    }
    if (fse.existsSync(path.join(config.buildClient, 'css'))) {
        fse.copySync(path.join(config.buildClient, 'css'), path.join(config.buildClient, 'mimg', 'css'));
        fse.emptyDirSync(path.join(config.buildClient, 'css'));
        fse.rmdirSync(path.join(config.buildClient, 'css'));
    }
    if (fse.existsSync(path.join(config.buildClient, 'img'))) {
        fse.copySync(path.join(config.buildClient, 'img'), path.join(config.buildClient, 'mimg', 'img'));
        fse.emptyDirSync(path.join(config.buildClient, 'img'));
        fse.rmdirSync(path.join(config.buildClient, 'img'));
    }
});