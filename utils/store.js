// 封装的弹窗
import toast from './common/toast';
// 全局控制log输出
import log from './common/log';
// 全局分享的拦截
import share from './common/share';
// 网络请求
import request from './common/request';
// 全局接口请求地址
import eventUrl from './common/eventUrl';
// 监听观察
import watch from './common/watch';

export default {
    data: {
        // 根据项目配置需要的全局字段
        userInfo: {
            'name': 'radish',
            'age': 18
        },
        debug: true,
        userId: 100
    },
    eventUrl: eventUrl,
    log: log,
    toast: toast,
    share: share,
    request: request,
    watch: watch,
}