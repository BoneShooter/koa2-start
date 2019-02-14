import DevConf from './conf.dev';
import OnlineConf from './conf.online';
import TestConf from './conf.test';

let conf: DevConf | TestConf | OnlineConf;

if (global.ENV === 'online') {
    conf = new OnlineConf();
} else if (global.ENV === 'test') {
    conf = new TestConf();
} else {
    conf = new DevConf();
}

export default conf;
