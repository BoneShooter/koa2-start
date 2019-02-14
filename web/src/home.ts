import $ from 'jquery';
import './plugins/jquery.fireworks.js';
import './styles/scss/index.scss';

function goToPage2(): void {
    $('#page_one').addClass('hide');
    $('#page_two').removeClass('hide');
    playMusic();
    typeWords().then(() => {
        setTimeout(() => {
            modal('好啦，我说完啦。那么，放烟花给你看吧~', function (): void {
                fireworks();
            });
        }, 3000);
    });
}

function playMusic(): void {
    ($('#music')[0] as any).play();
}

function typeWords(): Promise<void> {
    return new Promise((resolve, reject) => {
        const words = $('#words');
        const str = words.html();
        words.html('');
        let index = 0;
        const timer = setInterval(() => {
            const current = str.substr(index, 1);
            if (current === '<') {
                index = str.indexOf('>', index) + 1;
            } else {
                index++;
            }
            words.html(str.substring(0, index) + '_');
            if (index >= str.length) {
                clearInterval(timer);
                words.html(str);
                resolve();
            }
        }, 150);
    });
}

function fireworks(): void {
    $('#page_two').fireworks({
        sound: false,
        opacity: 1,
        width: $('#page_two').width(),
        height: $('#page_two').height()
    });
}

function modal(content: string, callback: () => void): void {
    const tpl = '<div id="modal-container" class="container">' +
        '<div class="mask"></div>' +
        '<div class="modal">' +
        '<p>' + content + '</p>' +
        '<button type="button" id="confirm" class="confirm">确定</button>' +
        '</div>' +
        '</div>';
    $(document.body).append(tpl);
    $('#confirm').on('click', function (): void {
        $('#modal-container').remove();
        callback();
    });
}

$('#yes').on('click', function (): void {
    modal('得一人相伴，守余生终老，足矣。', function (): void {
        goToPage2();
    });
});

modal('等一下，停！先戴上耳机，打开声音~', function (): void {
    $('#page_one').removeClass('hide');
});
