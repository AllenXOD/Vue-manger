// 暴露出去
module.exports = {
    // 跟webpack的配置合并
    configureWebpack: {
        // 忽略的模块名
        externals: {
            // 左边时模块名,右边写代码中使用的名字
            vue: "Vue",
            vuex: "Vuex",
            "vue-router": "VueRouter",
            // 饿了吗ui内部使用的名字与我们写的不同 ELEMENT
            "element-ui": "ELEMENT",
            axios: 'axios',
            moment: 'moment'
        }
    }
}