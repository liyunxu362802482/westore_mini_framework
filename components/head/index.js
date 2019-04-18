import create from '../../utils/create';

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