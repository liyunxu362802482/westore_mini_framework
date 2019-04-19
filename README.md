##小程序组件westore的应用

1、为什么使用westore组件？个人感觉有两个有点特别不错。

* 全局的状态管理，类似vuex。
* 高效的视图更新。在更新数据的时候，会先Diff不同在进行更新。



项目实践


1、需要创建一个store.js的文件，这个定了全局的一些字段，给整个app使用

```

export default {
    data: {
        userInfo: {
            'name': 'radish',
            'age': 18
        },
        debug: true,
    }
}

```

2、改变了传统的页面创建方式，westore需要引用两个文件。一个是前面创建的store文件，一个是create文件。

* 不引用store则拿不到全局的字段。
* create文件个人通俗的理解上就是把store里面的字段和小程序的页面关联起来，除了创建方式不一样，其他的使用方式，都与小程序的原始page类似。唯一的好处就是store里面的字段引入到了页面上。这样就能做到数据的统一管理，类似vuex

```
import store from '../../utils/store';
import create from '../../utils/create';

const app = getApp()

create(store, {
    data: {
        'userInfo': {}, //如果需要用到 store的字段，需要在data这边做引用
        'code': 'indexCode'
    },
    onLoad: function(options) {
        console.log(this.store.data);
        setTimeout(() => {
            this.store.data.userInfo.name = 'raidsh update';
            this.update();
        }, 5000)

    },
});
```

需要注意的点

* 如果不在某个page的data中引入store中的某个字段，那么在page中是无法拿到的。比如说上面例子，如果我不在page下的data引入 userInfo。那么在wxml中是无法拿到 userInfo中的name或者age信息。
* 需要在视图上做改变，需要手动调用update方法。与this.setData({}) 有点类似。


3、子组件的不同

