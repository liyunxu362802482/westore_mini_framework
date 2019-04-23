import store from '../../utils/store';
import create from '../../utils/lib/create';

create(store, {
    data: {
        'userInfo': {}, //如果需要用到 store的字段，需要在data这边做引用
        'codeTest': 'codeTest'
    },
    onLoad: function(options) {

        this.store.log(`hello world`);

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
        this.store.watch(this.watch());
    },
    watch() {
        return {
            'userInfo.name': (newVal, oldVal) => {
                console.log(`userInfo.name change ${newVal}`);
                console.log(this.data.userInfo);

            },
            'userId': (newVal, oldVal) => {

            }
        }
    },
    // 分享
    onShareAppMessage(options) {
        const params = this.store.share(options);
        this.store.log(params);
        return params;
    }
});