// 全局所需要的字段  所有页面都能访问

export default {
    data: {
        userInfo: {
            'name': 'radish',
            'age': 18
        },
        debug: true,
    },
    // 全局接口请求地址
    eventUrl: () => {
        return this.data.debug ? 'https://develop.xx.com' : 'https://product.xx/com'
    },
    // 全局控制log输出
    log: (message) => {
        if (this.data.debug) { console.log(message); }
    },
    // 封装的弹窗
    toast: (message, isSuccess = true) => {
        if (!message) {
            message = isSuccess ? 'success' : 'fail';
        }
        const iconPath = isSuccess ? '../assets/toast/success.png' : '../assets/toast/fail.png';
        wx.showToast({ title: message, image: iconPath, duration: 2000 });
    },
    // 全局分享的拦截
    share: (options, params = null) => {
        if (options.from == 'button') {
            // 来自页面内的转发按钮
            // 页面内的触发分享需要在 wxml文件里面加入 <button open-type="share"></button>
        } else {
            // 点击微信右上角的分享按钮
        }

        if (!params) {
            params = {
                title: '分享标题',
                imageUrl: '分享url地址。需要 http://xxx/xxx.jpg/png/xxg',
                path: 'pages/landing/index'
            }
        }
        params.complete = function() {
            // 分享完成回调。新的API据说要废弃，不知道什么时候废弃
        }
        return params;
    },
    // 网络请求
    request: (path = '', params = {}, method = 'GET') => {
        wx.showLoading({ title: '加载中', mask: true });
        // 拼接请求路径
        const urlPath = `${this.eventUrl()}${path}`;
        return new Promise((resolve, reject) => {
            wx.request({
                url: urlPath,
                method: method, //请求方法
                header: {
                    'content-type': 'application/json' // 默认header头
                },
                data: params, //请求参数
                success: (res) => { //成功回调
                    wx.hideLoading();
                    this.log(res);
                    resolve(res);
                },
                fail: () => { //失败回调
                    reject({ code: 100000, message: `网络开小差` });
                }
            });
        });
    }
}