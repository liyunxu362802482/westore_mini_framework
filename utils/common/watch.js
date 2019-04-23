// westore默认的change回调，res 更新的字段，比如是 userInfo.name  userInfo.age userId
// 如果是多个更新，会多个都回调过来
// Object.keys(params).forEach(key => {
//     console.log(key);
// });


export default function(obj, data = null) {
    console.log(this);
    if (!data) {
        data = this.data;
    }

    if (!obj) {
        this.log(`需要传入监听 watch 方法`);
        return;
    }
    var observerData = [];
    Object.keys(obj).forEach(key => {
        observerData.push({
            'key': key,
            'callBack': obj[key]
                // 'orginVal': 
        })
    });
    this.onChange = (newVal) => {
        try {
            observerData.forEach(v => {
                const key = v.key;
                // 判断callback是否是方法
                const isFun = Object.prototype.toString.call(v.callBack) == '[object Function]';
                if (!isFun) {
                    this.log(`监听必须有回调方法`);
                    return;
                }

                const isHave = Object.prototype.toString.call(newVal[key]);
                if (isHave == '[object Undefined]' || isHave == '[object Null]') {
                    this.log(`更新的值为 Undefined 或者 Null ？？`);
                    return;
                }

                if (newVal && key && newVal[key]) {
                    v.callBack(newVal[key]);
                }
            });
        } catch (error) {
            this.log(`没有监听该对象`);
        }
    }
}