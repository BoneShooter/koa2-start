const path = require('path');
const root = __dirname;
module.exports = {
    rootPath: root,
    srcPath: path.join(root,'src'),
    mockPath: path.join(root,'test/mock'),
    buildClient: path.join(root,'build'),
    buildWebapp: path.join(root,'build/app'),
    buildStatics: path.join(root,'build/mimg'),
    rootPath: root,
    port: 9000,
    contextPath: '/love',
    mockPath: '',
    xhrPrefix: '/xhr',
    openurl: 'http://${0}:${1}${2}/index.html',
    remoteUrl:'http://localhost:9300'
};