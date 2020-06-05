/** 此组件重点
1.短信登陆和密码登录的界面切换 xuanqu
2.获取验证码按钮 点击后 
--按钮变为已发送验证码 且30倒计时 且手机号不为11未或者为已发送状态为不可选取
--进行防抖控制 避免多次点击
3.密码显示与隐藏的切换按钮 按钮v-model绑定 用他的值来确定输入框的type值 三元判断
4.进行规则验证 使用 vee-validate
5.完成短信验证码和图形验证码的请求
6.图形验证码 通过点击图片 更新src http://localhost:4000/captcha?time
--不存在跨域 http请求不存在 ajax才会存在跨域  
--返回的是svg图片 每次跟新一次链接 就会切换图形验证码
--通过在链接后面拼接时间戳从而更新图片
7.进行登陆 有2中登陆方式接口
8.token有时间限制的令牌 过期后无法维持自动登陆 获取token存到localStorage里 以便vuex获取
  且在进行ajax请求时 在请求头header标识 needToken 开启令牌验证,开启之后就会判断是否有token,有就正常请求,
  没有就无法请求抛出错误
9.维持 自动 登陆 需要在app.vue最外层组件 发送一个请求用原先的token解析得到id获取user 然后在进行请求


  
 */


<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">美了么外卖</h2>
        <div class="login_header_title">
          <router-link
            to=""
            tag="a"
            class="on"
            @click.native="loginShow(false)"
            >密码登录</router-link
          >
        </div>
      </div>
      <div class="login_content">
        <form>
          <div>
            <section v-show="isShow">
              <van-field
                class="login_message"
                v-model="name"
                placeholder="手机/邮箱/用户名"
                maxlength="20"
                name="name"
                v-validate="'required'"
                :error-message="errors.first('name')"
              />
              <section class="login_verification ">
                <van-field
                  class="login_message"
                  v-model="pwd"
                  :type="isShowPwd ? 'tel' : 'password'"
                  v-validate="'required'"
                  :error-message="errors.first('password')"
                  placeholder="请输入密码"
                  maxlength="11"
                />
                <div class="switch_button ">
                  <van-switch size="10" v-model="isShowPwd" />
                </div>
              </section>

              <section class="login_message">
                <van-field
                  v-model="captcha"
                  placeholder="请输入验证码"
                  maxlength="11"
                ></van-field>
                <img
                  @click="updataCaptcha"
                  class="get_verification"
                  src="/captcha"
                  ref="captcha"
                  alt="captcha"
                />
              </section>
            </section>
          </div>

          <button @click.prevent="login" class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { reqSendCode, reqPwdLogin, reqSmsLogin } from "../../api";
import { Field, Button, Switch, Notify, Toast } from "vant";
import { mapState } from "vuex";
Vue.use(Toast)
  .use(Notify)
  .use(Switch)
  .use(Field)
  .use(Button);
export default {
  components: {},
  props: {},
  data() {
    return {
      isShow: true,
      phone: "", //手机号
      code: "", //验证码

      name: "", //手机号/邮箱/用户名
      pwd: "", //密码
      captcha: "", //图形验证码

      computeTime: 0, //短信验证码倒计时
      isShowPwd: false, //是否明文显示
    };
  },
  mounted() {
    this.updataCaptcha()
  },
  methods: {
    // 切换短信界面和密码界面
    loginShow(show) {
      this.isShow = show;
    },
    // 进行登陆
    async login() {
      let names, result;
      const { isShow,  name, pwd, captcha } = this;
      if (isShow)  {
        //密码登陆时
        // 验证名单↓↓↓
        names = ["name"];
        result = await reqPwdLogin({ name, pwd, captcha });
        console.log(result);
        if (result.code === 1) {
          this.updataCaptcha(); //更新验证码
          this.captcha = "";
        }
      }
      const success = await this.$validator.validateAll(names);
      if (success && result.code === 0) {
        Notify({ type: "success", message: "登陆成功", duration: 2000 });
        const user = result.data;
        this.$store.dispatch("recordUser", user); //token包含在user中哦
        this.$router.replace("/home");
      } else {
        Notify({ type: "danger", message: result.msg });
      }
    },
    // 图像验证码切换
    updataCaptcha() {
      this.$refs.captcha.src = "/captcha?time" + Date.now();
    },

  },
  computed: {
    // 判断是否是一个正确的手机号 以便控制按钮可否点击
    isPhone_number() {
      return /^1\d{10}$/.test(this.phone); //以1开头以10个数结尾的数字
    }
  },
  watch: {}
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
>>>.van-field {
}

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #01affd;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #01affd;
            border-bottom: 2px solid #01affd;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          .login_message {
            position: relative;
            margin-top: 16px;
            margin-top: 16px;
            border: 1px solid #ccc;

            .get_verification {
              position: absolute;
              top: 40%;
              right: 10px;
              transform: translateY(-50%);
              font-size: 10px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #01affd;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          background: #01affd;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 15px;
      left: 10px;
      width: 40px;
      height: 40px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
