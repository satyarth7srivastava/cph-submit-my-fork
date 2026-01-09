// Content script for Codeforces pages - keeps service worker alive
import log from './log';

declare const browser: any;
declare const self: any;

if (typeof browser !== 'undefined') {
    self.chrome = browser;
}

log('CPH-Submit content script loaded on Codeforces');

// Establish keep-alive connection
let port: any = null;

const connectKeepAlive = () => {
    try {
        port = chrome.runtime.connect({ name: 'cph-keep-alive' });
        log('Keep-alive port connected');

        port.onDisconnect.addListener(() => {
            log('Keep-alive port disconnected');
            port = null;
            // Reconnect after short delay
            setTimeout(connectKeepAlive, 1000);
        });
    } catch (err) {
        log('Failed to connect keep-alive port', err);
        setTimeout(connectKeepAlive, 1000);
    }
};

connectKeepAlive();
