export default function(options, params = null) {
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
}