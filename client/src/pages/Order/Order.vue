<template>
  <div>
    <section class="order">
      <header class="header">
        <a class="header_title">
          <span class="header_title_text">订单列表</span>
        </a>
      </header>
      <section class="order_no_login">
        <img src="./images/person.png" />
        <h3>登录后查看外卖订单</h3>
        <button @click="isLogin">
          <router-link :to="{}" tag="span" 
            >立即登陆</router-link
          >
        </button>
      </section>
    </section>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  components: {
    [Notify.name]: Notify
  },
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  update() {},
  methods: {
    isLogin() {
      if(this.$store.state.user.user._id){
      Notify({ type: 'primary', message: '您已登陆' });
      }

    }
  },
  computed: {}
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins';

header();

.order { // 订单
  width: 100%;

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background:#01affd!important;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>
