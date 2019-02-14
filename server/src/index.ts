/// <reference path="./types/globals.d.ts" />
global.ENV = 'dev';
if (process.env.NODE_ENV) {
    global.ENV = process.env.NODE_ENV;
}
import { bootstrap } from './bin/app';
bootstrap();
