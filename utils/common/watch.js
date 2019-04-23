// westore默认的change回调，res 更新的字段，比如是 userInfo.name  userInfo.age userId
// 如果是多个更新，会多个都回调过来
// Object.keys(params).forEach(key => {
//     console.log(key);
// });
// 对westore的 onChange 进行细分。制作类似vue的watch方法


export default function(obj) {
    if (!obj) {
        this.log(`需要传入监听 watch 方法`);
        return;
    }

    this.onChange = (newVal) => {
        try {
            Object.keys(newVal).forEach(key => {
                const callBack = obj[key];
                const isFun = Object.prototype.toString.call(callBack) == '[object Function]';
                // 没有设置该值的监听
                if (!isFun) { return; }
                const isHave = Object.prototype.toString.call(newVal[key]);
                if (isHave == '[object Undefined]' || isHave == '[object Null]') {
                    this.log(`更新的值为 Undefined 或者 Null`);
                }
                // 监听回调
                callBack(newVal[key]);
            });
        } catch (error) {
            this.log(`监听出错 ${JSON.stringify(error)}`);
        }
    }
}