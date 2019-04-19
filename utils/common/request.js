export default function(path = '', params = {}, method = 'GET') {
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