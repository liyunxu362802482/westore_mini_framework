import store from '../../utils/store';
import create from '../../utils/create';

const app = getApp()

create(store, {
    data: {

    },
    onLoad: (options) => {

    },
    // 分享
    onShareAppMessage(options) {
        const params = store.share(options);

        store.log(params);

        return params;
    }
});