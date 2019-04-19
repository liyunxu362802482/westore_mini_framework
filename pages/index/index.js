import store from '../../utils/store';
import create from '../../utils/lib/create';

create(store, {
    data: {
        'userInfo': {}, //如果需要用到 store的字段，需要在data这边做引用

        'codeTest': 'codeTest'
    },
    onLoad: function(options) {
        setTimeout(() => {
            this.store.data.userInfo = {
                name: 'raidsh update',
                age: 10
            };
            this.store.data.userId = 88;
            // 需要在视图上做改变 需要调用update方法。 与 this.setData({}) 有点类似
            this.update();
            // this.store.update();
        }, 3000);
        this.store.onChange = this.watch;
    },
    watch(params) {
        // westore默认的change回调，res 更新的字段，比如是 userInfo.name  userInfo.age userId
        // 如果是多个更新，会多个都回调过来
        Object.keys(params).forEach(key => {
            console.log(key);
        });
    },
    // 分享
    onShareAppMessage(options) {
        const params = this.store.share(options);
        this.store.log(params);
        return params;
    }
});