// 全局所需要的字段  所有页面都能访问

import toast from './common/toast';
import log from './common/log';
import share from './common/share';
import request from './common/request';
import eventUrl from './common/eventUrl';
import watch from './common/watch';




export default {
    data: {
        userInfo: {
            'name': 'radish',
            'age': 18
        },
        debug: true,
        userId: 100
    },
    // 全局接口请求地址
    eventUrl: eventUrl,
    // 全局控制log输出
    log: log,
    // 封装的弹窗
    toast: toast,
    // 全局分享的拦截
    share: share,
    // 网络请求
    request: request,
    // 监听观察
    watch: watch,
}