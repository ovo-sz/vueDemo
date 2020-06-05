<template>
  <section class="msite">
    <!--首页头部-->
    <header class="header">
      <span class="header_search">
        <i class="iconfont iconsearch"></i>
      </span>
      <span class="header_title">
        <span class="header_title_text ellipsis">{{
          address.address || "正在定位中..."
        }}</span>
      </span>
      <span class="header_login">
        <span class="header_login_text">登录|注册</span>
      </span>
    </header>
    <!--首页导航-->
    <Nav ></Nav>
    <!--首页附近商家-->
    <ShopList></ShopList>
  </section>
</template>

<script>
// @ is an alias to /src

import Nav from "@/components/Nav/Nav.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {a:'123'};
  },
  components: {
    ShopList: () => import("@/components/ShopList/ShopList.vue"),
    Nav
  },
  computed: {
    ...mapState({
      address: state => state.msite.address,
      categorys: state => state.msite.categorys,
      user: state => state.user.user
    })
  },
  mounted() {
    console.log(this.$route.fullPath,this.$route.path)
  }
};
</script>
is my life

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins';
.msite { // 首页
  width: 100%;
  header();
}
</style>

