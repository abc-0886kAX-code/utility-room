/*
 * @Author: zhangyang
 * @Date: 2021-10-08 10:47:17
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-10-09 14:42:50
 * @Description: file content
 */
import {
    shortCacheGet,
    shortCacheSet,
    shortCacheDel
} from 'maggot-utils';

import { dateFormat } from '@/utils';

import { isFunction } from 'lodash';

const SocketClientKey = "siteWaringWSC";

// 检查此连接是否已经连接过了
// 如果没有连接过，走正常建立连接流程
// 如果已经连接过，检查存活状态
// 如果状态正常，走正常消息监听流程
// 如果状态异常，尝试重连
// 如果重连成功，状态正常。走正常消息监听流程
// 如果重连失败，走连接关闭流程，并提示问题，要求用户手动获取数据消息或重新登录已重新进行以上流程

class SocketClient {
    constructor(service, handlerMessage) {
        this.wsc;
        this.handlerType = {
            heart: this.handlerHeart.bind(this),
            success: this.handlerSuccess.bind(this),
            failed: this.handlerFailed.bind(this),
            reset: this.handlerReset.bind(this),
            closed: this.handlerClosed.bind(this),
        };
        this.token = "";
        this.service = service;
        this.handlerMessage = isFunction(handlerMessage) ? handlerMessage : () => { }
    }
    static setMessage = (type, content) => ({
        type,
        content,
        time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    })

    connect(token) {
        const url = this.service + token || "";
        // const url = this.service;
        this.closed(token);
        if (this.wsc) return false;

        this.token = token;
        this.wsc = new WebSocket(url);
        this.wsc.onopen = this.onopen.bind(this);
        this.wsc.onclose = this.onclose.bind(this);
        this.wsc.onerror = this.onerror.bind(this);
        this.wsc.onmessage = this.onmessage.bind(this);
    }
    closed(token) {
        if (!this.wsc) return false;

        const context = SocketClient.setMessage('closed', {
            msg: "客户端重载"
        });

        this.writeMessage(context);

        this.closeClient();

        return context;
    }
    onopen(event) {
        // console.log('open', event);
    }
    onclose(event) {
        console.log('close', event);
        this.closeClient();
    }
    onerror(event) {
        console.log('error', event);
        this.closeClient();
    }
    onmessage(event) {
        const { data } = event;
        const message = this.readMessage(data);
        const { type, content, time } = message;

        this.handlerType[type] && this.handlerType[type](content, time);

        this.handlerMessage(message);
    }

    readMessage(content) {
        // const testData = content.split(' [')[0];
        // return JSON.parse(testData);

        return JSON.parse(content);
    }
    writeMessage(content) {
        if (this.wsc.type === 'close') return false;

        const body = JSON.stringify(content);

        this.wsc.send(body);
    }
    closeClient() {
        if (!this.wsc) return false;
        this.wsc.close();
        this.wsc = null;
    }

    handlerHeart(content, time) {
        const context = SocketClient.setMessage('heart', content);

        this.writeMessage(context);
    }
    handlerSuccess(content, time) {
        const context = SocketClient.setMessage('ready', ["warning"]);

        this.writeMessage(context);
    }
    handlerFailed(content, time) {
        this.wsc.close();
    }
    handlerReset(content, time) {
        const { number } = content;

        const context = SocketClient.setMessage('reset', {
            ...content,
            number: number + 1
        });

        this.writeMessage(context);
    }
    handlerClosed(content, time) {
        this.closeClient();
    }
}

const useSocketClient = (service, handler) => {
    const client = new SocketClient(service, handler);

    return {
        client
    }
}

export default useSocketClient;