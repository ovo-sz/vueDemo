import Vue from 'vue'
import VeeValidate, { Validator }from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'// 引入中文文件
Vue.use(VeeValidate)//内部定义全局指令

// 提示信息本地化 且配置为中文
VeeValidate.Validator.localize('zh_CN', {
    messages: zh_CN.messages,
    attributes: {
        // 映射关系 写的是name 实际为 用户名
        name: '用户名你',
        phone: '手机号',
        code: '验证码',
    }
})

// 自定义验证规则
VeeValidate.Validator.extend('mobile', {
    validate: value => {
        return /^1\d{10}$/.test(value)
    },
    getMessage: field => field + '必须是11位手机号码'
})