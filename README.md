##小程序组件westore的应用

1、为什么使用westore组件？个人感觉有两个有点特别不错。

* 全局的状态管理，类似vuex。
* 高效的视图更新。在更新数据的时候，会先Diff不同在进行更新。



####项目实践


#####1、需要创建一个store.js的文件，这个定了全局的一些字段，给整个app使用

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

#####2、改变了传统的页面创建方式，westore需要引用两个文件。一个是前面创建的store文件，一个是create文件。

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


#####3、子组件的不同

>通常我们创建子组件步骤。创建个components文件夹，在创建一个自定义的组件文件夹名字。比如head，然后在head文件夹下创建index.js + index.json + index.wxml + index.wxss


在index.json如下代码

```
{
    "component": true,
    "usingComponents": {}
}
```
在index.js写入如下代码

```
const app = getApp();
Component({
    properties: {
        'text': {
            type: String,
            value: "默认文字",
            observer: (newVal, oldVal) => {

            }
        }
    },
    data: {
        'isPlayMusic': true,
        'fun': null
    },
    methods: {

    },
    ready() {

    }
})
```

使用westore我们可以依据老版本的方法创建，也可以用新的方式去创建。主要是在index.js上改动

```
import create from '../../utils/lib/create';

create({
    pure: true, //子组件字段，使用该字段，不会讲data的数据合并到 store.data上
    properties: {
        'text': {
            type: String,
            value: "默认文字",
            observer: (newVal, oldVal) => {

            }
        }
    },
    data: {
        'isPlayMusic': true,
        'fun': null
    },
    methods: {

    },
    ready() {

    }
});
```

#####4、store中onchange的使用
同样，在westore中也有类似监听观察的模式。主要是现在onChange的方法上。要能响应到改变的回调方法，必须要手动调用 update的方法。

```
onLoad: function(options) {
        setTimeout(() => {
            this.store.data.userInfo = {
                name: 'raidsh update',
                age: 10
            };
            this.store.data.userId = 88;
            // 需要在视图上做改变 需要调用update方法。 与 this.setData({}) 有点类似
            this.update();
        }, 3000);
        //监听data数据的变化
        this.store.onChange = this.watch;
    },
    watch(params) {
        // westore默认的change回调，res 更新的字段，比如是 userInfo.name  userInfo.age userId
        // 如果是多个更新，会多个都回调过来
        Object.keys(params).forEach(key => {
            console.log(key);
        });
    }
```
